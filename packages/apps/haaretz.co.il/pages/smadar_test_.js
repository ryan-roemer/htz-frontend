import React from 'react';
import { GetComponentProvider, } from '@haaretz/htz-components';

import TestHomePageLayout from '../layouts/TestHomePageLayout';
import SlotsLayout from '../components/HomePage/SlotsLayout';
import getElements from '../utils/getHomePageElements';

function TestPage() {
  return (
    <GetComponentProvider value={getElements}>
      <TestHomePageLayout
        render={({ slots, globalLazyload, }) => (
          <SlotsLayout slots={slots} globalLazyload={globalLazyload} />
        )}
      />
    </GetComponentProvider>
  );
}

export default TestPage;
