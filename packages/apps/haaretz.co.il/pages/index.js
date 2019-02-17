import React from 'react';
import { GetComponentProvider, } from '@haaretz/htz-components';

import HomePageLayout from '../layouts/HomePageLayout';
import SlotsLayout from '../components/HomePage/SlotsLayout';
import getElements from '../utils/getHomePageElements';

function HomePage() {
  return (
    <GetComponentProvider value={getElements}>
      <HomePageLayout
        render={({ slots, globalLazyload, }) => (
          <SlotsLayout slots={slots} globalLazyload={globalLazyload} />
        )}
      />
    </GetComponentProvider>
  );
}

export default HomePage;
