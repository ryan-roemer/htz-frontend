import React from 'react';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { border, } from '@haaretz/htz-css-tools';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import Button from '../Button/Button';
import NoSSR from '../NoSSR/NoSSR';

const GET_USER_AND_HOSTNAME = gql`
  query GetUserId {
    articleId @client
    user @client {
      type
      anonymousId
    }
    hostname @client
  }
`;

const GET_PROMO_DATA = gql`
  query GetPromoData($path: String!) {
    page(path: $path) {
      slots {
        aside {
          ... on MarketingToolSideBox {
            anonymous {
              text
              actionText
              actionUrl
            }
            registered {
              text
              actionText
              actionUrl
            }
            inputTemplate
            contentName
            contentId
          }
        }
      }
    }
  }
`;

const sideBoxStyle = ({ theme, anonymousUser, }) => ({
  width: '100%',
  marginTop: '2rem',
  padding: '2rem',
  textAlign: 'center',
  extend: [ border('1px', 1, 'solid', theme.color('primary')), ],
});
const textStyle = ({ theme, anonymousUser, }) => ({
  marginBottom: '2rem',
  fontWeight: '700',
  color: anonymousUser ? theme.color('neutral', '-1') : theme.color('primary'),
  extend: [ theme.type(1), ],
});

function SideBoxPromotion(props) {
  console.warn('!!! props', props);

  return (
    <NoSSR>
      <ApolloConsumer>
        {client => {
          const { user, hostname, } = client.readQuery({
            query: GET_USER_AND_HOSTNAME,
          });
          if (!user && !user.type && !user.anonymousId) {
            return null;
          }

          const payingUser = user.type === 'paying';
          if (payingUser) return null;
          const anonymousUser = user.type === 'anonymous';

          const host = hostname && hostname.match(/^(?:.*?\.)?(.*)/i)[1];
          // set href dynamically.
          const href = `https://promotions.${host}/promotions-page/`;
          // const Dta = client.readQuery({
          //   query: GET_PROMO_DATA,
          //   variables: { path: articleId, },
          // });
          // console.warn('!!!! DTA', Dta);

          return (
            <React.Fragment>
              <FelaComponent
                anonymousUser={anonymousUser}
                rule={sideBoxStyle}
                render={({ theme, className, }) => {
                  const dynamicUserTheme = anonymousUser
                    ? theme.sideBoxPromotionI18n.anonymousUser
                    : theme.sideBoxPromotionI18n.registeredUser;
                  return (
                    <div className={className}>
                      <FelaComponent
                        anonymousUser={anonymousUser}
                        rule={textStyle}
                        render={({ className, }) => (
                          <div className={className}>{dynamicUserTheme.text}</div>
                        )}
                      />
                      <Button
                        variant={dynamicUserTheme.buttonVariant}
                        href={href}
                        fontSize={-1}
                        miscStyles={{
                          paddingInlineStart: '3rem',
                          paddingInlineEnd: '3rem',
                          paddingBlockStart: '0.6rem',
                          paddingBlockEnd: '0.5rem',
                        }}
                      >
                        {dynamicUserTheme.buttonText}
                      </Button>
                    </div>
                  );
                }}
              />
            </React.Fragment>
          );
        }}
      </ApolloConsumer>
    </NoSSR>
  );
}

export default SideBoxPromotion;
