// @flow
import React from 'react';

import type { Node, } from 'react';
import type { ListDataType, } from '../../flowTypes/ListDataType';

import Debug from '../Debug/Debug';
import List from './List';

import Bender from './views/Bender/Bender';
import Farnsworth from './views/Farnsworth/Farnsworth';
import Leela from './views/Leela/Leela';
import Zoidberg from './views/Zoidberg/Zoidberg';

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
  return <Debug>{`${view} is not supported list view for the ArticlePage`}</Debug>;
}

export default ArticlePageList;
