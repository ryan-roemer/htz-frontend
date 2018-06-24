import withData from './apollo/withData';
import pagePropTypes from './apollo/pagePropTypes';
import schema from './schema/schema';
import getWithDomain from './utils/parseUrl';

// Schema Fragments
import articleHeader from './fragments/articleHeader/articleHeader';
import author from './fragments/author/author';
import breadcrumbs from './fragments/breadcrumbs/breadcrumbs';
import content from './fragments/content/content';
import dfpBanner from './fragments/dfpBanner/dfpBanner';
import embed from './fragments/embed/embed';
import htmlElement from './fragments/htmlElement/htmlElement';
import image from './fragments/image/image';
import imageGallery from './fragments/imageGallery/imageGallery';
import interactive from './fragments/interactive/interactive';
import paragraph from './fragments/paragraph/paragraph';
import quote from './fragments/quote/quote';
import relatedArticles from './fragments/relatedArticles/relatedArticles';
import seoData from './fragments/seoData/seoData';
import seriesOrBlockArticles from './fragments/seriesOrBlockArticles/seriesOrBlockArticles';
import tag from './fragments/tag/tag';
import tags from './fragments/tags/tags';
import teaser from './fragments/teaser/teaser';
import video from './fragments/video/video';

export {
  withData,
  pagePropTypes,
  schema,
  // Schema Fragments
  articleHeader,
  author,
  breadcrumbs,
  content,
  dfpBanner,
  embed,
  htmlElement,
  image,
  imageGallery,
  interactive,
  paragraph,
  quote,
  relatedArticles,
  seoData,
  seriesOrBlockArticles,
  tag,
  tags,
  teaser,
  video,
  getWithDomain,
};
