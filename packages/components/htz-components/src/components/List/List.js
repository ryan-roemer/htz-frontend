// @flow
import * as React from 'react';

import type { ListDataType, } from '../../flowTypes/ListDataType';

// const UPDATE_LIST_DUPLICATION = gql`
//   mutation UpdateDuplicationList($ids: [String]) {
//     updateListDuplication(ids: $ids) @client {
//       listDuplicationIds
//     }
//   }
// `;
// const GET_LIST_DUPLICATION = gql`
//   query GetListDuplication {
//     listDuplicationIds @client
//   }
// `;

type ListProps = {
  listData: ListDataType & { View: React.ComponentType<any>, },
  viewProps: ?Object,
};

export default function List({
  viewProps,
  ...listData
}: ListProps): React.Node {
  const { view, View, contentId, } = listData || {};
  return View ? (
    <View
      listData={listData}
      viewProps={viewProps}
      variables={{ listId: contentId, }}
    />
  ) : (
    <p>
      A list with a contentId of
      {' '}
      {contentId}
      {' '}
uses the
      {' '}
      {view}
      {' '}
view, which is not
      supported by this page
    </p>
  );
}
