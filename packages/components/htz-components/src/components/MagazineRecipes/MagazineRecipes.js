// @flow

import React from 'react';
import { FelaTheme, } from 'react-fela';
import type { StatelessFunctionalComponent, } from 'react';
import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';
import ListView from '../ListView/ListView';
import Image from '../Image/Image';
import getImageAssets from '../../utils/getImageAssets';
import GridItem from '../Grid/GridItem';
import Teaser from '../Teaser/Teaser';
import TeaserMedia from '../TeaserMedia/TeaserMedia';
import TeaserContent from '../TeaserContent/TeaserContent';
import TeaserHeader from '../TeaserHeader/TeaserHeader';
import TeaserAuthors from '../TeaserAuthors/TeaserAuthors';

type Props = {
  properties: { articles: Array<TeaserDataType>, },
};

/* eslint-disable react/prop-types */
const MagazineRecipes: StatelessFunctionalComponent<Props> = ({
  properties: { articles = [], },
}) => (
  <FelaTheme
    render={theme => (
      <ListView outerBackgroundColor="transparent">
        {articles.map(data => (
          <GridItem stretchContent width={[ { until: 's', value: 1, }, { from: 's', value: 1 / 2, }, ]}>
            <Teaser
              data={data}
              miscStyles={{
                marginBottom: [ { until: 's', value: '2rem', }, { from: 's', value: '3rem', }, ],
                boxShadow: [ { until: 's', value: theme.cardStyle.cardElevatedBoxShadow, }, ],
              }}
            >
              <TeaserMedia data={data} width={1}>
                <Image
                  imgOptions={getImageAssets({
                    bps: theme.bps,
                    aspect: 'headline',
                    sizes: [
                      { from: 'xl', size: '602px', },
                      { from: 'l', size: '477px', },
                      { from: 'm', size: '318px', },
                      { from: 's', size: '276px', },
                      { size: 'calc(100vw - 4rem)', },
                    ],
                    widths: [ 602, 560, 477, 390, 351, 318, 296, ],
                  })}
                  data={data.image}
                />
              </TeaserMedia>
              <TeaserContent
                data={data}
                padding={[ { until: 's', value: [ 1, 2, 0, ], }, { from: 's', value: [ 1, 0, 0, ], }, ]}
                footerPadding={[ { until: 's', value: [ 0, 2, 1, ], }, { from: 's', value: 0, }, ]}
                renderContent={() => <TeaserHeader {...data} />}
                footerMiscStyles={{
                  color: theme.color('neutral', '-3'),
                  ...theme.type('-2'),
                  fontWeight: '700',
                }}
                renderFooter={() => <TeaserAuthors authors={data.authors} />}
              />
            </Teaser>
          </GridItem>
        ))}
      </ListView>
    )}
  />
);

export default MagazineRecipes;
