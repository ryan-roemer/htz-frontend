import gqlLoader from '../../../utils/gqlLoader';
import resolvers from './articleBody.resolvers';

export default {
  resolvers,
  typeDefs: gqlLoader('api/fragments/articleBody/articleBody.graphql'),
};
