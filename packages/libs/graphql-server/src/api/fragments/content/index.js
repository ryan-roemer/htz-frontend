import gqlLoader from '../../../utils/gqlLoader';
import resolvers from './content.resolvers';

export default {
  resolvers,
  typeDefs: gqlLoader('api/fragments/content/content.graphql'),
};
