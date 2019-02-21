import React from 'react';
import PropTypes from 'prop-types';
import { LiveBlogArticle, GetComponentProvider, } from '@haaretz/htz-components';

import ArticleLayout from '../layouts/ArticleLayout';
import getElements from '../utils/getArticlePageElements';

const propTypes = {
  /**
   * An object containing route information from Next, such as the `pathname`
   * and `query` object.
   */
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function LiveBlogArticlePage({ url, }) {
  return (
    <GetComponentProvider value={getElements}>
      <ArticleLayout
        url={url}
        render={({ articleId, slots, path, }) => (
          <LiveBlogArticle articleId={articleId} slots={slots} path={path} />
        )}
      />
    </GetComponentProvider>
  );
}

LiveBlogArticlePage.propTypes = propTypes;

export default LiveBlogArticlePage;
