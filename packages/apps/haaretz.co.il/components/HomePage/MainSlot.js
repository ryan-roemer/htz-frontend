// @flow
import * as React from 'react';
import Observer from 'react-intersection-observer';
import { FelaComponent, } from 'react-fela';
import {
  ClickTrackerWrapper,
  Debug,
  Error,
  GeneralAdSlot,
  GridElement,
  List,
  MainBlock,
  MarketingNotification,
  MobileListWrapper,
  RssFeed,
  TabElement,
  TopNews,
  validateType,
} from '@haaretz/htz-components';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import type {
  MainSlotElement,
  MainSlotType,
} from '../../flowTypes/MainSlotType';

const {
  isDfp,
  isList,
  isMainBlock,
  isTabElement,
  isGridElement,
  isError,
  isHeaderNewsGroup,
  isClickTrackerWrapper,
  isMobileListWrapper,
  isMiddleRuller,
  isRssFeed,
} = validateType;

const componentType: Object = new Map([
  [
    'com.htz.PageMainBlockElement',
    (element: MainSlotElement) => (isMainBlock(element) ? (
      <MainBlock key={element.contentId} data={element} />
    ) : null),
  ],
  [
    'com.tm.element.List',
    (element: MainSlotElement) => (isList(element) ? <List key={element.contentId} {...element} /> : null),
  ],
  [
    'com.polobase.ClickTrackerBannersWrapper',
    (element: MainSlotElement) => (isClickTrackerWrapper(element) ? (
      <ClickTrackerWrapper key={element.contentId} {...element} />
    ) : null),
  ],
  [
    'com.polobase.DfpBannerElement',
    (element: MainSlotElement) => (isDfp(element) ? (
      <GeneralAdSlot key={element.contentId} {...element} />
    ) : null),
  ],
  [
    'com.tm.TabViewElement',
    (element: MainSlotElement) => (isTabElement(element) ? (
      <TabElement key={element.contentId} {...element} />
    ) : null),
  ],
  [
    'com.tm.GridElementGroup',
    (element: MainSlotElement) => (isGridElement(element) ? (
      <GridElement key={element.contentId} {...element} />
    ) : null),
  ],
  [
    'com.tm.HeaderNewsGroup',
    (element: MainSlotElement) => (isHeaderNewsGroup(element) ? (
      <TopNews key={element.contentId} {...element} />
    ) : null),
  ],
  [
    'com.polobase.whtzMobileSiteListsWrapper',
    (element: MainSlotElement) => (isMobileListWrapper(element) ? (
      <MobileListWrapper key={element.contentId} {...element} />
    ) : null),
  ],
  [
    'com.tm.promotion.banner.MiddleRuler',
    (element: MainSlotElement) => (isMiddleRuller(element) ? (
      <MarketingNotification
        key={element.contentId}
        notificationType="MiddleRuller"
        buttonText=""
        text1={element.text}
        buttonUrl={element.actionUrl}
      />
    ) : null),
  ],
  [
    'com.tm.ExternalRssElement',
    (element: MainSlotElement) => (isRssFeed(element) ? (
      <RssFeed key={element.contentId} {...element} />
    ) : null),
  ],
  [
    'error',
    (element: MainSlotElement) => (isError(element) ? <Error key={element.contentId} {...element} /> : null),
  ],
]);

type Props = {
  main: MainSlotType,
  globalLazyload: number,
};

function HomePageSlotsLayout({ main, globalLazyload, }: Props): React.Node {
  return (
    <FelaComponent
      style={theme => ({
        backgroundColor: theme.color('primary', '-6'),
        extend: [
          parseComponentProp(
            'paddingBottom',
            [
              { until: 's', value: '10rem', },
              { from: 's', until: 'l', value: '8rem', },
              { from: 'l', until: 'xl', value: '10rem', },
              { from: 'xl', value: '9rem', },
            ],
            theme.mq,
            (prop, value) => ({ [prop]: value, })
          ),
        ],
      })}
    >
      {main.map(element => {
        const getComponent = componentType.get(
          element.kind || element.inputTemplate
        );
        return getComponent ? (
          element.loadPriority && element.loadPriority === 'lazy' ? (
            <Observer triggerOnce rootMargin={`${globalLazyload}px`}>
              {inView => (inView ? getComponent(element) : null)}
            </Observer>
          ) : (
            getComponent(element)
          )
        ) : (
          <Debug key={element.contentId}>
            {`Element of type '${element.kind
              || element.inputTemplate}' is not supported in HomePage`}
          </Debug>
        );
      })}
    </FelaComponent>
  );
}

export default HomePageSlotsLayout;
