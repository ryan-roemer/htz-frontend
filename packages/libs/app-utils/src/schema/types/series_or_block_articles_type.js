import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import article from './teaser_in_list_type';

const seriesOrBlockArticlesType = new GraphQLObjectType({
  name: 'SeriesOrBlockArticles',
  fields: () => ({
    articles: { type: new GraphQLList(article), },
    seriesTitle: { type: GraphQLString, },
    sort: { type: GraphQLString, },
    itemsPerPage: { type: GraphQLInt, },
    usePagination: { type: GraphQLBoolean, },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    kind: { type: GraphQLString, },
  }),
});

export default seriesOrBlockArticlesType;
