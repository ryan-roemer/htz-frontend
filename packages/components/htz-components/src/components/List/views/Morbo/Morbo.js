// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, link, } from '@haaretz/app-utils';
import MorboView from './MorboView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const MorboQuery = gql`
  query MorboQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      # commercialLinks {
      #   ...Link
      # }
      # extraLinks {
      #   ...Link
      # }
      # marketingTeaser
      contentName
      title
      url
      items {
        commentsCounts
        contentId
        exclusive
        exclusiveMobile
        inputTemplate
        path
        title
        titleMobile
        representedContent
        image {
          ...Image
        }
      }
    }
  }
  ${image}
  ${link}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Morbo(props: Props): React.Node {
  return (
    <ListDataGetter query={MorboQuery} view="Morbo" {...props}>
      {dataProps => <MorboView {...dataProps} />}
    </ListDataGetter>
  );
}
