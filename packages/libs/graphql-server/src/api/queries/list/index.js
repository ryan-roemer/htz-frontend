import gqlLoader from '../../../utils/gqlLoader';
import resolvers from './list.resolvers';

export default {
  resolvers,
  typeDefs: gqlLoader('api/queries/list/list.graphql'),
};
