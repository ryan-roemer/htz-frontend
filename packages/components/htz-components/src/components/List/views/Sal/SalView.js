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
import Image from '../../../Image/Image';
import Section from '../../../AutoLevels/Section';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';

type SalPropsType = {
  list: ListDataType,
  isLazyloadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

Sal.defaultProps = {
  biAction: null,
  gaAction: null,
  isLazyloadImages: true,
};

export default function Sal({
  list,
  isLazyloadImages,
  biAction,
  gaAction,
}: SalPropsType): React.Node {
  const [ teaser1Data, teaser2Data, teaser3Data, teaser4Data, ] = (list && list.items) || [];

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
              { from: 'l', until: 'xl', value: { amount: 4, nUp: 2, }, },
            ]}
          >
            {/* Item 1 */}
            <GridItem
              stretchContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 7 / 12, },
                { from: 'xl', value: 4 / 12, },
              ]}
            >
              <Teaser124 data={teaser1Data} biAction={biAction} />
            </GridItem>

            {/* Item 2 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 1 / 2, },
                { from: 'l', until: 'xl', value: 5 / 12, },
                { from: 'xl', value: 3 / 12, },
              ]}
            >
              <Teaser124
                data={teaser2Data}
                biAction={biAction}
                hideImageUntilXl
              />
            </GridItem>

            {/* Item 3 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 1 / 2, },
                { from: 'l', until: 'xl', value: 6 / 12, },
                { from: 'xl', value: 2 / 12, },
              ]}
            >
              <Teaser3 data={teaser3Data} biAction={biAction} />
            </GridItem>

            {/* Item 4 */}
            <GridItem
              stretchContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 6 / 12, },
                { from: 'xl', value: 3 / 12, },
              ]}
            >
              <Teaser124
                data={teaser4Data}
                biAction={biAction}
                hideImageUntilXl
              />
            </GridItem>
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
  isLazyloadImages: boolean,
  biAction: ?ListBiActionType,
  hideImageUntilXl: boolean,
};

const teaserDefaultProps = {
  isLazyloadImages: true,
  biAction: null,
  hideImageUntilXl: false,
};

Teaser124.defaultProps = teaserDefaultProps;

function Teaser124({
  data,
  isLazyloadImages,
  biAction,
  hideImageUntilXl,
}: TeaserPropsType): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={
            biAction
              ? () => biAction({ index: 0, articleId: data.representedContent, })
              : null
          }
          gridMiscStyles={{ flexWrap: 'nowrap', }}
        >
          <TeaserMedia
            data={data}
            width={[
              { until: 's', value: 18, },
              { from: 's', until: 'l', value: 28, },
              { from: 'l', until: 'xl', value: 2 / 7, },
              { from: 'xl', value: 22, },
            ]}
            onClick={
              biAction
                ? () => biAction({ index: 0, articleId: data.representedContent, })
                : null
            }
            miscStyles={
              hideImageUntilXl
                ? { display: [ { until: 'xl', value: 'none', }, ], }
                : null
            }
          >
            <Image
              lazyLoad={isLazyloadImages}
              data={data.image}
              imgOptions={{
                transforms: { width: '168', aspect: 'regular', },
              }}
              isExternal
            />
          </TeaserMedia>
          <TeaserContent
            data={data}
            padding={[ 1, 1, 0, ]}
            width={[ { from: 'l', until: 'xl', value: 5 / 7, }, ]}
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
                typeScale={[
                  { until: 'xl', value: 0, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}

Teaser3.defaultProps = teaserDefaultProps;
function Teaser3({
  data,
  isLazyloadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <Teaser
      data={data}
      gutter={0}
      onClick={
        biAction
          ? () => biAction({ index: 1, articleId: data.contentId, })
          : null
      }
    >
      <TeaserContent
        data={data}
        width={1}
        padding={[
          { until: 'l', value: [ 1, 2, 0, ], },
          { from: 'l', until: 'xl', value: [ 1, 1, 0, ], },
          { from: 'xl', value: [ 1, 2, 0, ], },
        ]}
        renderContent={() => (
          <TeaserHeader
            typeScale={[
              { until: 's', value: 0, },
              { from: 's', until: 'l', value: 0, },
              { from: 'l', until: 'xl', value: 0, },
              { from: 'xl', value: -1, },
            ]}
            onClick={
              biAction
                ? () => biAction({ index: 1, articleId: data.representedContent, })
                : null
            }
            {...data}
          />
        )}
      />
    </Teaser>
  );
}
