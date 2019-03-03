import merge from 'lodash/merge';

import footerTypeDef from './footer/footer.graphql';
import listTypeDef from './list/list.graphql';

import footerResolver from './footer/footer.resolvers';
import listResolver from './list/list.resolvers';

export default {
  typeDefs: [
    footerTypeDef,
    listTypeDef,
  ].join(' '),

  resolvers: merge({},
    footerResolver,
    listResolver,
  ),
};
