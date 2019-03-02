import merge from 'lodash/merge';

import author from './author';
import clickTrackerWrapper from './clickTrackerWrapper';
import content from './content';
import dfp from './dfp';
import embed from './embed';
import image from './image';
import imageGallery from './imageGallery';
import link from './link';
import marketingTeaser from './marketingTeaser';
import media from './media';
import teaser from './teaser';

export default {
  typeDefs: [
    author.typeDefs,
    clickTrackerWrapper.typeDefs,
    content.typeDefs,
    dfp.typeDefs,
    embed.typeDefs,
    image.typeDefs,
    imageGallery.typeDefs,
    link.typeDefs,
    marketingTeaser.typeDefs,
    media.typeDefs,
    teaser.typeDefs,
  ].join(' '),

  resolvers: merge({},
    content.resolvers,
    media.resolvers,
  ),
};
