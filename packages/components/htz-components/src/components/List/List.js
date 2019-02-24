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
  listDuplicationIds: Array<?string>,
};

class List extends React.Component<ListProps, State> {
  static defaultProps = {
    viewProps: {},
  };

  state = {
    updatedListDuplication: false,
    listDuplicationIds: [],
  };

  componentDidMount() {
    // we want this to run just once at component mount,
    // This makes this whole component only usable for client side lists,
    // Once we make add ssr capabilities we need to make sure the listDuplicationIds
    // wont cause the list to re-query data and re render,
    if (this.props.listData && this.props.listData.loadPriority !== 'ssr') {
      const listDuplicationIds = this.props.getListDuplication();
      this.setState({ listDuplicationIds, });
    }
  }

  updateListDuplication = items => {
    if (!this.state.updatedListDuplication) {
      const itemsRepresentedContent = items.reduce((accumulator, currentValue) => {
        if (currentValue && currentValue.representedContent) {
          accumulator.push(currentValue.representedContent);
        }
        return accumulator;
      }, []);

      this.props.updateListDuplication(itemsRepresentedContent);
      this.setState({ updatedListDuplication: true, });
    }
  };

  render(): Node {
    const { listData: { View, }, listData, viewProps, } = this.props;
    const { listDuplicationIds, } = this.state;
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
