// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import clickTrackerWrapper from './click_tracker_banner_wrapper_type';
import content from './content_type';
import dfpBanner from './dfp_banner_type';
import list from './list_type';

const types = new Map([
  [ 'com.polobase.ClickTrackerBannersWrapper', clickTrackerWrapper, ],
  [ 'com.polobase.DfpBannerElement', dfpBanner, ],
  [ 'com.tm.element.List', list, ],
]);

const ElementGroup = new GraphQLObjectType({
  name: 'ElementGroup',
  fields: () => ({
    contentLists: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'ElementGroupItem',
          fields: () => ({
            displayDuration: { type: GraphQLInt, },
            content: {
              type: new GraphQLUnionType({
                name: 'ElementGroupContent',
                types: [ clickTrackerWrapper, content, dfpBanner, list, ],
                resolveType: value => types.get(value.inputTemplate) || content,
              }),
            },
          }),
        })
      ),
    },
    hideOnSite: { type: GraphQLBoolean, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
  }),
});

export default ElementGroup;
