// @flow
import { imageInTeaser, } from '@haaretz/app-utils';
import * as React from 'react';
import gql from 'graphql-tag';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import DonbotView from './DonbotView';
import ListDataGetter from '../../ListDataGetter';

const DonbotQuery = gql`
  query DonbotQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      isLazyloadImages
      title
      commercialLinks {
        href
        contentName
        contentId
      }
      extraLinks {
        href
        contentName
        contentId
      }
      marketingTeaser {
        title
        subtitle
        href
        cta
      }
      items {
        ... on TeaserInList {
          contentId
          representedContent
          title
          titleMobile
          subtitle
          subtitleMobile
          exclusive
          exclusiveMobile
          path
          rank
          commentsCounts
          publishDate
          inputTemplate
          ...ImageInTeaser
          authors {
            contentName
          }
        }
      }
    }
  }
  ${imageInTeaser}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Donbot(props: Props): React.Node {
  return (
    <ListDataGetter query={DonbotQuery} view="Donbot" {...props}>
      {dataProps => <DonbotView {...dataProps} />}
    </ListDataGetter>
  );
}
