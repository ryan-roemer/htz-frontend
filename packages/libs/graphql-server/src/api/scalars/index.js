import resolvers from './scalars.resolvers';
import gqlLoader from '../../utils/gqlLoader';

export default {
  typeDefs: gqlLoader('api/scalars/scalars.graphql'),
  resolvers,
};
