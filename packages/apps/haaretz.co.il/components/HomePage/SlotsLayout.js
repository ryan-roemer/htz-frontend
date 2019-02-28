// @flow
import * as React from 'react';

import {
  LayoutRow,
  LayoutContainer,
  MarketingNotificationProvider,
  BIRequest,
} from '@haaretz/htz-components';

import HeaderSlot from './HeaderSlot';
import MainSlot from './MainSlot';
import getElements from '../../utils/getHomePageElements';

type Props = {
  globalLazyload: number,
  slots: {
    preHeader: {
      inputTemplate: string,
      contentId: string,
      properties: {},
    }[],
    header: { inputTemplate: string, contentId: string, properties: {}, }[],
    postHeader: { inputTemplate: string, contentId: string, properties: {}, }[],
    postMain: { inputTemplate: string, contentId: string, properties: {}, }[],
    footer: { inputTemplate: string, contentId: string, properties: {}, }[],
    main: { inputTemplate: string, contentId: string, properties: {}, }[],
  },
};

function HomePageSlotsLayout({
  slots: { preHeader, header, postHeader, postMain, footer, main, },
  globalLazyload,
}: Props): React.Node {
  const extractElements = slot => slot.map(element => {
    const Element = getElements(element.inputTemplate);
    const { properties, ...elementWithoutProperties } = element;

    if (element.inputTemplate === 'com.tm.FooterElement') {
      return (
        <Element
          key={elementWithoutProperties.contentId}
          {...elementWithoutProperties}
          {...properties}
          shouldRenderScripts
        />
      );
    }
    return (
      <Element
        key={elementWithoutProperties.contentId}
        {...elementWithoutProperties}
        {...properties}
      />
    );
  });

  return (
    <React.Fragment>
      <MarketingNotificationProvider />
      <BIRequest />
      {preHeader ? <LayoutRow>{extractElements(preHeader)}</LayoutRow> : null}
      {/* Layout row is inside HeaderSlot Component because its miscStyles depend on state */}
      <HeaderSlot content={header} />
      {postHeader ? (
        <LayoutRow>
          <LayoutContainer>{extractElements(postHeader)}</LayoutContainer>
        </LayoutRow>
      ) : null}
      <LayoutRow tagName="main" id="pageRoot" miscStyles={{ flexGrow: 1, }}>
        <MainSlot main={main} globalLazyload={globalLazyload} />
      </LayoutRow>
      {postMain ? (
        <LayoutRow miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}>
          <React.Fragment>{extractElements(postMain)}</React.Fragment>
        </LayoutRow>
      ) : null}
      {footer ? <LayoutRow>{extractElements(footer)}</LayoutRow> : null}
      <LayoutRow idName="modalsRoot" />
    </React.Fragment>
  );
}

export default HomePageSlotsLayout;
