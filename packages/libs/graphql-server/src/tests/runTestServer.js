import { createTestClient, } from 'apollo-server-testing';
import { ApolloServer, } from 'apollo-server';

import gqlServerConfig from '../api';
import createContext from '../utils/createContext';

import listMock from './mocks/list';

const { typeDefs, resolvers, } = gqlServerConfig();

const TestServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    PageAPI: {},
    PapiAPI: {
      getList: args => listMock(args),
    },
    SsoAPI: {},
    PurchasePageAPI: {},
    FinanceAPI: {},
    OtpAPI: {},
    NewSsoOperationsAPI: {},
    HtzFunctionOperationsAPI: {},
    TableScoreAPI: {},
  }),
  context: async () => {
    try {
      return await createContext({ hostname: 'www.haaretz.co.il', });
    }
    catch (err) {
      console.log('error from create context gql server: ', err);
      return {};
    }
  },
});

export default createTestClient(TestServer);
