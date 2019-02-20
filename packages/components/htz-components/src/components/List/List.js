// @flow
import React from 'react';

import type { ComponentType, Node, } from 'react';
import type { ListDataType, } from '../../flowTypes/ListDataType';

import ReadingHistoryProvider from '../ReadingHistory/ReadingHistoryProvider';
import ListDuplication from './ListDuplication';

// eslint-disable-next-line react/require-default-props
const ListWrapper = ({ viewProps, ...listData }: Object) => (
  <ListDuplication>
    {({ updateListDuplication, getListDuplication, }) => (
      <List
        getListDuplication={getListDuplication}
        viewProps={viewProps}
        listData={listData}
        updateListDuplication={updateListDuplication}
      />
    )}
  </ListDuplication>
);

type ListProps = {
  listData: ListDataType & { View: ComponentType<any>, },
  /** A function that updates the apollo store with the itemsRepresentedContent ids  */
  updateListDuplication: Array<?string> => void,
  getListDuplication: () => Array<?string>,
  viewProps: ?Object,
};

type State = {
  updatedListDuplication: boolean,
  listDuplicationIds: string[],
};

class List extends React.Component<ListProps, State> {
  static defaultProps = {
    viewProps: {},
  };

  updateListDuplication = items => {
    const itemsRepresentedContent = items.reduce((accumulator, currentValue) => {
      if (currentValue && currentValue.representedContent) {
        accumulator.push(currentValue.representedContent);
      }
      return accumulator;
    }, []);

    this.props.updateListDuplication(itemsRepresentedContent);
  };

  render(): Node {
    const { listData: { View, }, listData, viewProps, getListDuplication, } = this.props;
    const listDuplicationIds = getListDuplication();
    return (
      <ReadingHistoryProvider>
        {readingHistory => (
          <View
            listData={listData}
            viewProps={viewProps}
            updateListDuplication={this.updateListDuplication}
            variables={{
              listId: listData.contentId,
              history: [ ...readingHistory, ...listDuplicationIds || [], ],
            }}
          />
        )}
      </ReadingHistoryProvider>
    );
  }
}

export default ListWrapper;
