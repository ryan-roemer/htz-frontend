// @flow
import React from 'react';

import type { Node, } from 'react';

type Props = {
  children: ({
    updateListDuplication: Array<?string> => void,
    getListDuplication: () => Array<?string>,
  }) => Node,
}

export default class ListDuplication extends React.PureComponent<Props> {
  static listDuplicationIds = [];

  updateListDuplication: Array<?string> => void = ids => {
    ListDuplication.listDuplicationIds = [
      ...new Set([ ...ListDuplication.listDuplicationIds, ...ids, ]),
    ];
  };

  getListDuplication: () => Array<?string> = () => ListDuplication.listDuplicationIds;

  render(): Node {
    const { props: { children, }, updateListDuplication, getListDuplication, } = this;
    return children({ updateListDuplication, getListDuplication, });
  }
}
