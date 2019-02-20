// @flow
import React from 'react';
import gql from 'graphql-tag';
import { withRouter, } from 'next/router';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import Query from '../ApolloBoundary/Query';
import EventTracker from '../../utils/EventTracker';
import type { ListBiActionType, } from '../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../flowTypes/ListDataType';

const GET_SECTION: DocumentNode = gql`
  query GetSection {
    articleSection @client {
      url
    }
  }
`;

type ListComponentProps = {
  // generalized this to avoid complexity of dfp/teaser/clicktracker
  list: Object,
  listId: string,
  gaAction: () => void,
  biAction: ?ListBiActionType,
  lazyLoadImages: boolean,
};
export type ListContentRendererProps = {
  children: ListComponentProps => Node,
  view: string,
  viewProps: Object,
  listData: ListDataType,
};

ListContentRenderer.defaultProps = {
  viewProps: {},
};

function ListContentRenderer({
  children,
  view,
  viewProps,
  listData,
}: ListContentRendererProps): Node {
  const { title, items, lazyLoadImages, contentId, ...restList } = listData;
  return (
    <EventTracker>
      {({ biAction, gaAction, HtzReactGA, }) => {
        const clickAction = ({ index, articleId, }) => biAction
          && biAction({
            actionCode: 109,
            additionalInfo: {
              ArticleId: articleId,
              ListId: contentId,
              NoInList: index + 1,
              ViewName: view,
            },
          });
        return children({
          list: { items, title, ...restList, },
          listId: contentId,
          gaAction,
          biAction: clickAction,
          lazyLoadImages,
          ...viewProps,
        });
      }}
    </EventTracker>
  );
}

type ListDataGetterProps = ListContentRendererProps & {
  query: DocumentNode,
  variables: Object,
  router: Object,
};

type ListRendererProps = ListDataGetterProps & {
  section: string,
  isSsr: boolean,
};

function ListRenderer({
  listData,
  variables,
  query,
  children,
  section,
  isSsr,
  ...restOfProps
}: ListRendererProps): Node {
  return isSsr ? (
    <ListContentRenderer listData={listData} section={section} {...restOfProps}>
      {children}
    </ListContentRenderer>
  ) : (
    <div>
      <Query
        query={query}
        variables={{ ...variables, section, }}
        fetchPolicy="network-only"
      >
        {({ data, loading: listLoading, error: listError, }) => {
          if (listLoading) return null;
          if (listError) return null;
          return (
            <ListContentRenderer
              listData={data.list}
              section={section}
              {...restOfProps}
            >
              {children}
            </ListContentRenderer>
          );
        }}
      </Query>
    </div>
  );
}

ListDataGetter.section = null;

function ListDataGetter(props: ListDataGetterProps): Node {
  const { router, children, listData, viewProps, } = props;
  const isSsr = listData && listData.loadPriority === 'ssr';

  if (isSsr || ListDataGetter.section) {
    const section = isSsr ? router.asPath : ListDataGetter.section;
    return (
      <ListRenderer
        {...props}
        viewProps={viewProps || {}}
        listData={listData}
        section={section || '/'}
        isSsr={isSsr}
      >
        {children}
      </ListRenderer>
    );
  }

  return (
    <Query query={GET_SECTION}>
      {({ data: sectionData, loading, error, }) => {
        if (loading) return null;
        if (error) return null;
        const { url, } = sectionData.articleSection || {};
        if (url) {
          ListDataGetter.section = url || '/';
          return (
            <ListRenderer
              {...props}
              viewProps={viewProps || {}}
              listData={listData}
              section={ListDataGetter.section}
              isSsr={isSsr}
            >
              {children}
            </ListRenderer>
          );
        }
        return null;
      }}
    </Query>
  );
}

export default withRouter(ListDataGetter);
