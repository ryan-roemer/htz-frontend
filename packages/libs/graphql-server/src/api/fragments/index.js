import merge from 'lodash/merge';

import articleBodyTypeDef from './articleBody/articleBody.graphql';
import authorTypeDef from './author/author.graphql';
import clickTrackerWrapperTypeDef from './clickTrackerWrapper/clickTrackerWrapper.graphql';
import contentTypeDef from './content/content.graphql';
import dfpTypeDef from './dfp/dfp.graphql';
import elementGroupTypeDef from './elementGroup/elementGroup.graphql';
import embedTypeDef from './embed/embed.graphql';
import htmlElementTypeDef from './htmlElement/htmlElement.graphql';
import imageTypeDef from './image/image.graphql';
import imageGalleryTypeDef from './imageGallery/imageGallery.graphql';
import interactiveTypeDef from './interactive/interactive.graphql';
import linkTypeDef from './link/link.graphql';
import marketingTeaserTypeDef from './marketingTeaser/marketingTeaser.graphql';
import mediaTypeDef from './media/media.graphql';
import mobileQuickRegistrationTypeDef from './mobileQuickRegistration/mobileQuickRegistration.graphql';
import newsLetterTypeDef from './newsLetter/newsLetter.graphql';
import nullFallbackTypeDef from './nullFallback/nullFallback.graphql';
import paragraphTypeDef from './paragraph/paragraph.graphql';
import quoteTypeDef from './quote/quote.graphql';
import relatedArticlesTypeDef from './relatedArticles/relatedArticles.graphql';
import seriesOrBlockArticlesTypeDef from './seriesOrBlockArticles/seriesOrBlockArticles.graphql';
import tableScoreTypeDef from './tableScore/tableScore.graphql';
import tagsTypeDef from './tags/tags.graphql';
import teaserTypeDef from './teaser/teaser.graphql';
import videoTypeDef from './video/video.graphql';

import articleBodyResolver from './articleBody/articleBody.resolvers';
import contentResolver from './content/content.resolvers';
import interactiveResolver from './interactive/interactive.resolvers';
import mediaResolver from './media/media.resolvers';

export default {
  typeDefs: [
    articleBodyTypeDef,
    authorTypeDef,
    clickTrackerWrapperTypeDef,
    contentTypeDef,
    dfpTypeDef,
    elementGroupTypeDef,
    embedTypeDef,
    htmlElementTypeDef,
    imageTypeDef,
    imageGalleryTypeDef,
    interactiveTypeDef,
    linkTypeDef,
    marketingTeaserTypeDef,
    mediaTypeDef,
    mobileQuickRegistrationTypeDef,
    newsLetterTypeDef,
    nullFallbackTypeDef,
    paragraphTypeDef,
    quoteTypeDef,
    relatedArticlesTypeDef,
    seriesOrBlockArticlesTypeDef,
    tableScoreTypeDef,
    tagsTypeDef,
    teaserTypeDef,
    videoTypeDef,
  ].join(' '),

  resolvers: merge({},
    articleBodyResolver,
    contentResolver,
    interactiveResolver,
    mediaResolver,
  ),
};
