import merge from 'lodash/merge';

import articleBody from './articleBody';
import author from './author';
import clickTrackerWrapper from './clickTrackerWrapper';
import content from './content';
import dfp from './dfp';
import elementGroup from './elementGroup';
import embed from './embed';
import htmlElement from './htmlElement';
import image from './image';
import imageGallery from './imageGallery';
import interactive from './interactive';
import link from './link';
import marketingTeaser from './marketingTeaser';
import media from './media';
import mobileQuickRegistration from './mobileQuickRegistration';
import newsLetter from './newsLetter';
import nullFallback from './nullFallback';
import paragraph from './paragraph';
import quote from './quote';
import relatedArticles from './relatedArticles';
import seriesOrBlockArticles from './seriesOrBlockArticles';
import tableScore from './tableScore';
import tags from './tags';
import teaser from './teaser';
import video from './video';

export default {
  typeDefs: [
    articleBody.typeDefs,
    author.typeDefs,
    clickTrackerWrapper.typeDefs,
    content.typeDefs,
    dfp.typeDefs,
    elementGroup.typeDefs,
    embed.typeDefs,
    htmlElement.typeDefs,
    image.typeDefs,
    imageGallery.typeDefs,
    interactive.typeDefs,
    link.typeDefs,
    marketingTeaser.typeDefs,
    media.typeDefs,
    mobileQuickRegistration.typeDefs,
    newsLetter.typeDefs,
    nullFallback.typeDefs,
    paragraph.typeDefs,
    quote.typeDefs,
    relatedArticles.typeDefs,
    seriesOrBlockArticles.typeDefs,
    tableScore.typeDefs,
    tags.typeDefs,
    teaser.typeDefs,
    video.typeDefs,
  ].join(' '),

  resolvers: merge({},
    articleBody.resolvers,
    content.resolvers,
    interactive.resolvers,
    media.resolvers,
  ),
};
