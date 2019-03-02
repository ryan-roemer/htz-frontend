import merge from 'lodash/merge';

import footer from './footer';
import list from './list';

export default {
  typeDefs: [
    footer.typeDefs,
    list.typeDefs,
  ].join(' '),

  resolvers: merge({},
    footer.resolvers,
    list.resolvers,
  ),
};
