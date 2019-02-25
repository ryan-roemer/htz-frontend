// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';

import { parseTypographyProp, borderTop, } from '@haaretz/htz-css-tools';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import BenderItem from './BenderItem';
import H from '../../../AutoLevels/H';
import Section from '../../../AutoLevels/Section';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const width = [
  { until: 'l', value: 1 / 3, },
  { from: 'l', until: 'xl', value: 1 / 4, },
  { from: 'xl', value: 1 / 6, },
];

const benderWrapperRules = ({ theme, }) => ({
  width: '100%',
  backgroundColor: theme.color('white'),
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
  paddingBottom: '2rem',
  marginTop: '10rem',
  extend: [
    theme.mq({ until: 's', display: 'none', }),
    borderTop('2px', 1, 'solid', theme.color('primary')),
    theme.mq({ from: 's', until: 'l', marginTop: '8rem', }),
    theme.mq({ from: 'xl', marginTop: '9rem', }),
  ],
});

type BenderPropTypes = {
  list: ListDataType,
  lazyLoadImages: boolean,
  gaAction: () => void,
  biAction: ?ListBiActionType,
};

Bender.defaultProps = {
  lazyLoadImages: false,
};

export default function Bender({
  lazyLoadImages,
  list,
  gaAction,
  biAction,
}: BenderPropTypes): React.Node {
  const numOfItems = list && list.items ? list.items.length : 0;
  return (
    <FelaComponent style={benderWrapperRules}>
      {({ className, theme, }) => (
        <Section className={className}>
          <FelaComponent
            style={{
              fontWeight: 'bold',
              color: theme.color('primary'),
              marginBottom: '2rem',
              extend: [
                parseTypographyProp(theme.benderStyle.mainTitle.fontSize, theme.type),
                theme.mq({ until: 's', }, { display: 'none', }),
              ],
            }}
          >
            {({ className, }) => (
              <H className={className}>{list.title || theme.benderStyle.mainTitle.text}</H>
            )}
          </FelaComponent>
          <ListView
            gutter={4}
            innerBackgroundColor={[
              { until: 's', value: 'transparent', },
              { from: 's', value: 'white', },
            ]}
            // padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 1, 1, ], }, ]}
            marginTop={[ { until: 's', value: 2, }, { from: 's', value: 0, }, ]}
            // rowSpacing={[
            //   { until: 's', value: { amount: 2, }, },
            //   { from: 's', until: 'l', value: { amount: 4, }, },
            // ]}

            disableWrapper
            miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}
          >
            {numOfItems > 0 ? (
              <GridItem width={width} miscStyles={{ display: 'flex', }}>
                <BenderItem
                  data={list.items[0]}
                  lazyLoadImages={lazyLoadImages}
                  index={0}
                  biAction={biAction}
                />
              </GridItem>
            ) : null}
            {numOfItems > 1 ? (
              <GridItem width={width} miscStyles={{ display: 'flex', }}>
                <BenderItem
                  data={list.items[1]}
                  lazyLoadImages={lazyLoadImages}
                  index={1}
                  biAction={biAction}
                />
              </GridItem>
            ) : null}
            {numOfItems > 2 ? (
              <GridItem width={width} miscStyles={{ display: 'flex', }}>
                <BenderItem
                  data={list.items[2]}
                  lazyLoadImages={lazyLoadImages}
                  index={2}
                  biAction={biAction}
                />
              </GridItem>
            ) : null}
            {numOfItems > 3 ? (
              <GridItem
                width={width}
                miscStyles={{
                  display: [ { until: 'l', value: 'none', }, { from: 'l', value: 'flex', }, ],
                }}
              >
                <BenderItem
                  data={list.items[3]}
                  lazyLoadImages={lazyLoadImages}
                  hideImageOnMobile
                  index={3}
                  biAction={biAction}
                />
              </GridItem>
            ) : null}
            {numOfItems > 4 ? (
              <GridItem
                width={width}
                miscStyles={{
                  display: [ { until: 'xl', value: 'none', }, { from: 'xl', value: 'flex', }, ],
                }}
              >
                <BenderItem
                  data={list.items[4]}
                  lazyLoadImages={lazyLoadImages}
                  hideImageOnMobile
                  index={3}
                  biAction={biAction}
                />
              </GridItem>
            ) : null}
            {numOfItems > 5 ? (
              <GridItem
                width={width}
                miscStyles={{
                  display: [ { until: 'xl', value: 'none', }, { from: 'xl', value: 'flex', }, ],
                }}
              >
                <BenderItem
                  data={list.items[5]}
                  lazyLoadImages={lazyLoadImages}
                  hideImageOnMobile
                  index={3}
                  biAction={biAction}
                />
              </GridItem>
            ) : null}
          </ListView>
        </Section>
      )}
    </FelaComponent>
  );
}
