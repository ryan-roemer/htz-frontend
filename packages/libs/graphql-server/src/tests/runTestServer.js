import { createTestClient, } from 'apollo-server-testing';
import { ApolloServer, } from 'apollo-server';

import gqlServerConfig from '../api';

const { typeDefs, resolvers, context, dataSources, } = gqlServerConfig();

const TestServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

export default createTestClient(TestServer);
