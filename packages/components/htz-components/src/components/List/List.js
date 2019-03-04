// @flow
import * as React from 'react';

import type { ListDataType, } from '../../flowTypes/ListDataType';
// import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';
// import { getTeasersInPage, updateTeasersInPage, } from './ListDuplication';
// import ReadingHistoryProvider from '../ReadingHistory/ReadingHistoryProvider';
import useGetComponent from '../../hooks/GetComponentContext/useGetComponent';

type ListProps = ListDataType & {
  viewProps: Object,
};

// eslint-disable-next-line react/default-props-match-prop-types
List.defaultProps = { viewProps: {}, };
export default function List(props: ListProps) {
  const getListView = useGetComponent();

  const { viewProps, ...listData } = props;
  const { /* loadPriority, */ contentId, } = listData;
  // const isSsr = loadPriority === 'ssr';

  const ListInner = getListView(props.view);

  return (
    <ListInner
      listData={listData}
      viewProps={viewProps}
      variables={{
        listId: contentId,
        // history: getTeasersInPage(),
      }}
    />
  );
}

// type ClientSideListProps = {
//   listData: ListDataType,
//   /** A function that updates the list of article links in the page */
//   updateListDuplication: ?(Array<TeaserDataType>) => void,
//   getListDuplication: () => Array<string>,
//   viewProps: Object,
//   ListInner: React.ComponentType<any>,
// };
//
// function ClientSideList({
//   listData,
//   getListDuplication,
//   updateListDuplication,
//   viewProps,
//   ListInner,
// }: ClientSideListProps) {
//   const [
//     listDuplicationIds: Array<?string>,
//     setListDuplicationsIds,
//   ] = React.useState([]);
//   const [
//     listDuplicationIsUpdated: boolean,
//     setListDuplicationIsUpdated,
//   ] = React.useState(false);
//
//   React.useEffect(
//     () => {
//       setListDuplicationsIds(getListDuplication());
//     },
//     // we want this to run just once when the components is first
//     // rendered, which is why the dependencies array is empty
//     []
//   );
//
//   function updateDuplications(items) {
//     if (!listDuplicationIsUpdated) {
//       updateListDuplication(items);
//       setListDuplicationIsUpdated(true);
//     }
//   }
//
//   return (
//     <ReadingHistoryProvider>
//       {readingHistory => (
//         <ListInner
//           listData={listData}
//           viewProps={viewProps}
//           updateListDuplication={updateDuplications}
//           variables={{
//             listId: listData.contentId,
//             history: [ ...readingHistory, ...(listDuplicationIds || []), ],
//           }}
//         />
//       )}
//     </ReadingHistoryProvider>
//   );
// }
