import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import RssFeedItemType from './rss_feed_item_type';
import LoadPriority from './load_priority_type';

const RssFeedType = new GraphQLObjectType({
  name: 'RssFeed',
  fields: {
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    title: { type: GraphQLString, },
    loadPriority: { type: LoadPriority, },
    items: {
      type: new GraphQLList(RssFeedItemType),
    },
  },
});

export default RssFeedType;
