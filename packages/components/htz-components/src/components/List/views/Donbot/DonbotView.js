import React from 'react';
// @flow
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import Image from '../../../Image/Image';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import ListView from '../../../ListView/ListView';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserSubtitle from '../../../TeaserSubtitle/TeaserSubtitle';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import getImageAssets from '../../../../utils/getImageAssets';
import TeaserRank from '../../../TeaserRank/TeaserRank';

type Props = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

DonbotList.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};

export default function DonbotList({
  list,
  biAction,
  gaAction,
  lazyLoadImages,
}: Props): Node {
  const { items, } = list;
  const mainTeaser = items && items.length > 0 && items[0];
  const teaser1 = items && items.length > 1 && items[1];
  const teaser2 = items && items.length > 2 && items[2];
  const teaser3 = items && items.length > 3 && items[3];
  const teaser4 = items && items.length > 4 && items[4];

  return (
    <ListView
      gutter={4}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
    >
      {/* LIST HEADER */}
      <GridItem
        stretchContent
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
      >
        <ListViewHeader
          title={list.title}
          extraLinks={list.extraLinks}
          marketingTeaser={list.marketingTeaser}
        />
      </GridItem>

      {/* LIST CONTENT */}
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
        miscStyles={{ display: 'flex', }}
      >
        <Grid
          gutter={4}
          rowSpacing={[
            { until: 's', value: { amount: 1, }, },
            { from: 's', until: 'xl', value: { amount: 4, }, },
          ]}
        >
          {/* MAIN TEASER */}
          <GridItem
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 6 / 10, }, ]}
          >
            {mainTeaser && (
              <DonbotMainTeaser
                item={mainTeaser}
                lazyLoadImages={lazyLoadImages}
                biAction={biAction}
              />
            )}
          </GridItem>

          {/* QUADRUPLETS */}
          <GridItem
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 4 / 10, }, ]}
            miscStyles={{ display: 'flex', }}
          >
            <Grid
              gutter={0}
              rowSpacing={[
                { until: 's', value: { amount: 1, nUp: 2, }, },
                { from: 's', value: { amount: 4, nUp: 2, }, },
              ]}
            >
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineEnd: [
                    { until: 's', value: 0.5, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser1 && (
                  <DonbotTeaser
                    index={1}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser1}
                    biAction={biAction}
                  />
                )}
              </GridItem>
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineStart: [
                    { until: 's', value: 0.5, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser2 && (
                  <DonbotTeaser
                    index={2}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser2}
                    biAction={biAction}
                  />
                )}
              </GridItem>
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineEnd: [
                    { until: 's', value: 0.5, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser3 && (
                  <DonbotTeaser
                    index={3}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser3}
                    biAction={biAction}
                  />
                )}
              </GridItem>
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineStart: [
                    { until: 's', value: 0.5, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser4 && (
                  <DonbotTeaser
                    index={4}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser4}
                    biAction={biAction}
                  />
                )}
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  item: TeaserDataType,
  lazyLoadImages?: boolean,
  biAction: ?ListBiActionType,
  index: number,
};

DonbotMainTeaser.defaultProps = { lazyLoadImages: true, index: 0, };

function DonbotMainTeaser({
  item,
  lazyLoadImages,
  biAction,
}: TeaserProps): React.Node {
  const articleId = item.contentId;
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={item}
          gutter={0}
          onClick={() => biAction({ index: 0, articleId, })}
          isStacked
        >
          <TeaserMedia data={item} isStacked>
            <Image
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '590px', },
                  { from: 'l', size: '476px', },
                  { from: 'm', size: '720px', },
                  { from: 's', size: '552px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 720, 590, 552, 476, 360, ],
              })}
              data={item.image}
            />
          </TeaserMedia>

          <TeaserContent
            data={item}
            padding={[
              { until: 'xl', value: [ 1, 2, 0, ], },
              { from: 'xl', value: [ 1, 4, 0, ], },
            ]}
            isStacked
            gridItemMiscStyles={{ alignItems: 'center', }}
            footerPadding={[
              { until: 'xl', value: [ 1, 2, ], },
              { from: 'xl', value: [ 2, 4, 1, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            renderContent={() => (
              <React.Fragment>
                <TeaserHeader
                  {...item}
                  isCentered
                  typeScale={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 2, },
                    { from: 'l', until: 'xl', value: 3, },
                    { from: 'xl', value: 2, },
                  ]}
                />
                <TeaserSubtitle
                  {...item}
                  typeScale={[
                    { until: 'xl', value: 0, },
                    { from: 'xl', value: -1, },
                  ]}
                  miscStyles={{
                    display: [ { until: 's', value: 'none', }, ],
                    fontWeight: '400',
                    marginTop: '1rem',
                    textAlign: 'center',
                  }}
                />
              </React.Fragment>
            )}
            renderFooter={() => (
              <Footer data={item} hasCommentsOnMobile hasRankOnMobile />
            )}
          />
        </Teaser>
      )}
    />
  );
}

DonbotTeaser.defaultProps = { biAction: null, lazyLoadImages: true, };
function DonbotTeaser({
  item,
  index,
  biAction,
  lazyLoadImages,
}: TeaserProps): Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={item}
          onClick={
            biAction
              ? () => biAction({ index, articleId: item.contentId, })
              : null
          }
          isStacked
        >
          <TeaserMedia data={item} isStacked>
            <Image
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '178px', },
                  { from: 'l', size: '143px', },
                  { from: 'm', size: '343px', },
                  { from: 's', size: '264px', },
                  { size: 'calc(50vw - 5rem)', },
                ],
                widths: [ 500, 350, 270, 180, 150, ],
              })}
              data={item.image}
            />
          </TeaserMedia>

          <TeaserContent
            data={item}
            padding={[ 1, 1, 0, ]}
            footerPadding={1}
            footerMiscStyles={{
              fontWeight: '700',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
              color: theme.color('neutral', '-3'),
            }}
            isStacked
            renderContent={data => (
              <TeaserHeader
                {...data}
                typeScale={[
                  { until: 's', value: -1, },
                  { from: 'xl', value: -1, },
                ]}
              />
            )}
            renderFooter={() => (
              <CommentsCount
                commentsCount={item.commentsCounts}
                miscStyles={{ paddingRight: '1rem', }}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}

type FooterProps = {
  data: TeaserDataType,
  hasCommentsOnMobile: boolean,
  hasRankOnMobile: boolean,
};

Footer.defaultProps = {
  hasCommentsOnMobile: false,
  hasRankOnMobile: false,
};

function Footer({
  data,
  hasCommentsOnMobile,
  hasRankOnMobile,
}: FooterProps): React.Node {
  return (
    <React.Fragment>
      {data.authors ? (
        <span style={{ marginInlineEnd: '1rem', }}>
          <TeaserAuthors
            authors={data.authors}
            miscStyles={{ fontWeight: 'bold', }}
          />
          <span> | </span>
          <TeaserTime {...data} />
        </span>
      ) : null}
      <CommentsCount
        commentsCount={data.commentsCounts}
        miscStyles={{
          marginInlineEnd: '1rem',
          display: hasCommentsOnMobile
            ? [ { until: 's', value: 'none', }, ]
            : undefined,
        }}
      />
      {data.rank ? (
        <TeaserRank
          rank={data.rank}
          miscStyles={{
            display: hasRankOnMobile
              ? [ { until: 's', value: 'none', }, ]
              : undefined,
          }}
        />
      ) : null}
    </React.Fragment>
  );
}
