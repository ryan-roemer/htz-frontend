import merge from 'lodash/merge';

import articleHeaderTypeDef from './typeDefs/articleHeader.graphql';
import articleSlotsTypeDef from './typeDefs/articleSlots.graphql';
import authorTypeDef from './typeDefs/author.graphql';
import changeableElementGroupTypeDef from './typeDefs/changeableElementGroup.graphql';
import clickTrackerWrapperTypeDef from './typeDefs/clickTrackerWrapper.graphql';
import contentTypeDef from './typeDefs/content.graphql';
import countdownTypeDef from './typeDefs/countdown.graphql';
import dfpTypeDef from './typeDefs/dfp.graphql';
import dfpConfigTypeDef from './typeDefs/dfpConfig.graphql';
import elementGroupTypeDef from './typeDefs/elementGroup.graphql';
import embedTypeDef from './typeDefs/embed.graphql';
import gridElementGroupTypeDef from './typeDefs/gridElementGroup.graphql';
import headerNewsGroupTypeDef from './typeDefs/headerNewsGroup.graphql';
import homePageMainBlockTypeDef from './typeDefs/homePageMainBlock.graphql';
import homePageSlotsTypeDef from './typeDefs/homePageSlots.graphql';
import htmlElementTypeDef from './typeDefs/htmlElement.graphql';
import imageTypeDef from './typeDefs/image.graphql';
import imageGalleryTypeDef from './typeDefs/imageGallery.graphql';
import interactiveTypeDef from './typeDefs/interactive.graphql';
import linkTypeDef from './typeDefs/link.graphql';
import marketingTeaserTypeDef from './typeDefs/marketingTeaser.graphql';
import middleRullerTypeDef from './typeDefs/middleRuller.graphql';
import mobileListWrapperTypeDef from './typeDefs/mobileListWrapper.graphql';
import mobileQuickRegistrationTypeDef from './typeDefs/mobileQuickRegistration.graphql';
import newsLetterTypeDef from './typeDefs/newsLetter.graphql';
import nullFallbackTypeDef from './typeDefs/nullFallback.graphql';
import paragraphTypeDef from './typeDefs/paragraph.graphql';
import quoteTypeDef from './typeDefs/quote.graphql';
import regularArticleDataTypeDef from './typeDefs/regularArticleData.graphql';
import relatedArticlesTypeDef from './typeDefs/relatedArticles.graphql';
import rssFeedTypeDef from './typeDefs/rssFeed.graphql';
import seoDataTypeDef from './typeDefs/seoData.graphql';
import seriesOrBlockArticlesTypeDef from './typeDefs/seriesOrBlockArticles.graphql';
import tableScoreTypeDef from './typeDefs/tableScore.graphql';
import tabsElementTypeDef from './typeDefs/tabsElement.graphql';
import tagsTypeDef from './typeDefs/tags.graphql';
import teaserTypeDef from './typeDefs/teaser.graphql';
import videoTypeDef from './typeDefs/video.graphql';

import articleDataResolver from './resolvers/articleData.resolvers';
import changeableElementGroupResolver from './resolvers/changeableElementGroup.resolvers';
import contentResolver from './resolvers/content.resolvers';
import homePageSlotsResolver from './resolvers/homePageSlots.resolvers';
import interactiveResolver from './resolvers/interactive.resolvers';

export default {
  typeDefs: [
    articleHeaderTypeDef,
    articleSlotsTypeDef,
    authorTypeDef,
    changeableElementGroupTypeDef,
    clickTrackerWrapperTypeDef,
    contentTypeDef,
    countdownTypeDef,
    dfpTypeDef,
    dfpConfigTypeDef,
    elementGroupTypeDef,
    embedTypeDef,
    gridElementGroupTypeDef,
    headerNewsGroupTypeDef,
    homePageMainBlockTypeDef,
    homePageSlotsTypeDef,
    htmlElementTypeDef,
    imageTypeDef,
    imageGalleryTypeDef,
    interactiveTypeDef,
    linkTypeDef,
    marketingTeaserTypeDef,
    middleRullerTypeDef,
    mobileListWrapperTypeDef,
    mobileQuickRegistrationTypeDef,
    newsLetterTypeDef,
    nullFallbackTypeDef,
    paragraphTypeDef,
    quoteTypeDef,
    regularArticleDataTypeDef,
    relatedArticlesTypeDef,
    rssFeedTypeDef,
    seoDataTypeDef,
    seriesOrBlockArticlesTypeDef,
    tableScoreTypeDef,
    tabsElementTypeDef,
    tagsTypeDef,
    teaserTypeDef,
    videoTypeDef,
  ].join(' '),

  resolvers: merge({},
    articleDataResolver,
    changeableElementGroupResolver,
    contentResolver,
    homePageSlotsResolver,
    interactiveResolver,
  ),
};
