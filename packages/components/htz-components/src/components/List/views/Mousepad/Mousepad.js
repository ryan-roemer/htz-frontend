// @flow
import * as React from 'react';
import gql from 'graphql-tag';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

import MousepadView from './MousepadView.js';
import ListDataGetter from '../../ListDataGetter';


const MousepadQuery = gql`
  query MousepadQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          commentsCounts
          contentId
          exclusive
          exclusiveMobile
          inputTemplate
          lastUpdate
          path
          publishDate
          representedContent
          title
          titleMobile
        }
      }
    }
  }
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Mousepad(props: Props): Node {
  return (
    <ListDataGetter query={MousepadQuery} view="Mousepad" {...props}>
      {dataProps => <MousepadView {...dataProps} />}
    </ListDataGetter>
  );
}
