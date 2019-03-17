// @flow
import React, { Fragment, } from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, GeneralAdSlot, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import SortableTable from '../../components/SortableTable/SortableTable';
import AssetsFilter from '../../components/AssetsFilter/AssetsFilter';

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

function mtf({ url: { query: { section, }, asPath, }, }: Props): Node {
  return (
    <MainLayout
      section={section}
      title="קרנות נאמנות - TheMarker Finance"
      description="כל המידע על  קרנות נאמנות: נתוני מסחר, נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance"
      path={asPath}
    >
      <FelaTheme
        render={theme => (
          <Fragment>
            <PageRow>
              <RowItem
                title="קרנות נאמנות"
              >
                <AssetsFilter
                  filters={{
                    title: 'בחר אפיק / מנהל',
                    value: 'mtfCategory',
                    fields: [
                      {
                        display: 'ענף',
                        value: {
                          queryString: 'branchExposure',
                          subFilters: {
                            title: 'בחר חשיפה',
                            value: 'mtfCategoryExposure',
                            fields: [
                              { display: 'עד 10% מניות', value: { queryString: 10, }, },
                              { display: 'עד 20% מניות', value: { queryString: 20, }, },
                              { display: 'עד 30% מניות', value: { queryString: 30, }, },
                              { display: 'הכל', value: { queryString: Infinity, }, },
                            ],
                          },
                        },
                      },
                      { display: 'חשיפה למניות', value: { queryString: 'stocksExposure', }, },
                      { display: 'חשיפה למטבע', value: { queryString: 'currencyExposure', }, },
                      { display: 'מנהל', value: { queryString: 'managerExposure', }, },
                      { display: 'נכסים', value: { queryString: 'holdingExposure', }, },
                    ],
                  }}
                >
                  {({ filters, }) => (
                    <SortableTable
                      miscStyles={{ marginTop: '7rem', tableLayout: 'auto', }}
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
                        dailyAvgMtfYield
                        yearlyAvgMtfYield
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם אופציה',
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
                          name: 'dailyAvgMtfYield',
                          display: '% שינוי יומי',
                          sortingOrder: 'desc',
                          style: ({ dailyAvgMtfYield, }) => ({
                            color: dailyAvgMtfYield < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ dailyAvgMtfYield, }) => `
                                  ${dailyAvgMtfYield > 0 ? '+' : '-'}
                                  ${numToString(Math.abs(dailyAvgMtfYield))}%
                                 `,
                        },
                        {
                          name: 'yearlyAvgMtfYield',
                          display: '% שינוי שנתי',
                          sortingOrder: 'desc',
                          style: ({ yearlyAvgMtfYield, }) => ({
                            color: yearlyAvgMtfYield < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ yearlyAvgMtfYield, }) => `
                                  ${yearlyAvgMtfYield > 0 ? '+' : '-'}
                                  ${numToString(Math.abs(yearlyAvgMtfYield))}%
                                 `,
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
                    title="ביצועי הקרנות הנמוכות בשוק"
                  >
                    <SortableTable
                      parentId="generalMtf"
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
                    title="ביצועי הקרנות הגבוהות בשוק"
                  >
                    <SortableTable
                      parentId="generalMtf"
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
                    title="הקרנות עם דמי הניהול הכי נמוכים"
                  >
                    <SortableTable
                      parentId="generalMtf"
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
                    title="הקרנות עם דמי הניהול הכי גבוהים"
                  >
                    <SortableTable
                      parentId="generalMtf"
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
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="הקרנות שגייסו הכי הרבה כסף השנה"
                  >
                    <SortableTable
                      parentId="generalMtf"
                      type="mtf"
                      fragment="
                        name
                        yearlyinflows
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
                          name: 'yearlyinflows',
                          display: 'סך הגיוסים',
                          sortingOrder: 'asc',
                          value: ({ yearlyinflows, }) => numToString(yearlyinflows),
                        },
                      ]}
                      initialSort="yearlyinflows"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="הקרנות שפדו הכי הרבה כסף השנה"
                  >
                    <SortableTable
                      parentId="generalMtf"
                      type="mtf"
                      fragment="
                        name
                        yearlyoutflows
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
                          name: 'yearlyoutflows',
                          display: 'סך פדיונות',
                          sortingOrder: 'asc',
                          value: ({ yearlyoutflows, }) => numToString(yearlyoutflows),
                        },
                      ]}
                      initialSort="yearlyoutflows"
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
                    title="הקרנות עם היקף הנכסים הגדול ביותר"
                  >
                    <SortableTable
                      parentId="generalMtf"
                      type="mtf"
                      fragment="
                        name
                        assetsUnderManagement
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
                          name: 'assetsUnderManagement',
                          display: 'סך נכסים',
                          sortingOrder: 'desc',
                          value: ({ assetsUnderManagement, }) => numToString(assetsUnderManagement),
                        },
                      ]}
                      initialSort="assetsUnderManagement"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="הקרנות עם היקף הנכסים הקטן ביותר"
                  >
                    <SortableTable
                      parentId="generalMtf"
                      type="mtf"
                      fragment="
                        name
                        assetsUnderManagement
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
                          name: 'assetsUnderManagement',
                          display: 'סך נכסים',
                          sortingOrder: 'asc',
                          value: ({ assetsUnderManagement, }) => numToString(assetsUnderManagement),
                        },
                      ]}
                      initialSort="assetsUnderManagement"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
          </Fragment>
        )}
      />
    </MainLayout>
  );
}

export default mtf;
