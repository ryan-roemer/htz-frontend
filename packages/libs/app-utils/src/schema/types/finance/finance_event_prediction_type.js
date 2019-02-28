import {
  GraphQLFloat,
  GraphQLObjectType,
} from 'graphql';
import GraphQLTimestamp from '../timestamp_type';

const eventPrediction = new GraphQLObjectType({
  name: 'EventPrediction',
  fields: () => ({
    paymentDate: { type: GraphQLTimestamp, },
    exDate: { type: GraphQLTimestamp, },
    redemptionRate: { type: GraphQLFloat, },
    retailTax: { type: GraphQLFloat, },
    periodicalInterest: { type: GraphQLFloat, },
  }),
});

export default eventPrediction;
