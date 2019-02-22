import React from 'react';
import { StyleProvider, } from '@haaretz/fela-utils';
import { Grid, GridItem, } from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme';

import DataGetter from '../components/DataGetter/DataGetter';
import Subscription from '../components/Subscription';

function Dashboard() {
  return (
    <StyleProvider renderer={styleRenderer} theme={theme}>
      <DataGetter>
        {({ htz, tm, bundle, hdc, }) => (
          <Grid gutter={0} miscStyles={{ height: '100vh', }}>
            <GridItem
              width={[
                { misc: 'landscape', value: 1 / 2, },
                { misc: 'portrait', value: 1, },
              ]}
            >
              <Grid gutter={0}>
                <GridItem width={1 / 2}>
                  <Subscription data={htz} subscription="htz" />
                </GridItem>

                <GridItem width={1 / 2}>
                  <Subscription data={bundle} subscription="bundle" />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem
              width={[
                { misc: 'landscape', value: 1 / 2, },
                { misc: 'portrait', value: 1, },
              ]}
            >
              <Grid gutter={0}>
                <GridItem width={1 / 2}>
                  <Subscription data={tm} subscription="tm" />
                </GridItem>

                <GridItem width={1 / 2}>
                  <Subscription data={hdc} subscription="hdc" />
                </GridItem>
              </Grid>
            </GridItem>

          </Grid>
        )}
      </DataGetter>
    </StyleProvider>
  );
}

export default Dashboard;
