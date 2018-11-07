// @flow
import React, { Fragment, } from 'react';
import { Grid, GridItem, Query, } from '@haaretz/htz-components';
import { FelaTheme, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import GraphController from '../../components/GraphController/GraphController';
import QuoteSummary from '../../components/QuotePageComponents/QuoteSummary/QuoteSummary';
import QuoteInfoTable from '../../components/QuotePageComponents/QuoteInfoTable/QuoteInfoTable';
import VolumeGraph from '../../components/Graph/graphs/Volume/Volume';
import YieldGraph from '../../components/Graph/graphs/Yield/Yield';
import ShareHoldersTable from '../../components/QuotePageComponents/ShareHoldersTable/ShareHoldersTable';
import RelatedAssets from '../../components/QuotePageComponents/RelatedAssets/RelatedAssets';

const BondQuery: DocumentNode = gql`
  query BondData($assetId: String!){
    asset(assetId: $assetId){
      name
      value
      changePercentage
      numeralChange
      subType
      assetNumber
      lastTradeTime
      relatedAssets {
        type
        name
        id
      }
      volume
      dailyAvgVolume
      weeklyYield
      monthlyYield
      quarterlyYield
      yearlyYield
      shareHolders {
        shareHolderName
        equityHolderPercentage
        holdingMarketCap
      }
    }
  }
`;

type Props = {
  url: {
    pathname: string,
    query: {
      assetId: string,
      section: string,
    },
  },
};

function bonds({ url: { query: { assetId, section, }, }, }: Props): Node {
  return (
    <MainLayout section={section} >
      <Query
        query={BondQuery}
        variables={{ assetId, }}
      >
        {({ loading, error, data, }) => {
          if (error) return null;
          if (loading) return null;
          const {
            asset: {
              name,
              value,
              changePercentage,
              numeralChange,
              subType,
              assetNumber,
              lastTradeTime,
              relatedAssets,
              volume,
              dailyAvgVolume,
              weeklyYield,
              monthlyYield,
              quarterlyYield,
              yearlyYield,
              shareHolders,
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
                      valueData={[
                        { title: 'שער', value: value.toString(), },
                        { title: '% שינוי', value: changePercentage, },
                        { title: 'שינוי באג׳', value: numeralChange, },
                      ]}
                      date={{ title: 'נכון ל:', value: lastTradeTime, }}
                      assetInfo={[
                        { title: 'סוג נייר:', value: subType, },
                        { title: 'מספר נייר:', value: assetNumber, },
                      ]}
                    />
                  </PageRow>
                  <PageRow
                    miscStyles={{
                      marginBottom: '2rem',
                    }}
                  >
                    <RelatedAssets assets={relatedAssets} />
                  </PageRow>
                  <PageRow>
                    <GraphController
                      selectedStockId={assetId}
                      width={900}
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
                          <QuoteInfoTable
                            id={assetId}
                            tradingStatus
                            fixed
                            fields={[
                              { name: 'baseValue', display: 'שער בסיס', },
                              { name: 'openingValue', display: 'שער פתיחה', },
                              { name: 'value', display: 'שער אחרון', },
                              { name: 'dailyHigh', display: 'נמוך יומי', },
                              { name: 'dailyLow', display: 'גבוה יומי', },
                              { name: 'standardDeviation', display: 'סטיית תקן', },
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
                    <RowItem
                      title="חישובי אג״ח"
                      miscStyles={{ marginBottom: '4rem', }}
                    >
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
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'redemptionYield', display: 'תשואה לפדיון', },
                              { name: 'per', display: 'פארי', },
                              { name: 'avgDuration', display: 'מח"מ', },
                              { name: 'yieldFactor', display: 'מקדם תשואה', },
                              { name: 'daysToMaturity', display: 'זמן סופי לפדיון', },
                            ]}
                          />
                        </GridItem>
                        <GridItem
                          width={1 / 3}
                        >
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'classification', display: 'סיווג', },
                              { name: 'issueDate', display: 'תאריך הנפקה', type: 'date', },
                              { name: 'redemptionDate', display: 'תאריך פדיון', type: 'date', },
                              { name: 'periodicalInterest', display: 'ריבית תקופתית', },
                              { name: 'yearlyInterest', display: 'ריבית שנתית', },

                            ]}
                          />
                        </GridItem>
                        <GridItem
                          width={1 / 3}
                        >
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'retailTax', display: 'מס ליחידים', },
                              { name: 'linkageType', display: 'סוג הצמדה', },
                              { name: 'expirationBenchmarkDate', display: 'תאריך מדד בסיס', type: 'date', },
                              { name: 'periodicalInterestDate', display: 'תאריך ריבית תקופתית', type: 'date', },
                              { name: 'paymentDate', display: 'תאריך תשלום', type: 'date', },
                            ]}
                          />
                        </GridItem>
                      </Grid>
                    </RowItem>
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
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'peRatio', display: 'מכפיל רווח', },
                              { name: 'pbRatio', display: 'מכפיל הון', },
                              { name: 'roe', display: 'תשואה על ההון העצמי', },
                              { name: 'psRatio', display: 'מכפיל מכירות', },
                            ]}
                          />
                        </RowItem>
                      </GridItem>
                      <GridItem
                        width={2 / 3}
                      >
                        <RowItem
                          title="בעלי עניין קונצרני"
                        >
                          <ShareHoldersTable
                            shareHolders={shareHolders}
                          />
                        </RowItem>
                      </GridItem>
                    </Grid>
                  </PageRow>
                </Fragment>
              )}
            />
          );
        }}
      </Query>
    </MainLayout>
  );
}

export default bonds;
