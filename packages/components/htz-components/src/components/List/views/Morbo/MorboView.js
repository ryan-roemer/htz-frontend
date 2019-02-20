// @flow

import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import CommentsCount from '../../../CommentsCount/CommentsCount';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import StickyListViewHeader from '../../../ListViewHeader/StickyListViewHeader';
import Picture from '../../../Image/Picture';
import Section from '../../../AutoLevels/Section';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import getPictureAssets from '../../../../utils/getPictureAssets';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';

type MorboPropsType = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

Morbo.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};

export default function Morbo({
  list,
  lazyLoadImages,
  biAction,
  gaAction,
}: MorboPropsType): React.Node {
  const [ teaser1Data, teaser2Data, teaser3Data, ] = (list && list.items) || [];

  return (
    <ListView
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
      gutter={4}
      innerBackgroundColor="transparent"
      miscStyles={{
        display: [ { until: 's', value: 'none', }, ],
      }}
    >
      {/* Header */}
      <StickyListViewHeader isHorizontal {...list} width={1} />

      {/* Items */}
      <GridItem stretchContent width={1} miscStyles={{ marginTop: '1rem', }}>
        <Section isFragment>
          <Grid
            gutter={4}
            rowSpacing={[
              { until: 's', value: { amount: 2, }, },
              { from: 's', until: 'l', value: { amount: 4, }, },
            ]}
          >
            {/* Item 1 */}
            <GridItem
              stretchContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 6 / 12, },
                { from: 'xl', value: 4 / 12, },
              ]}
            >
              <Teaser1 data={teaser1Data} biAction={biAction} />
            </GridItem>

            {/* Item 2 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 1 / 2, },
                { from: 'l', until: 'xl', value: 3 / 12, },
                { from: 'xl', value: 2 / 12, },
              ]}
            >
              <Teaser234 data={teaser2Data} biAction={biAction} />
            </GridItem>

            {/* Item 3 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 1 / 2, },
                { from: 'l', until: 'xl', value: 3 / 12, },
                { from: 'xl', value: 2 / 12, },
              ]}
            >
              <Teaser234 data={teaser3Data} biAction={biAction} />
            </GridItem>

            {/* DFP */}
            {list.dfp instanceof Array && list.dfp.length > 0 ? (
              <GridItem
                stretchContent
                miscStyles={{
                  display: [ { until: 'xl', value: 'none', }, { from: 'xl', value: 'flex', }, ],
                  justifyContent: [ { from: 'xl', value: 'center', }, ],
                  flexWrap: 'nowrap',
                }}
                width={4 / 12}
              >
                <GeneralAdSlot {...list.dfp[0]} />
              </GridItem>
            ) : null}
          </Grid>
        </Section>
      </GridItem>
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                         Teaser Components                          //
// /////////////////////////////////////////////////////////////////////

type TeaserPropsType = {
  data: TeaserDataType,
  lazyLoadImages?: boolean,
  biAction: ?ListBiActionType,
};

const teaserDefaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

Teaser1.defaultProps = teaserDefaultProps;

function Teaser1({ data, lazyLoadImages, biAction, }: TeaserPropsType): React.Node {
  return (
    <FelaTheme>{theme => (
        <Teaser
          data={data}
          gutter={1}
          onClick={
            biAction ? () => biAction({ index: 0, articleId: data.representedContent, }) : null
          }
          gridMiscStyles={{ flexWrap: 'nowrap', }}
        >
          <TeaserMedia
            data={data}
            width={[
              { until: 's', value: 18, },
              { from: 's', until: 'xl', value: 28, },
              { from: 'l', until: 'xl', value: 21, },
              { from: 'xl', value: 26, },
            ]}
            onClick={
              biAction ? () => biAction({ index: 0, articleId: data.representedContent, }) : null
            }
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: data.image,
                defaultImgOptions: {
                  sizes: [ { size: '120px', }, ],
                  aspect: 'square',
                  widths: [ 120, ],
                },
                sources: [
                  {
                    aspect: 'regular',
                    from: 's',
                    sizes: [
                      { from: 'xl', size: '177px', },
                      { from: 'l', until: 'xl', size: '143px', },
                      { from: 's', until: 'l', size: '220px', },
                    ],
                    widths: [ 225, 180, 160, ],
                  },
                ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={data}
            padding={[ 1, 0, 0, 1, ]}
            footerPadding={[ 1, 0, 0, 1, ]}
            renderContent={() => (
              <TeaserHeader
                onClick={
                  biAction
                    ? () => biAction({
                      index: 0,
                      articleId: data.representedContent,
                    })
                    : null
                }
                typeScale={[ { until: 'xl', value: 0, }, { from: 'xl', value: -1, }, ]}
                {...data}
              />
            )}
            renderFooter={() => (
              <CommentsCount commentsCount={data.commentsCounts} miscStyles={{ type: -3, }} />
            )}
          />
        </Teaser>
      )}</FelaTheme>
  );
}

Teaser234.defaultProps = teaserDefaultProps;
function Teaser234({ data, lazyLoadImages, biAction, }: TeaserPropsType): React.Node {
  return (
    <Teaser
      data={data}
      gutter={0}
      onClick={biAction ? () => biAction({ index: 1, articleId: data.contentId, }) : null}
      gridMiscStyles={{ flexWrap: 'nowrap', }}
    >
      <TeaserContent
        data={data}
        width={1}
        padding={[
          { until: 'l', value: [ 1, 2, 0, ], },
          { from: 'l', until: 'xl', value: [ 1, 1, 0, ], },
          { from: 'xl', value: [ 1, 1, 0, ], },
        ]}
        footerPadding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', until: 'xl', value: [ 1, 1, ], },
          { from: 'xl', value: [ 1, 1, ], },
        ]}
        footerMiscStyles={{
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            typeScale={[
              { until: 's', value: 0, },
              { from: 's', until: 'l', value: 0, },
              { from: 'l', until: 'xl', value: 0, },
              { from: 'xl', value: -1, },
            ]}
            onClick={
              biAction ? () => biAction({ index: 1, articleId: data.representedContent, }) : null
            }
            {...data}
          />
        )}
        renderFooter={() => (
          <React.Fragment>
            <CommentsCount commentsCount={data.commentsCounts} />
          </React.Fragment>
        )}
      />
    </Teaser>
  );
}
