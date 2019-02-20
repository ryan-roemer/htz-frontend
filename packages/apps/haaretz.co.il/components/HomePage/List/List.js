// @flow
import * as React from 'react';
// import gql from 'graphql-tag';
// import { Mutation, ApolloConsumer, ReadingHistoryProvider, } from '@haaretz/htz-components';
import type { ListDataType, } from '@haaretz/htz-components';
import DynamicListView from './DynamicListView';

type ListProps = {
  listData: ListDataType,
  viewProps: Object,
};

List.defaultProps = { viewProps: {}, };

export default function List({
  viewProps,
  ...listData
}: ListProps): React.Node {
  return <DynamicListView listData={listData} viewProps={viewProps} />;
}
