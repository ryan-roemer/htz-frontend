// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForLeftElement, } from '@haaretz/app-utils';
import FarnsworthView from './FarnsworthView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const FarnsworthQuery = gql`
  query FarnsworthQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForLeftElement
        }
      }
    }
  }
  ${teaserForLeftElement}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Farnsworth(props: Props): React.Node {
  return (
    <ListDataGetter query={FarnsworthQuery} view="Farnsworth" {...props}>
      {dataProps => <FarnsworthView {...dataProps} />}
    </ListDataGetter>
  );
}