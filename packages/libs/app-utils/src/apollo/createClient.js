import { ApolloLink, } from 'apollo-link';
import { ApolloClient, } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher, } from 'apollo-cache-inmemory';
import { onError, } from 'apollo-link-error';
import { HttpLink, } from 'apollo-link-http';
import { withClientState, } from 'apollo-link-state';
import { UserFactory, } from '@haaretz/htz-user-utils';

import fetch from 'isomorphic-unfetch';
import config from 'config';
// import chalk from 'chalk';
import gql from 'graphql-tag';
import switchToDomain from '../utils/switchToDomain';

// Basic structure for user data object (Apollo store)
const defaultUser = {
  type: null,
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  emailStatus: null,
  token: null,
  anonymousId: null,
  __typename: 'User',
};

// const port = config.get('port');
let apolloClient = null;

const customFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        `{
          kind: 'UNION',
          name: 'ArticleBody',
          possibleTypes: {
            Embed,
            HtmlElement,
            Image,
            ImageGallery,
            Interactive,
            Paragraph,
            RelatedArticles,
            SeriesOrBlockArticles,
            Quote,
            Tags,
            Video,
          },
        }`,
      ],
    },
  },
});

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, appDefaultState, req) {
  // const graphqlPort = process.env.NODE_ENV === 'production' ? '' : `:${port}`;
  const hostname = initialState.ROOT_QUERY !== undefined ? initialState.ROOT_QUERY.hostname : req.hostname;
  const referer = initialState.ROOT_QUERY !== undefined ? initialState.ROOT_QUERY.referer : req.headers.referer;
  // 'UA-39927280-1' and 'UA-589309-8' are the test Google Analytics Ids,
  // production apps should pass the production id as ENV variable
  const tmUa = initialState.ROOT_QUERY !== undefined
    ? initialState.ROOT_QUERY.googleAnalyticsId.tmUa
    : process.env.TM_GOOGLE_ANALYTICS_ID || 'UA-39927280-1';
  const htzUa = initialState.ROOT_QUERY !== undefined
    ? initialState.ROOT_QUERY.googleAnalyticsId.htzUa
    : process.env.HTZ_GOOGLE_ANALYTICS_ID || 'UA-589309-8';
  const graphqlLink = switchToDomain(hostname, config.get('service.graphql'));
  console.log('the graphql link is: ', graphqlLink);
  const link = new HttpLink({
    uri: graphqlLink, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      cookie: req !== undefined ? req.header('Cookie') : undefined,
      hostname,
      // headers gets stringified so we make sure preview is not sent at all if not defined
      ...(req !== undefined
        ? req.query.preview
          ? { preview: req.query.preview, previewUserId: req.query.userId, }
          : {}
        : {}),
    },
    fetch,
    includeExtensions: true,
  });

  const userAgent = req
    ? {
      browser: req.useragent.browser,
      os: req.useragent.os,
      platform: req.useragent.platform,
      version: req.useragent.version,
      isMobile: req.useragent.isMobile,
      isTablet: req.useragent.isTablet,
      isDesktop: req.useragent.isDesktop,
      deviceType: req.useragent.isMobile
        ? 'mobile'
        : req.useragent.isTablet
          ? 'tablet'
          : req.useragent.isDesktop
            ? 'desktop'
            : 'other',
    }
    : {};

  const errorLink = onError(({ response, operation, graphQLErrors, networkError, }) => {
    if (graphQLErrors) {
      console.log(`${'[GraphQL error]:'} Operation Name: ${operation.operationName}`);
      graphQLErrors.map(({ message, locations, path, }) => console.log(
        `${'[GraphQL error]:'} Message: ${message}, Location: ${locations.map(
          ({ line, column, }) => `{ line: ${line}, column: ${column} }`
        )}, Path: ${path}`
      )
      );
    }
    if (networkError) {
      console.log(`${'[Network error]:'} ${networkError}`);
    }
    if (response) response.errors = null;
  });

  const inMemoryCache = new InMemoryCache({
    fragmentMatcher: customFragmentMatcher,
    dataIdFromObject: ({ __typename, contentId, inputTemplate, }) => {
      let cacheKey = contentId ? `${__typename}:${contentId}` : null;

      if (inputTemplate && inputTemplate === 'com.tm.TeaserData') {
        cacheKey = null;
      }

      return cacheKey;
    },
  }).restore(initialState || {});

  // try creating a user from initial request (server only)
  const userFromReq = req
    ? Object.assign(
      {},
      defaultUser,
      new UserFactory(true, req.header('Cookie') || '', hostname).build()
    )
    : undefined;
  // try to rehydrate user on client from server state (client)
  const userFromCache = inMemoryCache.data.data['$ROOT_QUERY.user'];
  const user = Object.assign({}, defaultUser, userFromReq || userFromCache);

  const stateLink = withClientState({
    cache: inMemoryCache,
    defaults: {
      ...(appDefaultState ? appDefaultState(referer) : {}),
      ariaLive: {
        assertiveMessage: '',
        politeMessage: '',
        __typename: 'AriaLive',
      },
      hostname,
      userAgent: {
        ...userAgent,
        __typename: 'UserAgent',
      },
      scroll: {
        velocity: null,
        x: 0,
        y: 0,
        __typename: 'Scroll',
      },
      user,
      // ids of representedContent already rendered by a list on the page
      listDuplicationIds: [],

      googleAnalyticsId: {
        tmUa,
        htzUa,
        __typename: 'GoogleAnalyticsId',
      },
    },
    resolvers: {
      Mutation: {
        updateListDuplication: (_, variables, { cache, }) => {
          const query = gql`
            query {
              listDuplicationIds @client
            }
          `;
          const response = cache.readQuery({ query, });
          const ids = [ ...response.listDuplicationIds, ];
          variables.ids.forEach(id => {
            // check if item already exists in list and if not push it in
            if (ids.indexOf(id) === -1) ids.push(id);
          });
          const data = {
            listDuplicationIds: ids,
          };
          cache.writeData({ data, });
          // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
          return { ids, };
        },
        toggleZen: (_, variables, { cache, }) => {
          const query = gql`
            query {
              zenMode @client
            }
          `;
          const response = cache.readQuery({ query, });
          const data = { zenMode: !response.zenMode, };
          cache.writeData({ data, });
          // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
          return null;
        },
        updateArticleSection: (_, { id, name, url, }, { cache, }) => {
          console.log({ id, name, url, });
          const data = {
            articleSection: {
              id,
              name,
              url,
              __typename: 'ArticleSection',
            },
          };
          cache.writeData({ data, });
          // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
          return null;
        },
        updateScroll: (_, { x, y, velocity, }, { cache, }) => {
          const data = {
            scroll: {
              velocity,
              x,
              y,
              __typename: 'Scroll',
            },
          };
          cache.writeData({ data, });
          // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
          return null;
        },
        updateUser: (_, { user, }, { cache, }) => {
          // console.log('update User:', user);
          const data = {
            user: {
              ...user,
              __typename: 'User',
            },
          };
          cache.writeData({ data, });
          // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
          return null;
        },
        updateHostname: (_, { hostname, }, { cache, }) => {
          const data = {
            hostname,
          };
          cache.writeData({ data, });
          return null;
        },
      },
    },
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([ errorLink, stateLink, link, ]),
    cache: inMemoryCache,
    queryDuplication: true,
  });
}

export default function initApollo(initialState, appDefaultState, req) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, appDefaultState, req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, appDefaultState);
  }
  return apolloClient;
}
