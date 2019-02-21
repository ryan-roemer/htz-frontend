import React from 'react';

const siteData = {
  newUsers: 10,
  totalPaying: 30812,
  todayReaders: {
    paying: 80,
    registered: 67,
  },
  cancellations: 127,
};

const tempData = {
  htz: siteData,
  tm: siteData,
  bundle: siteData,
  hdc: siteData,
};

function DataGetter({ children, }) {
  return children(tempData);
}

export default DataGetter;
