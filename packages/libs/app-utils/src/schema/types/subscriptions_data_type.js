import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';


const SubscriptionData = new GraphQLObjectType({
  name: 'SubscriptionData',
  fields: () => ({
    newUsers: { type: GraphQLInt, },
    totalPaying: { type: GraphQLInt, },
    cancellations: { type: GraphQLInt, },
    todayReaders: {
      type: new GraphQLObjectType ({
        name: 'TodayReaders',
        fields: () => ({
          paying: { type: GraphQLInt, },
          registered: { type: GraphQLInt, },
        }),
      }),
    },
  }),
});

const SubscriptionsData = new GraphQLObjectType({
  name: 'SubscriptionsData',
  fields: () => ({
    htz: { type: SubscriptionData, },
    tm: { type: SubscriptionData, },
    bundle: { type: SubscriptionData, },
    hdc: { type: SubscriptionData, },
  }),
});

export default SubscriptionsData;
