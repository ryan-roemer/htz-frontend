import React from 'react';
import PropTypes from 'prop-types';
import { ReviewArticle, GetComponentProvider, } from '@haaretz/htz-components';

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

function ReviewArticlePage({ url, }) {
  return (
    <GetComponentProvider value={getElements}>
      <ArticleLayout
        url={url}
        render={({ articleId, slots, path, }) => (
          <ReviewArticle articleId={articleId} slots={slots} path={path} />
        )}
      />
    </GetComponentProvider>
  );
}

ReviewArticlePage.propTypes = propTypes;

export default ReviewArticlePage;
