// @flow
import React, { Fragment, } from 'react';
import { LayoutContainer, Grid, GridItem, } from '@haaretz/htz-components';
import { FelaTheme, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import MainLayout from '../layouts/MainLayout';
import PageRow from '../components/PageRow/PageRow';
import RowItem from '../components/RowItem/RowItem';
import GraphController from '../components/GraphController/GraphController';
import { Query, } from '../components/ApolloBoundary/ApolloBoundary';
import QuoteSummary from '../components/QuotePageComponents/QuoteSummary/QuoteSummary';
import QuoteTable from '../components/QuotePageComponents/QuoteTable/QuoteTable';
import VolumeGraph from '../components/Graph/graphs/Volume/Volume';
import YieldGraph from '../components/Graph/graphs/Yield/Yield';

const StockQuery: DocumentNode = gql`
  query StockData($id: String!){
    stockData(id: $id){
      name
      value
      changePercentage
      changeInCurr
      stockType
      stockNumber
      lastTradeTime
      relatedStocks
      volume
      dailyAvgVolume
      weeklyYield
      monthlyYield
      quarterlyYield
      yearlyYield
    }
  }
`;

type Props = {
  url: {
    pathname: string,
    query: {
      id: string,
    },
  },
};

function stock({ url: { query: { id, }, }, }: Props): Node {
  return (
    <MainLayout>
      <LayoutContainer
        bgc="transparent"
      >
        <Query
          query={StockQuery}
          variables={{ id, }}
        >
          {({ loading, error, data, }) => {
            if (error) return null;
            if (loading) return null;
            const {
              stockData: {
                name,
                value,
                changePercentage,
                changeInCurr,
                stockType,
                stockNumber,
                lastTradeTime,
                volume,
                dailyAvgVolume,
                weeklyYield,
                monthlyYield,
                quarterlyYield,
                yearlyYield,
              },
            } = data;
            return (
              <FelaTheme
                render={theme => (
                  <Fragment>
                    <PageRow lines={2}>
                      <RowItem
                        title={name}
                        miscStyles={{
                          ...theme.type(5),
                        }}
                      />
                    </PageRow>
                    <PageRow>
                      <QuoteSummary
                        value={value}
                        changePercentage={changePercentage}
                        changeInCurr={changeInCurr}
                        stockType={stockType}
                        stockNumber={stockNumber}
                        lastTradeTime={lastTradeTime}
                      />
                    </PageRow>
                    <PageRow>
                      <GraphController
                        selectedStockId={id}
                      />
                    </PageRow>
                    <PageRow>
                      <Grid
                        gutter={2}
                        miscStyles={{
                          paddingStart: '0rem',
                          paddingEnd: '0rem',
                        }}
                      >
                        <GridItem
                          width={1 / 3}
                        >
                          <RowItem
                            title="נתוני המסחר"
                          >
                            <QuoteTable
                              id={id}
                              tradingStatus
                              fixed
                              fields={[
                                { name: 'baseValue', display: 'שער בסיס', },
                                { name: 'openingValue', display: 'שער פתיחה', },
                                { name: 'value', display: 'שער אחרון', },
                                { name: 'minValue', display: 'נמוך יומי', },
                                { name: 'maxValue', display: 'גבוה יומי', },
                                { name: 'arbGap', display: 'סטיית תקן', },
                              ]}
                            />
                          </RowItem>
                        </GridItem>
                        <GridItem
                          width={2 / 3}
                        >
                          <FelaComponent
                            style={{
                              display: 'flow',
                              flowDirection: 'column',
                            }}
                          >
                            <RowItem
                              title="מחזורים"
                            >
                              <VolumeGraph
                                theme={theme}
                                data={[
                                  {
                                    name: 'מחזור (א׳ שח)',
                                    value: volume,
                                  },
                                  {
                                    name: 'מחזור יומי ממוצע (שנה)',
                                    value: dailyAvgVolume,
                                  },
                                ]}
                                miscStyles={{
                                  marginBottom: '2rem',
                                  paddingStart: '2rem',
                                  paddingEnd: '2rem',
                                }}
                              />
                            </RowItem>
                            <RowItem
                              title="תשואות"
                            >
                              <YieldGraph
                                theme={theme}
                                data={[
                                  {
                                    name: 'שבוע ',
                                    value: weeklyYield,
                                  },
                                  {
                                    name: 'חודש',
                                    value: monthlyYield,
                                  },
                                  {
                                    name: 'רבעון',
                                    value: quarterlyYield,
                                  },
                                  {
                                    name: 'שנה',
                                    value: yearlyYield,
                                  },
                                ]}
                                miscStyles={{
                                  marginBottom: '2rem',
                                  paddingStart: '2rem',
                                  paddingEnd: '2rem',
                                }}
                              />
                            </RowItem>
                          </FelaComponent>
                        </GridItem>
                      </Grid>
                    </PageRow>
                    <PageRow>
                      <Grid
                        gutter={2}
                        miscStyles={{
                          paddingStart: '0rem',
                          paddingEnd: '0rem',
                        }}
                      >
                        <GridItem
                          width={1 / 3}
                        >
                          <RowItem
                            title="יחסים פיננסיים"
                            miscStyles={{ marginBottom: '2rem', }}
                          >
                            <QuoteTable
                              id={id}
                              fields={[
                                // TODO: fill in the correct fields.
                                { name: 'baseValue', display: 'מכפיל רווח', },
                                { name: 'openingValue', display: 'מכפיל הון', },
                                { name: 'value', display: 'תשואה על ההון העצמי', },
                                { name: 'minValue', display: 'מכפיל מכירות', },
                                { name: 'maxValue', display: 'שיעור רווח נקי', },
                                { name: 'arbGap', display: 'הון למאזן', },
                              ]}
                            />
                          </RowItem>
                        </GridItem>
                        <GridItem
                          width={2 / 3}
                        >
                          <RowItem
                            title="בחסות בנק לאומי"
                            miscStyles={{
                              ...theme.type(0),
                            }}
                          />
                        </GridItem>
                      </Grid>
                    </PageRow>
                  </Fragment>
                )}
              />
            );
          }}
        </Query>
      </LayoutContainer>
    </MainLayout>
  );
}

export default stock;
