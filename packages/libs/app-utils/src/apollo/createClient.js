import { ApolloLink, } from 'apollo-link';
import { ApolloClient, } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink, } from 'apollo-link-http';
import { withClientState, } from 'apollo-link-state';
import { UserFactory, } from '@haaretz/htz-user-utils';
import fetch from 'isomorphic-unfetch';
import config from 'config';

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

const port = config.get('port');
let apolloClient = null;

const customFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
});

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, req) {
  const graphqlPort = process.env.NODE_ENV === 'production' ? '' : `:${port}`;
  const hostname =
    initialState.ROOT_QUERY !== undefined
      ? initialState.ROOT_QUERY.hostname
      : req.hostname;
  const graphqlLink = `${config.get(
    'graphqlProtocol'
  )}://${hostname}${graphqlPort}/graphql`;

  const link = new HttpLink({
    uri: graphqlLink, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      cookie: req !== undefined ? req.header('Cookie') : undefined,
    },
    fetch,
    includeExtensions: true,
  });
  const inMemoryCache = new InMemoryCache({
    fragmentMatcher: customFragmentMatcher,
    dataIdFromObject: ({ __typename, contentId, }) =>
      (contentId ? `${__typename}:${contentId}` : null),
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
  const user = userFromCache || userFromReq || defaultUser;

  const stateLink = withClientState({
    cache: inMemoryCache,
    defaults: {
      ariaLive: {
        assertiveMessage: '',
        politeMessage: '',
        __typename: 'AriaLive',
      },
      canonicalUrl: '',
      a11yToggle: false,
      hostname,
      articleId: null,
      startFromStage2: true,
      referrer: null,
      loggedInOrRegistered: null,
      scroll: {
        velocity: null,
        x: 0,
        y: 0,
        __typename: 'Scroll',
      },
      user,
      promotionsPageState: {
        stage: 2,
        subStage: 0,
        chosenSlotIndex: 0,
        chosenOfferIndex: null,
        chosenProductIndex: 0,
        paymentMethodIndex: null,
        paymentType: null,
        approveDebtClaim: false,
        couponProduct: null,
        __typename: 'PromotionsPageState',
      },
    },
    resolvers: {
      Mutation: {
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
    link: ApolloLink.from([ stateLink, link, ]),
    cache: inMemoryCache,
    queryDuplication: true,
    onError: errorObj => {
      console.log(errorObj.graphQLErrors);
      console.log(errorObj.networkError);
    },
  });
}

export default function initApollo(initialState, req) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }
  return apolloClient;
}
