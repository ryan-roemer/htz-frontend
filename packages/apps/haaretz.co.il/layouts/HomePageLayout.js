// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { StyleProvider, } from '@haaretz/fela-utils';
import dynamic from 'next/dynamic';
import { htzTheme, } from '@haaretz/htz-theme';
import { createLogger, } from '@haaretz/app-utils';
import Head from 'next/head';
import {
  AriaLive,
  DeviceTypeInjector,
  GoogleAnalytics,
  ScrollListener,
  RouteChangeListener,
  UserInjector,
  Query,
} from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import HOMEPAGE_LAYOUT from './queries/homepage_layout';

const logger = createLogger();

const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
  loading: () => null,
  ssr: false,
});

function HomePageLayout({ render, }: { render: Function, }): React.Node {
  return (
    <Query query={HOMEPAGE_LAYOUT}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        if (error) logger.error(error);
        const { homePage: { slots, }, } = data;
        const titleSEO = 'חדשות, ידיעות מהארץ והעולם - עיתון הארץ';
        client.writeData({
          data: {
            title: titleSEO,
            // place properties to reset in the client store when a new article is loaded
            isOsakaDisplayed: false,
          },
        });

        return (
          <React.Fragment>
            <Head>
              <title>{titleSEO}</title>
            </Head>
            <ScrollListener />
            <RouteChangeListener />
            <UserInjector />
            <DfpInjector path="/" pageType="htz_hp" />
            <GoogleAnalytics withEC />
            <StyleProvider renderer={styleRenderer} theme={htzTheme}>
              <React.Fragment>
                <AriaLive />
                <DeviceTypeInjector />
                <FelaComponent
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                  }}
                >
                  {render({ slots, })}
                </FelaComponent>
                {/* <WelcomePage /> */}
              </React.Fragment>
            </StyleProvider>
            {/* <div id="welcomePageModal" /> */}
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default HomePageLayout;
