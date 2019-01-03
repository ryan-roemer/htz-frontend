/* eslint-disable react/no-did-mount-set-state */

import React, { Fragment, } from 'react';
import { ApolloConsumer, } from 'react-apollo';
import { GoogleAnalytics, EventTracker, Footer, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { FelaTheme, } from 'react-fela';
import Header from '../layouts/Header';
// import Footer from '../layouts/Footer';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme/index';
import GET_HOST from './queries/GetHost';
import FlowDispenser from '../components/FlowDispenser/FlowDispenser';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import IndexForm from '../components/Misc/Forms/IndexForm';

// Styling Components -------
const { PageWrapper, ContentWrapper, } = LoginContentStyles;
const { MobileFooterSpacer, } = LoginMiscLayoutStyles;
// --------------------------

const Index = () => (
  <Fragment>
    <GoogleAnalytics withEC />
    <ApolloConsumer>
      {client => {
        const host = client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        return (
          <StyleProvider renderer={styleRenderer} theme={theme(host)}>
            <FelaTheme
              render={theme => (
                <Fragment>
                  <EventTracker>
                    {({ biAction, gaAction, gaMapper, }) => (
                      <PageWrapper>
                        <Header />
                        <ContentWrapper>
                          <FlowDispenser
                            render={({ getFlowByData, }) => (
                              <IndexForm
                                client={client}
                                getFlowByData={getFlowByData}
                                theme={theme}
                                biAction={biAction}
                                gaAction={gaAction}
                              />
                            )}
                          />
                        </ContentWrapper>
                        <MobileFooterSpacer />
                        <Footer contentId="7.1283189" />
                      </PageWrapper>
                    )}
                  </EventTracker>
                </Fragment>
              )}
            />
          </StyleProvider>
        );
      }}
    </ApolloConsumer>
  </Fragment>
);

export default Index;
