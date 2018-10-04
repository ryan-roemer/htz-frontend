// @flow
import React, { Fragment, } from 'react';
import type { ChildrenArray, Element, Node, } from 'react';
import Head from 'next/head';
import { FelaComponent, } from 'react-fela';
// import dynamic from 'next/dynamic';
import {
  AriaLive,
  DeviceTypeInjector,
  GoogleAnalytics,
  LayoutContainer,
  RouteChangeListener,
  ScrollListener,
  UserInjector,
} from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { tmTheme, } from '@haaretz/tm-theme';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import Masthead from '../components/Masthead/Masthead';
import NavigationBar from '../components/NavigationBar/NavigationBar';
/*
const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
  loading: () => null,
  ssr: false,
});
*/

type Props = {
  children: ChildrenArray<Element<any>>,
  section?: string,
  assetId?: string,
};

function MainLayout({ children, section, assetId, }: Props): Node {
  return (
    <Fragment>
      <Head>
        {/* TODO: Make dynamic when we'll have routing */}
        <title>Finance</title>
      </Head>
      <ScrollListener />
      <RouteChangeListener />
      {/* <DfpInjector path={path} /> */}
      <GoogleAnalytics withEC />
      <UserInjector />
      <StyleProvider renderer={styleRenderer} theme={tmTheme}>
        <Fragment>
          <AriaLive />
          <DeviceTypeInjector />
          <Masthead />
          <FelaComponent
            style={theme => ({
              backgroundColor: theme.color('neutral', '-6'),
            })}
          >
            <LayoutContainer
              bgc="transparent"
            >
              <NavigationBar section={section} assetId={assetId} />
              {children}
            </LayoutContainer>
          </FelaComponent>
        </Fragment>
      </StyleProvider>
    </Fragment>
  );
}

export default MainLayout;
