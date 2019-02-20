// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { StyleProvider, } from '@haaretz/fela-utils';
import { htzTheme, } from '@haaretz/htz-theme';
import Head from 'next/head';
import {
  AriaLive,
  Query,
} from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import HOMEPAGE_LAYOUT from './queries/homepage_layout';

function HomePageLayout({ render, }: { render: Function, }): React.Node {
  return (
    <Query query={HOMEPAGE_LAYOUT}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        if (error) console.error(error);
        const {
          homePage: { slots, seoData, pageDateTimeString, pageType, },
        } = data;

        client.writeData({
          data: {
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
              <meta property="article:publisher" content="https://www.facebook.com/haaretz" />
              <meta property="fb:pages" content="109551402519" />

              <meta name="description" content={seoData.metaDescription} />
              <link rel="canonical" href={seoData.canonicalUrl} />
              <link rel="alternate" media="only screen and (max-width: 640px)" href="https://www.haaretz.co.il/whtzMobileSite/" />
            </Head>
            <StyleProvider renderer={styleRenderer} theme={htzTheme}>
              <React.Fragment>
                <AriaLive />
                <div id="maavaron" />
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
