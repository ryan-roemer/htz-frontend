// @flow
import React, { Fragment, } from 'react';
import { Grid, GridItem, GeneralAdSlot, } from '@haaretz/htz-components';
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import TableGraphConnector from '../../components/TableGraphConnector/TableGraphConnector';
import SortableTable from '../../components/SortableTable/SortableTable';

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
    asPath: string,
  },
};

const numToString: (number | string) => string = num => (typeof num === 'number'
  ? num.toLocaleString('he', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  : num);


function stocks({ url: { query: { section, }, asPath, }, }: Props): Node {
  return (
    <MainLayout
      section={section}
      title="מניות - TheMarker Finance"
      description="כל המידע על  מניות: נתוני מסחר, נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance"
      path={asPath}
    >
      <FelaTheme
        render={theme => (
          <Fragment>
            <PageRow miscStyles={{ marginBottom: '0', }}>
              <RowItem
                title="מבט לשווקים"
              >
                <TableGraphConnector
                  assetsId={[ '2', '142', '137', '-2000', '164', '143', '167', '145', '149', ]}
                />
              </RowItem>
            </PageRow>
            <PageRow
              miscStyles={{
                paddingTop: '4rem',
                paddingBottom: '4rem',
                backgroundColor: theme.color('neutral', '-10'),
              }}
            >
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
                    title="המניות העולות - תל אביב"
                  >
                    <SortableTable
                      queryPrefix="TA_Up"
                      section="index"
                      subSection="2"
                      type="indices"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'desc',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                            ${changePercentage > 0 ? '+' : '-'}
                            ${numToString(Math.abs(changePercentage))}%
                          `,
                        },
                      ]}
                      initialSort="changePercentage"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות העולות - נאסד״ק"
                  >
                    <SortableTable
                      queryPrefix="Nasdaq_Up"
                      section="index"
                      subSection="29.10.@CCO"
                      type="indices"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'desc',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                            ${changePercentage > 0 ? '+' : '-'}
                            ${numToString(Math.abs(changePercentage))}%
                          `,
                        },
                      ]}
                      initialSort="changePercentage"
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
                    title="המניות היורדות - תל אביב"
                  >
                    <SortableTable
                      queryPrefix="TA_Down"
                      section="index"
                      subSection="2"
                      type="indices"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'asc',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                            ${changePercentage > 0 ? '+' : '-'}
                            ${numToString(Math.abs(changePercentage))}%
                          `,
                        },
                      ]}
                      initialSort="changePercentage"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות היורדות - נאסד״ק"
                  >
                    <SortableTable
                      queryPrefix="Nasdaq_Down"
                      section="index"
                      subSection="29.10.@CCO"
                      type="indices"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'asc',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                            ${changePercentage > 0 ? '+' : '-'}
                            ${numToString(Math.abs(changePercentage))}%
                          `,
                        },
                      ]}
                      initialSort="changePercentage"
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
                    title="המניות הפעילות - תל אביב"
                  >
                    <SortableTable
                      queryPrefix="TA_Active"
                      section="index"
                      subSection="2"
                      type="indices"
                      fragment="
                        name
                        value
                        volume
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'volume',
                          display: 'מחזור',
                          sortingOrder: 'desc',
                          style: (volume: number) => ({
                            color: volume < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ volume, }) => numToString(volume),
                        },
                      ]}
                      initialSort="volume"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות הפעילות - נאסד״ק"
                  >
                    <SortableTable
                      queryPrefix="Nasdaq_Active"
                      section="index"
                      subSection="29.10.@CCO"
                      type="indices"
                      fragment="
                        name
                        value
                        volume
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'volume',
                          display: 'מחזור',
                          sortingOrder: 'desc',
                          style: (volume: number) => ({
                            color: volume < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ volume, }) => numToString(volume),
                        },
                      ]}
                      initialSort="volume"
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
                    title="המניות הנצפות באתר - תל אביב"
                  >
                    <SortableTable
                      parentId="142"
                      type="stocks"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'asc',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                            ${changePercentage > 0 ? '+' : '-'}
                            ${numToString(Math.abs(changePercentage))}%
                          `,
                        },
                      ]}
                      initialSort="value"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות הנצפות באתר - נאסד״ק"
                  >
                    <SortableTable
                      parentId="136"
                      type="stocks"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'asc',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                            ${changePercentage > 0 ? '+' : '-'}
                            ${numToString(Math.abs(changePercentage))}%
                          `,
                        },
                      ]}
                      initialSort="value"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid gutter={2}>
                <GridItem width={4 / 5}>
                  <RowItem
                    title="פערי ארביטראז׳"
                  >
                    <SortableTable
                      queryPrefix="Arbitrage"
                      section="index"
                      subSection="-2000"
                      type="stocks"
                      loadMore
                      fragment="
                        name
                        value
                        symbol
                        USDValue
                        arbGap
                      "
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
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
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'desc',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'symbol',
                          display: 'סימול בוול סטריט',
                          sortingOrder: 'asc',
                          value: ({ symbol, }) => symbol,
                        },
                        {
                          name: 'USDValue',
                          display: 'שער בדולרים',
                          sortingOrder: 'desc',
                          value: ({ USDValue, }) => numToString(USDValue),
                        },
                        {
                          name: 'arbGap',
                          display: '% פער',
                          sortingOrder: 'desc',
                          style: ({ arbGap, }) => ({
                            color: arbGap < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ arbGap, }) => `
                            ${arbGap > 0 ? '+' : '-'}
                            ${numToString(Math.abs(arbGap))}%
                          `,
                        },
                      ]}
                      initialSort="name"
                      count={13}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 5} miscStyles={{ alignSelf: 'center', }}>
                  <GeneralAdSlot
                    id="Finance.TheMarker.com.Banner3"
                    contentName="Finance.TheMarker.com.Banner3"
                    audianceTarget="all"
                  />
                </GridItem>
              </Grid>
            </PageRow>
          </Fragment>
        )}
      />
    </MainLayout>
  );
}

export default stocks;
