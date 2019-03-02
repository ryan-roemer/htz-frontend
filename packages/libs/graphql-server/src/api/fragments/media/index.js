import gqlLoader from '../../../utils/gqlLoader';
import resolvers from './media.resolvers';

export default {
  resolvers,
  typeDefs: gqlLoader('api/fragments/media/media.graphql'),
};
