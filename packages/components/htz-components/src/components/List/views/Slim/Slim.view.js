// @flow
import React, { type StatelessFunctionalComponent, } from 'react';
import { FelaTheme, } from 'react-fela';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import Grid from '../../../Grid/Grid';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import Media from '../../../Media/Media';
import { MainGallery, MobileGalleryTeaser, RelatedGallery, } from './GalleriesComponents';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
};
const Slim: StatelessFunctionalComponent<Props> = ({
  list,
  listId,
  gaAction,
  biAction,
}) => {
  const { items, } = list;
  return (
    <FelaTheme
      render={theme => (
        <Media
          query={{ from: 's', }}
        >
          {matches => (matches
            ? (
              <ListView
                innerBackgroundColor={[ 'neutral', ]}
                outerBackgroundColor={[ 'neutral', '-1', ]}
                miscStyles={{
                  paddingStart: [ { from: 'xl', value: '4rem', }, ],
                  paddingEnd: [ { from: 'xl', value: '4rem', }, ],
                }}
              >
                { /* Gallery Title */}
                <GridItem
                  width={1}
                  miscStyles={{
                    paddingBottom: '1rem',
                    paddingTop: '1rem',
                  }}
                >
                  {
                    items[0].inputTemplate === 'com.tm.TeaserData'
                      ? (
                        <TeaserHeader
                          {...items[0]}
                          typeScale={0}
                          color={[ 'neutral', '-10', ]}
                          miscStyles={{
                            paddingStart: [ { until: 'xl', value: '4rem', }, ],
                          }}
                        />
                      )
                      : null
                  }
                </GridItem>
                {/* Main Gallery */}
                <GridItem
                  width={[
                    { until: 'xl', value: 1, },
                    { from: 'xl', value: 9 / 12, },
                  ]}
                  miscStyles={{
                    paddingBottom: [
                      { until: 'xl', value: '2rem', },
                    ],
                  }}
                >
                  {
                    items[0].inputTemplate === 'com.tm.TeaserData'
                      ? (
                        <MainGallery item={items[0]} />
                      )
                      : null
                  }
                </GridItem>
                {/* Related Galleries */}
                <GridItem
                  width={[
                    { until: 'xl', value: 1, },
                    { from: 'xl', value: 3 / 12, },
                  ]}
                  stretchContent
                  miscStyles={{
                    borderTop: [
                      { until: 'xl', value: [ '1px', 0, 'solid', theme.color('neutral', '-5'), ], },
                    ],
                  }}
                >
                  <Grid
                    gutter={2}
                    miscStyles={{
                      padding: [ { until: 'xl', value: '4rem', }, ],
                    }}
                  >
                    {
                      items[1].inputTemplate === 'com.tm.TeaserData'
                        ? (
                          <RelatedGallery item={items[1]} biAction={biAction} />
                        )
                        : null
                    }
                    {
                      items[2].inputTemplate === 'com.tm.TeaserData'
                        ? (
                          <RelatedGallery item={items[2]} biAction={biAction} />
                        )
                        : null
                    }
                    {
                      items[3].inputTemplate === 'com.tm.TeaserData'
                        ? (
                          <RelatedGallery
                            item={items[3]}
                            biAction={biAction}
                            miscStyles={{
                              display: [
                                { until: 'l', value: 'none', },
                                { from: 'xl', value: 'none', },
                              ],
                            }}
                          />
                        )
                        : null
                    }
                  </Grid>
                </GridItem>
              </ListView>
            )
            : (
              items[0].inputTemplate === 'com.tm.TeaserData'
                ? (
                  <MobileGalleryTeaser item={items[0]} biAction={biAction} />
                )
                : null
            ))
          }
        </Media>
      )}
    />
  );
};
export default Slim;
