import { GraphQLObjectType, GraphQLString, } from 'graphql';
import GraphQLTimestamp from './timestamp_type';

const Countdown = new GraphQLObjectType({
  name: 'Countdown',
  fields: () => ({
    endOfTime: { type: GraphQLTimestamp, },
    title: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
  }),
});

export default Countdown;
