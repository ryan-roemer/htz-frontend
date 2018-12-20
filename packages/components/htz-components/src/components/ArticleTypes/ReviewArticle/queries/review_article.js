import gql from 'graphql-tag';
import {
  author,
  changeableElementGroup,
  content,
  dfpBanner,
  elementGroup,
  embed,
  htmlElement,
  image,
  imageGallery,
  interactive,
  link,
  mobileQuickRegistration,
  newsLetter,
  paragraph,
  quote,
  relatedArticles,
  seoData,
  seriesOrBlockArticles,
  tags,
  video,
} from '@haaretz/app-utils';

export default gql`
  query ReviewArticleContent($path: String!) {
    page(path: $path) {
      pageType
      ...PageSeoData
      slots {
        aside {
          ... on ChangeableElementGroup {
            ...ChangeableElementGroup
          }
        }
        article {
          ... on Content {
            inputTemplate
            contentId
            contentName
            properties
          }
          ... on ArticleData {
            header {
              exclusive
              mobileExclusive
              mobileSubtitle
              mobileTitle
              modDate
              pubDate
              reportingFrom
              subtitle
              title
            }
            headlineElement: mainElement {
              ... on Embed {
                ...Embed
              }
              ... on HtmlElement {
                ...HtmlElement
              }
              ... on Image {
                ...Image
              }
              ... on ImageGallery {
                ...ImageGallery
              }
              ... on Video {
                ...Video
              }
            }
            bookCover {
              ...Image
            }
            authors {
              ...Author
            }
            body {
              ... on Content {
                ...Content
              }
              ... on DfpBanner {
                ...DfpBanner
              }
              ... on ElementGroup {
                ...ElementGroup
              }
              ... on Embed {
                ...Embed
              }
              ... on HtmlElement {
                ...HtmlElement
              }
              ... on Image {
                ...Image
              }
              ... on ImageGallery {
                ...ImageGallery
              }
              ... on Interactive {
                ...Interactive
              }
              ... on Link {
                ...Link
              }
              ... on MobileQuickRegistration {
                ...MobileQuickRegistration
              }
              ... on NewsLetter {
                ...NewsLetter
              }
              ... on Paragraph {
                ...Paragraph
              }
              ... on RelatedArticles {
                ...RelatedArticles
              }
              ... on SeriesOrBlockArticles {
                ...SeriesOrBlockArticles
              }
              ... on Quote {
                ...Quote
              }
              ... on Tags {
                ...Tags
              }
              ... on Video {
                ...Video
              }
            }
            tags {
              url
              contentName
            }
            reviewType
            amenities
            reviewStars
            inputTemplate
            commentsElementId
          }
        }
      }
    }
  }
  ${author}
  ${changeableElementGroup}
  ${content}
  ${dfpBanner}
  ${elementGroup}
  ${embed}
  ${htmlElement}
  ${image}
  ${imageGallery}
  ${interactive}
  ${link}
  ${mobileQuickRegistration}
  ${newsLetter}
  ${paragraph}
  ${quote}
  ${relatedArticles}
  ${seoData}
  ${seriesOrBlockArticles}
  ${tags}
  ${video}
`;
