// @flow
import React, { Fragment, } from 'react';
import { Grid, GridItem, GeneralAdSlot, Query, } from '@haaretz/htz-components';
import type { Node, } from 'react';
import { FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';

import type { DocumentNode, } from 'graphql/language/ast';
import type { StyleProps, } from '@haaretz/htz-css-tools';

import MainLayout from '../layouts/MainLayout';
import TableGraphConnector from '../components/TableGraphConnector/TableGraphConnector';
import PageRow from '../components/PageRow/PageRow';
import RowItem from '../components/RowItem/RowItem';
import SortableTable from '../components/SortableTable/SortableTable';
import TabbedGraph from '../components/TabbedGraph/TabbedGraph';
import StaticTable from '../components/StaticTable/StaticTable';
import MarketSummary from '../components/MarketSummary/MarketSummary';

const ExchangeQuery: DocumentNode = gql`
  query ExchangeTable($ids: [String!]!) {
    assets(ids: $ids) {
      id
      type
      name
      value
      changePercentage
    }
  }
`;

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


function index({ url: { asPath, }, }: Props): Node {
  return (
    <MainLayout
      title="אתר שוק ההון, מניות ובורסה המוביל בישראל - TheMarker Finance"
      description="אתר פיננס דה מרקר מספק מידע מורחב ועדכני משוקי ההון בישראל, וול סטריט, אירופה ואסיה אודות מניות, אגרות חוב, קרנות נאמנות, תעודות סל, נגזרים, דולר, שוק המטבעות ובעלי עניין"
      path={asPath}
    >
      <FelaTheme
        render={theme => (
          <Fragment>
            <PageRow>
              <MarketSummary
                miscStyles={{ flexGrow: '1', }}
                assetsId={[ '142', '9001', '30.10.!DJI', ]}
              />
            </PageRow>
            <PageRow miscStyles={{ marginBottom: '0', }}>
              <RowItem
                title="מבט לשווקים"
              >
                <TableGraphConnector
                  assetsId={[ '142', '137', '164', '145', '9001', '9004', '29.10.@CCO', '30.10.!DJI', '33.10.!SPX', ]}
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
                    title="מניות תל אביב"
                  >
                    <SortableTable
                      queryPrefix="TA"
                      section="index"
                      subSection="2"
                      type="indices"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      linkText="לבורסת תל אביב"
                      addLink
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
                      initialSort="value"
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="בחסות בנק לאומי"
                    miscStyles={{
                      ...theme.type(0),
                    }}
                  >
                    <Grid>
                      <GridItem width={1 / 2}>
                        <GeneralAdSlot
                          id="Finance.TheMarker.com.FujiRight"
                          contentName="Finance.TheMarker.com.FujiRight"
                          audianceTarget="all"
                        />
                      </GridItem>
                      <GridItem width={1 / 2}>
                        <GeneralAdSlot
                          id="Finance.TheMarker.com.FujiLeft"
                          contentName="Finance.TheMarker.com.FujiLeft"
                          audianceTarget="all"
                        />
                      </GridItem>
                    </Grid>
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="מניות בנסדא״ק"
                  >
                    <SortableTable
                      queryPrefix="Nasdaq"
                      section="index"
                      subSection="29.10.@CCO"
                      type="indices"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      linkText="לבורסת וול סטריט"
                      addLink
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
                      initialSort="value"
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="מניות ארביטראז׳"
                  >
                    <SortableTable
                      queryPrefix="Arbitrage"
                      section="index"
                      subSection="-2000"
                      type="stocks"
                      fragment="
                        name
                        symbol
                        arbGap
                      "
                      linkText="לרשימה המלאה"
                      addLink
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
                          name: 'symbol',
                          display: 'סימול בוול סטריט',
                          sortingOrder: 'asc',
                          value: ({ symbol, }) => symbol,
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
                      initialSort="arbGap"
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <Query
                    query={ExchangeQuery}
                    variables={{
                      ids: [ '9001', '9004', '9305', '9772', '9304', ],
                    }}
                  >
                    {({ loading, error, data, }) => {
                      if (loading || error) return null;
                      const { assets, } = data;
                      return (
                        <RowItem
                          title="מט״ח"
                        >
                          <StaticTable
                            queryPrefix="Exchange"
                            type="currency"
                            linkText="למדור מטבעות דיגיטליים"
                            addLink
                            linkContent
                            data={assets}
                            columns={[
                              {
                                title: 'שם מטבע',
                                name: 'name',
                                styles: {
                                  fontWeight: '700',
                                  maxWidth: '17rem',
                                  overflow: 'hidden',
                                  paddingStart: '2rem',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                },
                                render: value => value,
                              },
                              {
                                title: 'שער אחרון',
                                name: 'value',
                                styles: {
                                  paddingStart: '2rem',
                                },
                                render: value => numToString(value),
                              },
                              {
                                title: '% שינוי',
                                percentage: true,
                                name: 'changePercentage',
                                styles: function styles(value: number): StyleProps {
                                  return ({
                                    color: value < 0
                                      ? theme.color('negative')
                                      : theme.color('positive'),
                                    direction: 'ltr',
                                    fontWeight: '700',
                                    paddingStart: '2rem',
                                    position: 'relative',
                                    textAlign: 'start',
                                  });
                                },
                                render: value => `
                                  ${value > 0 ? '+' : '-'}
                                  ${numToString(Math.abs(value))}%
                                `,
                              },
                            ]}
                          />
                        </RowItem>
                      );
                    }}
                  </Query>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="קשרי משקיעים"
                    miscStyles={{
                      ...theme.type(0),
                    }}
                  >
                    <Grid>
                      <GridItem width={1 / 2}>
                        <GeneralAdSlot
                          id="Finance.TheMarker.com.KodakRight"
                          contentName="Finance.TheMarker.com.KodakRight"
                          audianceTarget="all"
                        />
                      </GridItem>
                      <GridItem width={1 / 2}>
                        <GeneralAdSlot
                          id="Finance.TheMarker.com.KodakLeft"
                          contentName="Finance.TheMarker.com.KodakLeft"
                          audianceTarget="all"
                        />
                      </GridItem>
                    </Grid>
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <RowItem
                title="הכי חם בשוק"
              >
                <TabbedGraph
                  subSection="2"
                  section="index"
                  tabs={[
                    { display: 'עולות', control: 'graph-up', sortBy: 'changePercentage', sortOrder: 'desc', },
                    { display: 'יורדות', control: 'graph-down', sortBy: 'changePercentage', sortOrder: 'asc', },
                    { display: 'פעילות', control: 'graph-active', sortBy: 'volume', sortOrder: 'desc', },
                    { display: 'הנצפים באתר', control: 'graph-mostViewed', sortBy: 'name', sortOrder: 'asc', }, // TEMP
                    { display: 'עולות שנתי', control: 'graph-upYearly', sortBy: 'yearlyYield', sortOrder: 'desc', },
                    { display: 'יורדות שנתי', control: 'graph-downYearly', sortBy: 'yearlyYield', sortOrder: 'asc', },
                  ]}
                />
              </RowItem>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="תעודות סל"
                  >
                    <SortableTable
                      queryPrefix="Etf"
                      section="type"
                      subSection="etf"
                      fragment="
                        name
                        symbol
                        arbGap
                      "
                      linkText="לתעודות סל"
                      addLink
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
                          name: 'symbol',
                          display: 'סימול בוול סטריט',
                          sortingOrder: 'asc',
                          value: ({ symbol, }) => symbol,
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
                      initialSort="arbGap"
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="קרנות נאמנות"
                  >
                    <SortableTable
                      queryPrefix="Mtf"
                      subSection="mtf"
                      section="type"
                      fragment="
                        name
                        value
                        changePercentage
                      "
                      linkText="לקרנות נאמנות"
                      addLink
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
                      initialSort="value"
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

export default index;
