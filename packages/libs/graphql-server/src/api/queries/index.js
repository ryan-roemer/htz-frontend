import merge from 'lodash/merge';

import list from './list';

export default {
  typeDefs: [
    list.typeDefs,
  ].join(' '),

  resolvers: merge({},
    list.resolvers,
  ),
};
