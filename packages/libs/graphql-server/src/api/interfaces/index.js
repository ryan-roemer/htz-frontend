import gqlLoader from '../../utils/gqlLoader';
import resolvers from './interfaces.resolvers';

export default {
  typeDefs: gqlLoader('api/interfaces/interfaces.graphql'),
  resolvers,
};
