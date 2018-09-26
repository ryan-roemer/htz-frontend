// @flow
import React from 'react';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { StatelessFunctionalComponent, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import { Query, } from '../../ApolloBoundary/ApolloBoundary';
import { TdComponent, } from '../../StockTable/StockTable';

const TradeStatsQuery: DocumentNode = gql`
  query TradeStatsTable($assetsId: [String]){
    financeTable(assetsId: $assetsId){
      assets {
        tradingStatus
        baseValue
        openingValue
        value
        minValue
        maxValue
        arbGap
      }
    }
  }
`;

type Props = {
  id: string,
  miscStyles?: Object,
};

type TrComponentProps = {
  title: string,
  value: string | number,
  miscStyles?: Object,
};

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

const TrComponent: StatelessFunctionalComponent<TrComponentProps> =
  // eslint-disable-next-line react/prop-types
  ({ miscStyles, title, value, }) => (
    <FelaComponent
      style={theme => ({
        backgroundColor: theme.color('neutral', '-10'),
        extend: [
          borderBottom('2px', 1, 'solid', '#f3f3f3'),
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render="tr"
    >
      <TdComponent
        miscStyles={{
          paddingStart: '2rem',
          fontWeight: '700',
          width: '50%',
        }}
      >
        {title}
      </TdComponent>
      <TdComponent
        miscStyles={{
          paddingStart: '2rem',
          direction: 'ltr',
          textAlign: 'start',
        }}
      >
        {typeof value === 'number' ? numToString(value) : value}
      </TdComponent>
    </FelaComponent>
  );

const TradeStats: StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ id, miscStyles, }) => (
    <Query
      query={TradeStatsQuery}
      variables={{ assetsId: [ id, ], }}
    >
      {({ error, loading, data: { financeTable: { assets, }, }, }) => {
        if (error) return null;
        if (loading) return null;
        const {
          tradingStatus,
          baseValue,
          openingValue,
          value,
          minValue,
          maxValue,
          arbGap,
        } = assets[0];
        return (
          <FelaComponent
            style={(theme: Object) => ({
              ...theme.type(-2),
              tableLayout: 'fixed',
              whiteSpace: 'nowrap',
              width: '100%',
              extend: [
                ...(miscStyles
                  ? parseStyleProps(miscStyles, theme.mq, theme.type)
                  : []),
              ],
            })}
            render="table"
          >
            <FelaComponent
              style={theme => ({
                color: theme.color('neutral', '-3'),
                marginBottom: '1rem',
                marginTop: '1rem',
                textAlign: 'start',
              })}
              render="caption"
            >
              <FelaComponent
                render="span"
                style={{
                  ':after': {
                    content: '": "',
                  },
                }}
              >
                שלב מסחר
              </FelaComponent>
              {tradingStatus}
            </FelaComponent>

            <tbody>
              <TrComponent title="שער בסיס" value={baseValue} />
              <TrComponent title="שער פתיחה" value={openingValue} />
              <TrComponent title="שער אחרון" value={value} />
              <TrComponent title="נמוך יומי" value={minValue} />
              <TrComponent title="גבוה יומי" value={maxValue} />
              <TrComponent title="סטיית תקן" value={arbGap} />
            </tbody>
          </FelaComponent>
        );
      }}
    </Query>
  );
export default TradeStats;
