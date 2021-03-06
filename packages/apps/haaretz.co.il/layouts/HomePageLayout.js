// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { StyleProvider, } from '@haaretz/fela-utils';
import dynamic from 'next/dynamic';
import { htzTheme, } from '@haaretz/htz-theme';
import Head from 'next/head';
import {
  AriaLive,
  DeviceTypeInjector,
  RouteChangeListener,
  UserInjector,
  Query,
} from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import HOMEPAGE_LAYOUT from './queries/homepage_layout';

const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
  loading: () => null,
  ssr: false,
});
const GaHomePage = dynamic(
  import('../components/GoogleAnalyticsHomePage/GoogleAnalyticsHomePage'),
  {
    loading: () => null,
    ssr: false,
  }
);

function HomePageLayout({ render, path, }: { render: Function, path: string, }): React.Node {
  return (
    <Query query={HOMEPAGE_LAYOUT} variables={{ path, }}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        if (error) console.error(error);
        const {
          homePage: { slots, seoData, pageDateTimeString, pageType, globalLazyload, },
        } = data;

        client.writeData({
          data: {
            globalLazyload,
            title: seoData.metaTitle,
            pageDateTimeString,
            pageType,
            // place properties to reset in the client store when a new article is loaded
            isOsakaDisplayed: false,
          },
        });

        return (
          <React.Fragment>
            <Head>
              <title>{seoData.metaTitle}</title>
              <meta
                property="article:publisher"
                content="https://www.facebook.com/haaretz"
              />
              <meta property="fb:pages" content="109551402519" />
              {/*
               * Refresh page every 5 mins
               * TODO: Only refresh changed items and ads
               */}
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
window.__HTZ = {};
try {
  if (window.matchMedia("(min-width: 37.5em)").matches) {
    var refreshTimer = setTimeout(
      function refreshWindow() { typeof window != 'undefined' &&  window.location.reload() },
      ${1000 * 60 * 5}
    );
    window.__HTZ.cancelRefresh = function cancelRefresh() {
      clearTimeout(refreshTimer);
    };
  }
}
catch (err) {console.log(err)}`,
                }}
              />

              <meta name="description" content={seoData.metaDescription} />
              <link rel="canonical" href={seoData.canonicalUrl} />
              <link
                rel="alternate"
                media="only screen and (max-width: 640px)"
                href="https://www.haaretz.co.il/whtzMobileSite/"
              />
            </Head>
            <RouteChangeListener />
            <UserInjector />
            <DfpInjector path="/" pageType="htz_hp" />
            <StyleProvider renderer={styleRenderer} theme={htzTheme}>
              <React.Fragment>
                <AriaLive />
                <DeviceTypeInjector />
                <div id="maavaron" />
                <FelaComponent
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                  }}
                >
                  {render({ slots, globalLazyload, })}
                </FelaComponent>
                {/* <WelcomePage /> */}
              </React.Fragment>
            </StyleProvider>
            <GaHomePage />
            {/* <div id="welcomePageModal" /> */}
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default HomePageLayout;
