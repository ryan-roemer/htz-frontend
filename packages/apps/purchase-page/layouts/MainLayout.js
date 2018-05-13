import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/fela-utils';
import { createComponent, FelaComponent, } from 'react-fela';
import Head from 'next/head';
// import { UserInjector, appendScript, } from '@haaretz/htz-components';
import { UserInjector, BIRequest, } from '@haaretz/htz-components';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

import theme from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import PurchaseHeader from '../components/PurchaseHeader/PurchaseHeader';
import PurchasePageFooter from '../components/PurchasePageFooter/PurchasePageFooter'; // eslint-disable-line import/no-named-as-default
import UserBanner from '../components/UserBanner/UserBanner';
import Scripts from '../components/Scripts/Scripts';

const GET_HOST_NAME = gql`
  query {
    hostname @client
    user @client {
      type
    }
  }
`;

const propTypes = {
  /**
   * Children nodes
   */
  children: PropTypes.node,
  /**
   * should the footer render Illustrations
   */
  displayBackButton: PropTypes.bool,
  /**
   * should the MainLayout render the header component, used to allow pages to render without regular header
   */
  renderHeader: PropTypes.bool,
  /**
   * Is it the thankYou page.
   */
  thankYou: PropTypes.bool,
  /**
   * Did the user pay.
   */
  userPaid: PropTypes.bool,
  /**
   * should the footer render Illustrations
   */
  footerHasIllustration: PropTypes.bool,
};

const defaultProps = {
  children: null,
  displayBackButton: true,
  renderHeader: true,
  thankYou: false,
  userPaid: true,
  footerHasIllustration: true,
};

const wrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const StyledWrapper = createComponent(wrapperStyle);

const contentWrapperStyle = () => ({
  flexGrow: 1,
});

const StyledContentWrapper = createComponent(contentWrapperStyle);

function MainLayout({
  children,
  displayBackButton,
  renderHeader,
  thankYou,
  userPaid,
  footerHasIllustration,
}) {
  return (
    <Query query={GET_HOST_NAME}>
      {({ data: { hostname, user: { type, }, }, }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        return (
          <Fragment>
            <UserInjector />
            <StyleProvider renderer={styleRenderer} theme={theme(host)}>
              <FelaComponent
                render={({
                  theme: { seo: { [host]: { title, description, }, }, },
                }) => (
                  <Fragment>
                    <Head>
                      <title>{title}</title>
                      <meta name="description" content={description} />
                    </Head>
                    <div id="pageRoot">
                      <StyledWrapper>
                        {renderHeader && (
                          <Fragment>
                            <PurchaseHeader
                              host={host}
                              displayBackButton={displayBackButton}
                            />
                            <UserBanner />
                          </Fragment>
                        )}
                        <StyledContentWrapper>{children}</StyledContentWrapper>
                        <PurchasePageFooter
                          host={host}
                          hasIllustration={footerHasIllustration}
                        />
                      </StyledWrapper>
                    </div>
                    <div id="modalsRoot" />
                  </Fragment>
                )}
              />
            </StyleProvider>
            <BIRequest />
            <Scripts
              host={host}
              userType={type}
              thankYou={thankYou}
              userPaid={userPaid}
            />
          </Fragment>
        );
      }}
    </Query>
  );
}

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
