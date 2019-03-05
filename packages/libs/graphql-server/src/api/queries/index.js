import merge from 'lodash/merge';

import footerTypeDef from './footer/footer.graphql';
import homePageTypeDef from './homePage/homePage.graphql';
import listTypeDef from './list/list.graphql';
import pageTypeDef from './page/page.graphql';

import footerResolver from './footer/footer.resolvers';
import homePageResolver from './homePage/homePage.resolvers';
import listResolver from './list/list.resolvers';
import pageResolver from './page/page.resolvers';

export default {
  typeDefs: [
    footerTypeDef,
    homePageTypeDef,
    listTypeDef,
    pageTypeDef,
  ].join(' '),

  resolvers: merge({},
    footerResolver,
    homePageResolver,
    listResolver,
    pageResolver,
  ),
};
