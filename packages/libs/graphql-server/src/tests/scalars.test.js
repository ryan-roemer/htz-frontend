import { createTestClient, } from 'apollo-server-testing';
import { ApolloServer, } from 'apollo-server';

import gqlServerConfig from '../api';
import dataSources from './mockSources';

import scalarsQuery from './queries/scalarsQuery.graphql';

const { typeDefs, resolvers, } = gqlServerConfig();

const TestServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

const testServer = createTestClient(TestServer);

it('fetch a list', async () => {
  // // run query against the server and snapshot the output
  const { errors, data, } = await testServer.query({ query: scalarsQuery, variables: { input: { path: 'scalars', }, }, });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});
