import gql from 'graphql-tag';
import {
  clickTrackerBannersWrapper,
  dfpBanner,
  elementGroup,
  embed,
  image,
  imageGallery,
  content,
} from '@haaretz/app-utils';

export default gql`
  query HomePageLayout ($path: String!){
    homePage (path: $path){
      pageType
      globalLazyload
      seoData {
        metaTitle
        metaDescription
        canonicalUrl
      }
      pageDateTimeString
      slots {
        preHeader
        header
        postHeader
        postMain
        footer
        main {
          ... on HeaderNewsGroup {
            contentId
            contentName
            inputTemplate
            newsItems: contentLists {
              href
              isCommercial
              contentId
              inputTemplate
              contentName
            }
          }
          ... on HomePageMainBlock {
            contentId
            inputTemplate
            slotA {
              view
              inputTemplate
              loadPriority
              isLazyloadImages
              title
              contentId
              items {
                ...ItemInList
              }
            }
            slotB {
              ...DfpBanner
            }
            slotC {
              view
              inputTemplate
              loadPriority
              isLazyloadImages
              title
              contentId
              items {
                ...ItemInList
              }
            }
            mainBlockComponents {
              ... on Countdown {
                inputTemplate
                endOfTime
                title
              }
            }
          }
          ... on List {
            ...HomePageList
          }
          ... on DfpBanner {
            ...DfpBanner
          }
          ... on ElementGroup {
            ...ElementGroup
          }
          ... on ClickTrackerBannersWrapper {
            ...ClickTrackerBannersWrapper
          }
          ... on GridElementGroup {
            ...GridElementGroup
          }
          ... on TabViewElements {
            ...TabViewElements
          }
          ... on MobileListWrapper {
            contentName
            contentId
            inputTemplate
            loadPriority
            lists {
              ... on Content {
                ...Content
              }
              ... on List {
                ...HomePageList
              }
            }
          }
          ... on RssFeed {
            inputTemplate
            loadPriority
            title
            items {
              title
              creator
              author
              imageUrl
              link
              description
              publishedDate               
            }
          }
          ... on MiddleRuler {
             inputTemplate
             text
             actionUrl
             contentId
             contentName
          }
          ... on NullFallback {
            message
            errorCode
            kind
          }
          ... on Content {
            ...Content
          }
        }
      }
    }
  }

  fragment ItemInList on TeaserInList {
    commentsCounts
    contentId
    representedContent
    representedContentType
    exclusive
    exclusiveMobile
    firstParagraph
    inputTemplate
    lastUpdate
    path
    publishDate
    rank
    subtitle
    subtitleMobile
    title
    titleMobile
    authors {
      contentName
    }
    authorImage {
      ...Image
    }
    image {
      ...Image
    }
    media {
      ... on Image {
        ...Image
      }
      ... on Embed {
        ...Embed
      }
      ... on ImageGallery {
        ...ImageGallery
      }
    }
    relatedArticles {
      title
      path
      contentId
    }
  }

  fragment HomePageList on List {
    contentId
    description
    inputTemplate
    isLazyloadImages
    loadPriority
    title
    url
    urlDescription
    view
    clickTrackers {
      ...ClickTrackerBannersWrapper
    }
    commercialLinks {
      href
      contentName
      contentId
    }
    dfp {
      ...DfpBanner
    }
    extraLinks {
      href
      contentName
      contentId
    }
    items {
      ...ItemInList
    }
    marketingTeaser {
      title
      subtitle
      href
      cta
    }
  }

  fragment GridElementGroup on GridElementGroup {
    inputTemplate
    contentName
    contentId
    title
    loadPriority
    items {
      width {
        from
        until
        value
      }
      miscStyles
      content {
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
        ... on DfpBanner {
          ...DfpBanner
        }
        ... on List {
          ...HomePageList
        }
        ... on TabViewElements {
          ...TabViewElements
        }
      }
    }
  }

  fragment TabViewElements on TabViewElements {
    inputTemplate
    contentId
    contentName
    title
    type
    viewMode
    loadPriority
    elements {
      ... on ClickTrackerBannersWrapper {
        ...ClickTrackerBannersWrapper
      }
      ... on DfpBanner {
        ...DfpBanner
      }
      ... on List {
        ...HomePageList
      }
    }
  }

  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${elementGroup}
  ${embed}
  ${image}
  ${imageGallery}
  ${content}
`;
