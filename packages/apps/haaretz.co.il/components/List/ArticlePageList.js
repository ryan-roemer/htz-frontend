// @flow

import React from 'react';
import {
  List,
  Debug,
  Bender,
  Farnsworth,
  Leela,
  Zoidberg,
} from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { ListDataType, } from '@haaretz/htz-components';


const viewsList = new Map([
  [ 'Bender', Bender, ],
  [ 'Farnsworth', Farnsworth, ],
  [ 'Leela', Leela, ],
  [ 'Zoidberg', Zoidberg, ],
]);

function ArticlePageList({ view, ...props }: ListDataType): Node {
  if ([ ...viewsList.keys(), ].includes(view)) {
    return (
      <List View={viewsList.get(view)} {...props} />
    );
  }
  return <Debug>{`${view} is not supported list view for ArticlePage`}</Debug>;
}

export default ArticlePageList;
