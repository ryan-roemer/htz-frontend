import React from 'react';
import { dfpTargeting, } from '@haaretz/dfp';

import {
  ArticleBody,
  GeneralAdSlot,
  Breadcrumbs,
  ChangeableElementGroup,
  WrappedComments,
  ClickTrackerWrapper,
  Debug,
  ElementGroup,
  Embed,
  Error,
  Footer,
  HtmlElement,
  Image,
  ImageGallery,
  Interactive,
  LinksBlock,
  Masthead,
  MobileListWrapper,
  MobileQuickRegistration,
  Newsletter,
  Outbrain,
  Paragraph,
  Quote,
  RelatedArticles,
  SeriesArticles,
  SpecialPromotions,
  Tags,
  TopNews,
  Video,
  withDfpSideEffect,
  TableScore,
  RssFeed,
} from '@haaretz/htz-components';
import ArticlePageList from '../components/List/ArticlePageList';

const tagsFromTagElement = ({ tagsList, }) => tagsList.map(x => x.contentName);

const elements = new Map([
  /* HeaderSlots components */
  [ 'com.htz.EditableNavigationElement', Masthead, ],
  [ 'com.tm.PageTitle', Breadcrumbs, ],

  /* MainSlot components */
  [ 'com.htz.StandardArticle', ArticleBody, ],
  [ 'com.polobase.OutbrainElement', Outbrain, ],
  [ 'com.tm.ArticleCommentsElement', WrappedComments, ],

  /* FooterSlot components */
  [ 'com.tm.FooterElement', Footer, ],

  /* ArticleBody components */
  [ 'embed', Embed, ],
  [ 'interactiveElement', Interactive, ],
  [ 'com.tm.ArticleInteractiveHtmlElement', Interactive, ],
  [ 'p', Paragraph, ],
  [ 'h3', Paragraph, ],
  [ 'a', Paragraph, ],
  [ 'ul', Paragraph, ],
  [ 'ol', Paragraph, ],
  [ 'li', Paragraph, ],
  [ 'com.htz.MagazineArticleQuote', Quote, ],
  [ 'linksBlock', LinksBlock, ],
  [ 'com.polobase.quickNewsletterRegistration', MobileQuickRegistration, ],
  [ 'relatedArticles', RelatedArticles, ],
  [ 'relatedArticleSeries', SeriesArticles, ],
  [ 'com.tm.Link', SpecialPromotions, ],
  /*
   * This is only a temporary solution to avoid hitting preformance, and SHOULD BE AVOIDED as much as possible.
   * This creates a coupling between different concerns: (rendring components, accessing data)
   * but in this case as tags are deeply nested inside an array we use this to avoid searching them inside the entire page data
   * TODO: expose just the tags in graphql, then replace this temprary solution with one that fetchs the data from graphql
   */
  [
    'tagsElement',
    withDfpSideEffect(Tags, {
      sideEffect: tagsElement => dfpTargeting.setTags(tagsFromTagElement(tagsElement)),
    }),
  ],

  /* Misc components */
  [ 'com.tm.Image', Image, ],
  [ 'com.tm.BlogImage', Image, ],
  [ 'com.tm.ImageGalleryElement', ImageGallery, ],
  [ 'gallery', ImageGallery, ],
  [ 'video', Video, ],
  [ 'com.tm.HtmlElement', HtmlElement, ],
  [ 'com.tm.newsLetterQuickRegistrationRespAuto', Newsletter, ],
  [ 'com.tm.ListElement', () => <Debug><p>Old list, NOT SUPPORTED</p></Debug>, ],
  [ 'com.tm.element.List', ArticlePageList, ],
  [ 'com.polobase.whtzMobileSiteListsWrapper', MobileListWrapper, ],
  [ 'com.tm.element.group', ChangeableElementGroup, ],
  [ 'com.tm.HeaderNewsGroup', TopNews, ],
  [ 'com.tm.ElementGroup', ElementGroup, ],
  [ 'com.polobase.DfpBannerElement', GeneralAdSlot, ],
  [ 'com.htz.magazineArticleDfpBannerElement', GeneralAdSlot, ],
  [ 'com.polobase.ClickTrackerBannersWrapper', ClickTrackerWrapper, ],
  [ 'com.tm.TableScore', TableScore, ],
  [ 'com.tm.ExternalRssElement', RssFeed, ],
  [ 'error', Error, ],
  [ null, null, ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, contentId, kind, }) => {
  console.log(`
    Element of type: '${kind || inputTemplate}' is not supported and
    we don't have any component fot it yet.
    The id of the element you tried to render on this page is: ${contentId}.
  `);
  return (
    <Debug>
      <p>{`${kind || inputTemplate} is currently not supported`}</p>
    </Debug>
  );
};

export default inputTemplate => elements.get(inputTemplate) || DefaultComponent;
