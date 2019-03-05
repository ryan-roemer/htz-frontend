import React from 'react';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import Button from '../Button/Button';

const GET_USER_TYPE = gql`
  query GetUserId {
    user @client {
      type
      anonymousId
    }
  }
`;

const sideBoxStyle = ({ theme, anonymousUser, }) => ({
  // backgroundColor: anonymousUser ? 'yellow' : 'red',
  width: '100%',
  marginTop: '2rem',
});
const textStyle = ({ theme, anonymousUser, }) => ({
  backgroundColor: anonymousUser ? 'yellow' : 'red',
  width: '100%',
  padding: '2rem',
  extend: [ theme.type(3), ],
});

function SideBoxPromotion() {
  return (
    <ApolloConsumer>
      {client => {
        const { user, } = client.readQuery({
          query: GET_USER_TYPE,
        });
        console.warn('!!! user Type:', user);
        if (!user && !user.type && !user.anonymousId) {
          return null;
        }

        const payingUser = user.type === 'paying';
        if (payingUser) return null;
        const anonymousUser = user.type === 'anonymous';

        return (
          <React.Fragment>
            <FelaComponent
              anonymousUser={anonymousUser}
              rule={sideBoxStyle}
              render={({ theme, className, }) => {
                const dynamicUserTheme = anonymousUser
                  ? theme.sideBoxPromotionI18n.anonymousUser
                  : theme.sideBoxPromotionI18n.registeredUser;
                console.warn('!!! dynamicUserTheme', dynamicUserTheme);

                return (
                  <div className={className}>
                    <FelaComponent
                      anonymousUser={anonymousUser}
                      rule={textStyle}
                      render={({ className, }) => (
                        <div className={className}>{dynamicUserTheme.text}</div>
                      )}
                    />
                    <Button variant={dynamicUserTheme.buttonVariant} href="www.haaretz.co.il">
                      {dynamicUserTheme.buttonText}
                    </Button>
                  </div>
                );
              }}
            />
            {/* </FelaComponent> */}
          </React.Fragment>
        );
      }}
    </ApolloConsumer>
  );
}

export default SideBoxPromotion;
