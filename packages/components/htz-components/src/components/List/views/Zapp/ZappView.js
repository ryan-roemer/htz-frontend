// @flow
import * as React from 'react';

import GeneralAdSlot from '../../../Ads/GeneralAdSlot';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ZappItem from './ZappItem';
// import ZappPromotedContent from './ZappPromotedContent';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const width = [ { until: 'l', value: 1, }, { from: 'l', value: 1 / 4, }, ];

type ZappPropTypes = {
  list: ListDataType,
  isLazyloadImages: boolean,
  gaAction: () => void,
  biAction: ?ListBiActionType,
};

Zapp.defaultProps = {
  isLazyloadImages: false,
};

export default function Zapp({
  isLazyloadImages,
  list,
  gaAction,
  biAction,
}: ZappPropTypes): React.Node {
  const numOfItems = list && list.items ? list.items.length : 0;
  return (
    <ListView
      gutter={4}
      innerBackgroundColor={[
        { until: 's', value: 'transparent', },
        { from: 's', value: 'white', },
      ]}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, 4, ], }, ]}
      marginTop={[ { until: 's', value: 2, }, { from: 's', value: 0, }, ]}
      rowSpacing={[
        { until: 's', value: { amount: 2, }, },
        { from: 's', until: 'l', value: { amount: 4, }, },
      ]}
    >
      {numOfItems > 0 ? (
        <GridItem
          width={width}
          miscStyles={{ display: 'flex', }}
        >
          <ZappItem
            data={list.items[0]}
            isLazyloadImages={isLazyloadImages}
            index={0}
            biAction={biAction}
          />
        </GridItem>
      ) : null}
      <GridItem
        width={width}
        miscStyles={{
          display: [ { from: 's', value: 'none', }, ],
        }}
      >
        {/* banner */}
        {list.dfp && list.dfp.length > 0
          ? list.dfp.map(banner => (
            <GridItem
              key={banner.contentId}
              width={1}
              miscStyles={{
                display: [
                  { until: 's', value: 'block', },
                  { from: 's', value: 'none', },
                ],
              }}
            >
              {/* banner content */}
              <GeneralAdSlot {...banner} />
            </GridItem>
          ))
          : null}
        {/* end banner */}
      </GridItem>
      {numOfItems > 1 ? (
        <GridItem
          width={width}
          miscStyles={{ display: 'flex', }}
        >
          <ZappItem
            data={list.items[1]}
            isLazyloadImages={isLazyloadImages}
            index={1}
            biAction={biAction}
          />
        </GridItem>
      ) : null}
      {numOfItems > 2 ? (
        <GridItem
          width={width}
          miscStyles={{ display: 'flex', }}
        >
          <ZappItem
            data={list.items[2]}
            isLazyloadImages={isLazyloadImages}
            index={2}
            biAction={biAction}
          />
        </GridItem>
      ) : null}
      {numOfItems > 3 ? (
        <GridItem
          width={width}
          miscStyles={{ display: 'flex', }}
        >
          <ZappItem
            data={list.items[3]}
            isLazyloadImages={isLazyloadImages}
            hideImageOnMobile
            index={3}
            biAction={biAction}
          />
        </GridItem>
      ) : null}
    </ListView>
  );
}
