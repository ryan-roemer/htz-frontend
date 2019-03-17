// @flow
import React from 'react';
import dynamic from 'next/dynamic';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';
import { Query, } from '@haaretz/htz-components';

import type { Node, ComponentType, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

const GraphQuery: DocumentNode = gql`
  query FinanceGraph($type: GraphType!, $time: PeriodType!, $assetId: String!) {
  graph(type: $type, period: $time, id: $assetId) {
    dataSource {
      ... on LineGraphData {
        time
        value
        yieldSpread
        change
        volume
      }
      ... on ScatterGraphData {
        x
        y
        id
      }
    }
  }
}
`;

type Props = {
  indexId?: ?(number | string),
  time: ?string,
  type: string,
  changeStats: Function,
  data: ?any,
};

type GraphProps = Props & {
  miscStyles?: ?Object,
}

const graphTypes: Object = new Map([
  [
    'line',
    dynamic(import('./graphs/Line/Line'), {
      loading: () => null,
      ssr: false,
    }),
  ],
  [
    'scatter',
    dynamic(import('./graphs/Scatter/Scatter'), {
      loading: () => null,
      ssr: false,
    }),
  ],
]);

const GraphWithData = ({
  indexId,
  time,
  type,
  miscStyles,
  data,
  ...props
}: GraphProps): Node => {
  const GraphElement: ComponentType<any> = graphTypes.get(type);
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            extend: [
              ...(miscStyles
                ? parseStyleProps(miscStyles, theme.mq, theme.type)
                : []),
            ],
          }}
        >
          <GraphElement
            time={time}
            theme={theme}
            data={data || null}
            {...props}
          />
        </FelaComponent>
      )}
    />
  );
};

GraphWithData.defaultProps = {
  time: null,
  miscStyles: null,
};

Graph.defaultProps = {
  data: null,
  indexId: null,
};

export default function Graph(props: Props) {
  if (!props.data) {
    const { indexId, type, time, } = props;
    return (
      <Query
        query={GraphQuery}
        variables={{
          assetId: indexId,
          type,
          time,
        }}
      >
        {({ loading, error, data, }) => {
          if (error) return null;
          if (data && data.graph && data.graph.dataSource.length > 0) {
            data.graph.dataSource.forEach(item => {
              // eslint-disable-next-line no-param-reassign
              item.time = new Date(item.time).getTime();
            });
            return (
              <GraphWithData
                {...props}
                data={!loading ? data.graph.dataSource : null}
              />
            );
          }
          return null;
        }}
      </Query>
    );
  }
  return <GraphWithData {...props} data={props.data} />;
}
