/* global window */
// @flow
import React from 'react';
// import gql from 'graphql-tag';
import type { ElementRef, } from 'react';
// import type { DocumentNode, } from 'graphql/language/ast';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';


/* const USER: DocumentNode = gql`
  query getUser {
    user @client {
      type
    }
  }
`; */

type State = {
  hasListener: boolean,
};

class AdBlockRedirect extends React.Component<{}, State> {
  state = {
    hasListener: false,
  };

  ref: ElementRef<'div'> | null;

  render() {
    return (
      <ApolloConsumer>
        {client => {
          // Commented out parts are temporary for testing (ignore user type, do redirect for all users including subscribers). Remove all comments once ready for production.
          /* const userType = client.readQuery({ query: USER, }).user.type; */
          if (/* userType && userType !== 'paying' && */ !this.state.hasListener) {
            this.setState({ hasListener: true, });
            window.addEventListener('load', () => {
              /* const handlerUserType = client.readQuery({ query: USER, }).user.type; */
              if (/* handlerUserType && handlerUserType !== 'paying' && */ this.ref && this.ref.clientHeight <= 0) {
                window.document.location.href = `/hblocked?returnTo=${encodeURIComponent(
                  window.document.location.href
                )}`;
              }
            });
          }
          return (
            <div
              ref={ref => {
                this.ref = ref;
              }}
              id="wrapfabber"
              style={{ position: 'absolute', bottom: '0', right: '0', }}
            >
              <div
                className="adBanner"
                style={{ backgroundColor: 'transparent', height: '1px', width: '1px', }}
              />
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default AdBlockRedirect;
