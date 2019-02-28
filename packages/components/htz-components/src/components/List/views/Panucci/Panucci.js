// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForPanucci, link, dfpBanner, } from '@haaretz/app-utils';
import PanucciView from './PanucciView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const PanucciQuery = gql`
  query PanucciQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      isLazyloadImages
      url
      commercialLinks {
        ...Link
      }
      extraLinks {
        ...Link
      }
      items {
        ...TeaserForPanucci
      }
      dfp {
        ...DfpBanner
      }
    }
  }
  ${teaserForPanucci}
  ${link}
  ${dfpBanner}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Panucci(props: Props): React.Node {
  return (
    <ListDataGetter query={PanucciQuery} view="Panucci" {...props}>
      {dataProps => <PanucciView {...dataProps} />}
    </ListDataGetter>
  );
}
