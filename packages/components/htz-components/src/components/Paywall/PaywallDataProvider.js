// @flow
/* global document */
import * as React from 'react';
import gql from 'graphql-tag';
import { ReadArticleService, } from '@haaretz/htz-user-utils';
import Query from '../ApolloBoundary/Query';
import NoSSR from '../NoSSR/NoSSR';

const paywallDataQuery = gql`
  query getPaywallData(
    $referrer: String!
    $isSuperContent: Boolean!
    $userType: String!
    $useragent: String!
    $articleCount: Int!
  ) {
    paywall(
      referrer: $referrer
      isSuperContent: $isSuperContent
      userType: $userType
      useragent: $useragent
      articleCount: $articleCount
      ) {
      slotLocation
      colorScheme
      title
      text
      confirm {
        text
        url
      }
      deny {
        text
        url
      }
    }
  }
`;

const getPaywallArgs = gql`
  query GetPaywallArgs {
      isSuperContent @client
      user @client {
        type
      }
      platform @client
  }
`;

export type PaywallLink = {
  text: string,
  url: string,
};

export type SlotLocation =
  | 'bot-persist'
  | 'top'
  | 'popup'
  | 'mid-page'
  | 'email-activation';

export type PaywallData = {
  slotLocation: ?SlotLocation,
  colorScheme: 'primary' | 'secondary',
  title: string,
  text: string,
  confirm: PaywallLink,
  deny: PaywallLink,
};

function isNewsletterRef(referrer) {
  const query = /[?&]utm_source=newsletter/;
  return query.test(referrer);
}

type Props = {
  children: PaywallData => React.Node,
};

const PaywallDataProvider = ({ children, }: Props): React.Node => (
  <NoSSR>
    <Query query={getPaywallArgs}>
      {({ data, loading, error, }) => {
        if (error) {
          console.log('[PaywallDataProvider] error %o', error);
        }
        return loading || error
          ? null
          : (
            <Query
              query={paywallDataQuery}
              variables={{
                referrer: isNewsletterRef(document.referrer)
                  ? 'newsletter'
                  : 'direct',
                isSuperContent: data.isSuperContent || false,
                userType: (data.user && data.user.type) || 'anonymous',
                useragent: data.platform === 'web'
                  ? 'desktop'
                  : data.platform,
                articleCount: ReadArticleService.getArticleCount() || 1,
              }}
            >
              {({ data, loading, error, }) => {
                if (error) {
                  console.log('[PaywallDataProvider] error %o', error);
                }
                return loading || error
                  ? null
                  : children(data.paywall);
              }
              }
            </Query>
          );
      }}
    </Query>

  </NoSSR>
);

export default PaywallDataProvider;
