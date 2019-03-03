// @flow
import React from 'react';

import type { ComponentType, Node, } from 'react';
import type { GridElementType, } from '../../flowTypes/GridElementType';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import List from '../List/List';
import ListView from '../ListView/ListView';
import StickyListViewHeader from '../ListViewHeader/StickyListViewHeader';
import Debug from '../Debug/Debug';
import ClickTracker from '../ClickTracker/ClickTrackerWrapper';
import GeneralAdSlot from '../Ads/GeneralAdSlot';
import TabElement from '../TabElement/TabElement';
import {
  isClickTrackerWrapper,
  isDfp,
  isList,
  isTabElement,
} from '../../utils/validateType';

type GridElementProps = GridElementType & {
  showTitle?: boolean,
  gutter: number,
  withoutWrapper?: boolean,
};

GridElement.defaultProps = {
  gutter: 4, // eslint-disable-line react/default-props-match-prop-types
  showTitle: true, // eslint-disable-line react/default-props-match-prop-types
  withoutWrapper: false, // eslint-disable-line react/default-props-match-prop-types
};

function GridElement({
  title,
  items,
  gutter,
  showTitle,
  withoutWrapper,
}: GridElementProps): Node {
  const WrapperElement: ComponentType<any> = withoutWrapper ? Grid : ListView;
  return (
    <WrapperElement
      gutter={gutter}
      padding={
        withoutWrapper
          ? null
          : [ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]
      }
    >
      {showTitle && title ? (
        <StickyListViewHeader
          width={1}
          miscStyles={{
            marginBottom: '1rem',
          }}
          isHorizontal
          title={title}
        />
      ) : null}
      {items.map(({ content, width, miscStyles, }) => {
        if (!content) return null;
        return (
          <GridItem
            key={content.contentId}
            width={width}
            miscStyles={{
              display: 'flex',
              ...(miscStyles || {}),
            }}
          >
            {isClickTrackerWrapper(content) ? (
              <ClickTracker {...content} />
            ) : isDfp(content) ? (
              <GeneralAdSlot {...content} />
            ) : isList(content) ? (
              <List {...content} />
            ) : isTabElement(content) ? (
              <TabElement {...content} withoutWrapper />
            ) : (
              <Debug key={content.contentId}>
                {`Element of type '${
                  content.inputTemplate
                }' is not supported in GridElementGroup`}
              </Debug>
            )}
          </GridItem>
        );
      })}
    </WrapperElement>
  );
}

export default GridElement;
