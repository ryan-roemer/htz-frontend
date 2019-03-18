// @flow
import React from 'react';
import { Button, GeneralAdSlot, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import RowItem from '../../components/RowItem/RowItem';
import TableGraphConnector from '../../components/TableGraphConnector/TableGraphConnector';
import PageRow from '../../components/PageRow/PageRow';

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
    asPath: string,
  },
};

function exchange({ url: { query: { section, }, asPath, }, }: Props): Node {
  const crypto: boolean = section === 'crypto';
  return (
    <MainLayout
      section={section}
      title={crypto
        ? 'מטבעות דיגיטליים - TheMarker Finance'
        : 'מט"ח - מטבע חוץ - TheMarker Finance'
      }
      description={crypto
        ? 'כל המידע על  מטבעות דיגיטיליים: ביטקוין, לייטקוין, איתריום, ריפל, מונרו, Qtum  - נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance'
        : 'מטבעות חוץ :כל המידע על  מט"ח נתוני מסחר, נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance'
      }
      path={asPath}
    >
      <PageRow
        miscStyles={{ position: 'relative', }}
      >
        <RowItem
          title={crypto ? 'מטבעות עיקריים' : 'שערים עיקריים'}
        >
          <TableGraphConnector
            assetsId={[ '2', '142', '137', '-2000', '164', '143', '167', '145', '149', ]}
            isExchange
          />
        </RowItem>
        {
          crypto
            ? (
              <Button
                fontSize={-2}
                isFlat
                variant="salesOpaque"
                boxModel={{ hp: 2, vp: 0.5, }}
                miscStyles={{
                  borderRadius: '4px',
                  position: 'absolute',
                  top: '0',
                  end: '0',
                }}
                href="https://www.google.com"
              >
              קנו/מכרו ביטקוין
              </Button>
            )
            : null
        }
      </PageRow>
      <PageRow>
        <RowItem>
          <GeneralAdSlot
            id="Finance.TheMarker.com.Banner1"
            contentName="Finance.TheMarker.com.Banner1"
            audianceTarget="all"
          />
        </RowItem>
      </PageRow>
      <PageRow>
        <RowItem
          title={crypto ? 'מטבעות מתעוררים' : 'שערים יציגים'}
        >
          <TableGraphConnector
            assetsId={[ '9001', '2004', '2005', '9003', '9302', '9300', '9301', '9303', '9304', ]}
            exchange
          />
        </RowItem>
      </PageRow>
      <PageRow>
        <RowItem>
          <GeneralAdSlot
            id="Finance.TheMarker.com.Banner2"
            contentName="Finance.TheMarker.com.Banner2"
            audianceTarget="all"
          />
        </RowItem>
      </PageRow>
    </MainLayout>
  );
}

export default exchange;
