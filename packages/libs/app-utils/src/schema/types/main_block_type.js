import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLUnionType, } from 'graphql';
import DfpBanner from './dfp_banner_type';
import List from './list_type';
import content from './content_type';
import countdown from './countdown_type';
import getSchema from '../getSchema';

const MainBlock = new GraphQLObjectType({
  name: 'HomePageMainBlock',
  fields: () => ({
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    slotA: { type: List, },
    slotB: { type: DfpBanner, },
    slotC: { type: List, },
    mainBlockComponents: {
      type: new GraphQLList(
        new GraphQLUnionType({
          name: 'MainBlockComponents',
          types: [ countdown, content, ],
          resolveType: value => getSchema(value.kind || value.inputTemplate) || content,
        })
      ),
    },
  }),
});

export default MainBlock;
