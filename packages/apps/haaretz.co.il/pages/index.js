import React from 'react';
import { GetComponentProvider, } from '@haaretz/htz-components';

import HomePageLayout from '../layouts/HomePageLayout';
import SlotsLayout from '../components/HomePage/SlotsLayout';
import getElements from '../utils/getHomePageElements';

function HomePage({ url, }) {
  const path = url && url.query.path || '/';
  return (
    <GetComponentProvider value={getElements}>
      <HomePageLayout
        path={path}
        render={({ slots, globalLazyload, }) => (
          <SlotsLayout slots={slots} globalLazyload={globalLazyload} />
        )}
      />
    </GetComponentProvider>
  );
}

export default HomePage;
