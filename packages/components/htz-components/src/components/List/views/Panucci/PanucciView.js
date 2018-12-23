// @flow
import * as React from 'react';

import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';

import MainTeaser from './MainTeaser';
import HorizontalTeaser from './HorizontalTeaser';
import VerticalTeaser from './VerticalTeaser';
import VerticalImageTeaser from './VerticalImageTeaser';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

type Props = {
  list: ListDataType,
  listId: string,
  lazyLoadImages: boolean,
  gaAction: ?() => void,
  biAction: ?ListBiActionType,
};

Panucci.defaultProps = {
  lazyLoadImages: true,
  gaAction: null,
  biAction: null,
};

export default function Panucci({
  list,
  listId,
  gaAction,
  biAction,
  lazyLoadImages,
}: Props): React.Node {
  // TODO: filter teaser and banners when kind field is available (or by inputTemplate)
  const teaserItems = list.items;
  const banners = null;

  return (
    <ListView>
      {/* header */}
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
        miscStyles={{
          marginBottom: [
            { until: 'l', value: '1rem', },
            { from: 's', value: '4rem', },
          ],
        }}
      >
        <ListViewHeader
          url={list.url}
          extraLinks={list.extraLinks}
          title={list.title}
        />
      </GridItem>
      {/* end header */}

      {/* List items */}
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 8 / 12, }, ]}
      >
        <Grid
          rowSpacing={[
            { until: 's', value: { amount: 1, nUp: 1, }, },
            { from: 's', value: { amount: 4, nUp: 1, }, },
          ]}
        >
          <GridItem width={1}>
            <Grid
              gutter={4}
              rowSpacing={[
                { until: 's', value: { amount: 1, nUp: 1, }, },
                { from: 's', value: { amount: 0, nUp: 1, }, },
              ]}
            >
              {/* item 1 */}
              <GridItem
                width={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'l', value: 8 / 12, },
                  { from: 'l', until: 'xl', value: 5 / 8, },
                  { from: 'xl', value: 4 / 6, },
                ]}
              >
                <MainTeaser
                  itemData={teaserItems[0]}
                  lazyLoadImages={lazyLoadImages}
                  biAction={biAction}
                />
              </GridItem>

              {/* item 2 */}
              <GridItem
                width={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'l', value: 4 / 12, },
                  { from: 'l', until: 'xl', value: 3 / 8, },
                  { from: 'xl', value: 2 / 6, },
                ]}
              >
                <VerticalImageTeaser
                  itemData={teaserItems[1]}
                  lazyLoadImages
                  biAction={biAction}
                  displayFlags={{
                    authors: true,
                    publishDate: true,
                    commentsCount: true,
                  }}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem width={1}>
            <Grid
              rowSpacing={[
                { until: 's', value: { amount: 1, nUp: 1, }, },
                { from: 's', value: { amount: 0, nUp: 1, }, },
              ]}
            >
              {/* item3  */}
              <GridItem
                width={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'l', value: 4 / 12, },
                  { from: 'l', until: 'xl', value: 3 / 8, },
                  { from: 'xl', value: 2 / 6, },
                ]}
              >
                <VerticalTeaser
                  itemData={teaserItems[2]}
                  lazyLoadImages
                  biAction={biAction}
                  displayFlags={{
                    authors: true,
                    publishDate: true,
                    commentsCount: true,
                  }}
                />
              </GridItem>
              <GridItem
                width={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'l', value: 8 / 12, },
                  { from: 'l', until: 'xl', value: 5 / 8, },
                  { from: 'xl', value: 4 / 6, },
                ]}
              >
                <Grid
                  rowSpacing={[
                    { until: 's', value: { amount: 1, nUp: 1, }, },
                    { from: 's', value: { amount: 4, nUp: 1, }, },
                  ]}
                >
                  {/* item 4 */}
                  <GridItem width={1}>
                    <HorizontalTeaser
                      itemData={teaserItems[3]}
                      lazyLoadImages
                      biAction={biAction}
                      displayFlags={{ commentsCount: true, }}
                      index={3}
                    />
                  </GridItem>
                  {/* item 5 */}
                  <GridItem width={1}>
                    <HorizontalTeaser
                      itemData={teaserItems[4]}
                      lazyLoadImages
                      biAction={biAction}
                      displayFlags={{ commentsCount: true, }}
                      index={4}
                    />
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
      {/* end list items */}

      {/* banner */}
      {banners !== null && banners.length > 0 ? (
        <GridItem
          width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
          miscStyles={{ marginTop: [ { until: 'l', value: '1rem', }, ], }}
        >
          {/* banner content */}
          <p style={{ backgroundColor: 'orange', height: '100%', }}>Banner</p>
        </GridItem>
      ) : null}
      {/* end banner */}
    </ListView>
  );
}
