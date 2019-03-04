import merge from 'lodash/merge';

import footerTypeDef from './footer/footer.graphql';
import listTypeDef from './list/list.graphql';
import pageTypeDef from './page/page.graphql';

import footerResolver from './footer/footer.resolvers';
import listResolver from './list/list.resolvers';
import pageResolver from './page/page.resolvers';

export default {
  typeDefs: [
    footerTypeDef,
    listTypeDef,
    pageTypeDef,
  ].join(' '),

  resolvers: merge({},
    footerResolver,
    listResolver,
    pageResolver,
  ),
};
