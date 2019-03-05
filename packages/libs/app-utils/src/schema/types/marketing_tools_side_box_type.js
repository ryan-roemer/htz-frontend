// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const MarketingToolSideBox = new GraphQLObjectType({
  name: 'MarketingToolSideBox',
  fields: () => ({
    anonymous: {
      type: new GraphQLObjectType({
        name: 'Anonymous',
        fields: () => ({
          text: { type: GraphQLString, },
          actionText: { type: GraphQLString, },
          actionUrl: { type: GraphQLString, },
        }),
      }),
    },
    registered: {
      type: new GraphQLObjectType({
        name: 'Registered',
        fields: () => ({
          text: { type: GraphQLString, },
          actionText: { type: GraphQLString, },
          actionUrl: { type: GraphQLString, },
        }),
      }),
    },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
  }),
});

export default MarketingToolSideBox;
