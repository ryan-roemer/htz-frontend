import merge from 'lodash/merge';
import { mergeSchemas, makeExecutableSchema, } from 'apollo-server';

import fragments from './fragments';
import queries from './queries';
import scalars from './scalars';
import interfaces from './interfaces';

import createContext from '../utils/createContext';
import gqlLoader from '../utils/gqlLoader';
import dataSources from '../dataSources';

// const typeDefs = makeExecutableSchema({ typeDefs: list.typeDefs, });

export default schemas => ({
  // schema: mergeSchemas({ schemas: [ ...schemas, typeDefs, ], }),
  typeDefs: [
    gqlLoader('api/enums.graphql'),
    scalars.typeDefs,
    interfaces.typeDefs,
    fragments.typeDefs,
    queries.typeDefs,
  ].join(' '),
  resolvers: merge({},
    scalars.resolvers,
    interfaces.resolvers,
    fragments.resolvers,
    queries.resolvers,
  ),
  context: async ({ req, }) => {
    try {
      // this request and the headers on it are passed from create client in app-utils
      return await createContext(req.headers);
    }
    catch (err) {
      console.log('error from create context gql server: ', err);
      return {};
    }
  },
  dataSources,
  introspection: true,
  tracing: true,
  cacheControl: true,
});
