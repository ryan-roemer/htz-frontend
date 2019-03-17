// @flow
import React, { Fragment, } from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, GeneralAdSlot, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import RowItem from '../../components/RowItem/RowItem';
import AssetsFilter from '../../components/AssetsFilter/AssetsFilter';
import SortableTable from '../../components/SortableTable/SortableTable';
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

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

function etf({ url: { query: { section, }, asPath, }, }: Props): Node {
  const subFilters = {
    title: 'בחר פוזיציה:',
    value: 'etfCategoryPosition',
    fields: [
      { display: 'לונג', value: { queryString: 'long', }, },
      { display: 'שורט', value: { queryString: 'short', }, },
      { display: 'ממונף לונג', value: { queryString: 'longLeverage', }, },
      { display: 'ממונף שורט', value: { queryString: 'shortLeverage', }, },
      { display: 'מורכבת', value: { queryString: 'complex', }, },
    ],
  };

  return (
    <MainLayout
      section={section}
      title="תעודות סל - TheMarker Finance"
      description="כל המידע על  תעודות סל: נתוני מסחר, נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance"
      path={asPath}
    >
      <FelaTheme
        render={theme => (
          <Fragment>
            <PageRow>
              <RowItem
                title="תעודות סל"
              >
                <AssetsFilter
                  filters={{
                    title: 'בחר אפיק השקעות :',
                    value: 'etfCategory',
                    fields: [
                      { display: 'מניות בישראל', value: { queryString: 'localStocks', subFilters, }, },
                      { display: 'מניות בחו"ל', value: { queryString: 'foreignStocks', subFilters, }, },
                      { display: 'מדדים', value: { queryString: 'indices', subFilters, }, },
                      { display: 'שקלי', value: { queryString: 'shekel', subFilters, }, },
                      { display: 'מט"ח', value: { queryString: 'exchange', subFilters, }, },
                      { display: 'סחורות', value: { queryString: 'merch', subFilters, }, },
                    ],
                  }}
                >
                  {({ filters, }) => (
                    <SortableTable
                      miscStyles={{ marginTop: '7rem', tableLayout: 'auto', }}
                      parentId="generalEtf"
                      loadMore
                      {
                        ...filters.reduce((obj, item) => {
                          // eslint-disable-next-line no-param-reassign
                          obj[item.key] = item.value.toString();
                          return obj;
                        }, {})
                      }
                      type="mtf"
                      fragment="
                          name
                          value
                          yearlyYield
                          numeralChange
                          volume
                        "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם תעודה',
                          sortingOrder: 'asc',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'yearlyYield',
                          display: '% שינוי',
                          sortingOrder: 'desc',
                          style: ({ yearlyYield, }) => ({
                            color: yearlyYield < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ yearlyYield, }) => `
                                    ${yearlyYield > 0 ? '+' : '-'}
                                    ${numToString(Math.abs(yearlyYield))}%
                                   `,
                        },
                        {
                          name: 'numeralChange',
                          display: 'שינוי באגורות',
                          sortingOrder: 'desc',
                          value: ({ volume, }) => numToString(volume),
                        },
                        {
                          name: 'volume',
                          display: 'מחזור (א׳ ש״ח)',
                          sortingOrder: 'desc',
                          value: ({ volume, }) => numToString(volume),
                        },
                      ]}
                      initialSort="name"
                      count={11}
                    />
                  )}
                </AssetsFilter>
              </RowItem>
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
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="ביצועי התעודות הנמוכות בשוק"
                  >
                    <SortableTable
                      parentId="generalEtf"
                      type="mtf"
                      fragment="
                        name
                        yearlyYield
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם הקרן',
                          sortingOrder: 'asc',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'yearlyYield',
                          display: 'תשואה',
                          sortingOrder: 'asc',
                          style: ({ yearlyYield, }) => ({
                            color: yearlyYield < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ yearlyYield, }) => `
                            ${yearlyYield > 0 ? '+' : '-'}
                            ${numToString(Math.abs(yearlyYield))}%
                          `,
                        },
                      ]}
                      initialSort="yearlyYield"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="ביצועי התעודות הגבוהות בשוק"
                  >
                    <SortableTable
                      parentId="generalEtf"
                      type="mtf"
                      fragment="
                        name
                        yearlyYield
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם הקרן',
                          sortingOrder: 'asc',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'yearlyYield',
                          display: 'תשואה',
                          sortingOrder: 'desc',
                          style: ({ yearlyYield, }) => ({
                            color: yearlyYield < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ yearlyYield, }) => `
                            ${yearlyYield > 0 ? '+' : '-'}
                            ${numToString(Math.abs(yearlyYield))}%
                          `,
                        },
                      ]}
                      initialSort="yearlyYield"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="התעודות עם דמי הניהול הכי נמוכים"
                  >
                    <SortableTable
                      parentId="generalEtf"
                      type="mtf"
                      fragment="
                        name
                        managementFee
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם הקרן',
                          sortingOrder: 'asc',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'managementFee',
                          display: 'דמי ניהול',
                          sortingOrder: 'asc',
                          value: ({ managementFee, }) => numToString(managementFee),
                        },
                      ]}
                      initialSort="managementFee"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="התעודות עם דמי הניהול הכי גבוהים"
                  >
                    <SortableTable
                      parentId="generalEtf"
                      type="mtf"
                      fragment="
                        name
                        managementFee
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם הקרן',
                          sortingOrder: 'desc',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'managementFee',
                          display: 'דמי ניהול',
                          sortingOrder: 'desc',
                          value: ({ managementFee, }) => numToString(managementFee),
                        },
                      ]}
                      initialSort="managementFee"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
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
          </Fragment>
        )}
      />
    </MainLayout>
  );
}

export default etf;
