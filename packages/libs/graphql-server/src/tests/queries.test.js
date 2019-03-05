import { createTestClient, } from 'apollo-server-testing';
import { ApolloServer, } from 'apollo-server';

import gqlServerConfig from '../api';
import dataSources from './mockSources';

// Queries
import listQuery from './queries/listQuery.graphql';
import footerQuery from './queries/footerQuery.graphql';
import homePageQueryQuery from './queries/homePageQuery.graphql';
import regularArticleQuery from './queries/regularArticleQuery.graphql';

const { typeDefs, resolvers, } = gqlServerConfig();

const TestServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

const testServer = createTestClient(TestServer);

it('fetch a list', async () => {
  // // run query against the server and snapshot the output
  const { errors, data, } = await testServer.query({ query: listQuery, variables: { input: { listId: 'list', }, }, });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});


it('fetch a footer', async () => {
  // // run query against the server and snapshot the output
  const { errors, data, } = await testServer.query({ query: footerQuery, variables: { input: { listId: 'footer', }, }, });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});

it('fetch homePage', async () => {
  // // run query against the server and snapshot the output
  const { errors, data, } = await testServer.query({ query: homePageQueryQuery, });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});

it('fetch a regular article', async () => {
  // // run query against the server and snapshot the output
  const { errors, data, } = await testServer.query({ query: regularArticleQuery, variables: { input: { path: 'regularArticle', }, }, });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});
