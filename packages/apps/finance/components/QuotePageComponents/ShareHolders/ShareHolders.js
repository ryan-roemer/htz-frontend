// @flow
import React from 'react';

import type { Node, } from 'react';

import StaticTable from '../../StaticTable/StaticTable';

type Props = {
  data: {
    SecurityName: string,
    PercentInTik: number,
    Monetary: number,
  }[],
};

const numToString = (num: number): string => num.toLocaleString('he', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ShareHolders = ({ data, }: Props): Node => (
  <StaticTable
    data={data}
    columns={[
      {
        name: 'SecurityName',
        title: 'שם',
        styles: {
          paddingStart: '2rem',
          fontWeight: '700',
          width: '50%',
        },
        render: value => value,
      },
      {
        name: 'PercentInTik',
        title: '% החזקה בהון',
        styles: {
          paddingStart: '2rem',
          direction: 'ltr',
          textAlign: 'start',
        },
        render: value => `${numToString(value)}%`,
      },
      {
        name: 'Monetary',
        title: 'שווי שוק',
        styles: {
          paddingStart: '2rem',
          direction: 'ltr',
          textAlign: 'start',
        },
        render: value => numToString(value),
      },
    ]}
  />
);

export default ShareHolders;
