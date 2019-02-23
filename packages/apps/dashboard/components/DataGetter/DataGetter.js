import React from 'react';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

const SubscriptionsData = gql`
  query GetSubscriptionsData {
    subscriptionsData {
      htz {
        ...SubscriptionData
      }
      tm {
        ...SubscriptionData
      }
      bundle {
        ...SubscriptionData
      }
      hdc {
        ...SubscriptionData
      }
    }
  }

  fragment SubscriptionData on SubscriptionData {
    newUsers
    totalPaying
    cancellations
    todayReaders {
      paying
      registered
    }
  }
`;

function DataGetter({ children, }) {
  return (
    <Query
      query={SubscriptionsData}
    >
      {({ loading, data, error, }) => {
        if (loading || error) return null;
        return (
          children(data.subscriptionsData)
        );
      }}
    </Query>
  );
}

export default DataGetter;
