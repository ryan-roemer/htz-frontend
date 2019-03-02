import gqlLoader from '../../../utils/gqlLoader';
import resolvers from './interactive.resolvers';

export default {
  resolvers,
  typeDefs: gqlLoader('api/fragments/interactive/interactive.graphql'),
};
