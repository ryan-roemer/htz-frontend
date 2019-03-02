import gqlLoader from '../../../utils/gqlLoader';
import resolvers from './footer.resolvers';

export default {
  resolvers,
  typeDefs: gqlLoader('api/queries/footer/footer.graphql'),
};
