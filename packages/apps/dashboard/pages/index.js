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
          <Grid gutter={0}>
            <GridItem width={1 / 4}>
              <Subscription data={htz} display="htz" />
            </GridItem>

            <GridItem width={1 / 4}>
              <Subscription data={bundle} display="bundle" />
            </GridItem>

            <GridItem width={1 / 4}>
              <Subscription data={tm} display="tm" />
            </GridItem>

            <GridItem width={1 / 4}>
              <Subscription data={hdc} display="hdc" />
            </GridItem>
          </Grid>
        )}
      </DataGetter>
    </StyleProvider>
  );
}

export default Dashboard;
