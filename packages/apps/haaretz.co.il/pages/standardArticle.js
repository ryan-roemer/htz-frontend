import React from 'react';
import PropTypes from 'prop-types';
import { StandardArticle, GetComponentProvider, } from '@haaretz/htz-components';

import ArticleLayout from '../layouts/ArticleLayout';
import LegacyPrefixRedirect from '../components/Redirect/LegacyPrefixRedirect';
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

function StandardArticlePage({ url, }) {
  return (
    <GetComponentProvider value={getElements}>
      <ArticleLayout
        url={url}
        render={({ articleId, slots, pageType, path, }) => (pageType !== 'regularArticle' ? (
          <LegacyPrefixRedirect pageType={pageType} />
        ) : (
          <StandardArticle articleId={articleId} slots={slots} path={path} />
        ))
        }
      />
    </GetComponentProvider>
  );
}

StandardArticlePage.propTypes = propTypes;

export default StandardArticlePage;
