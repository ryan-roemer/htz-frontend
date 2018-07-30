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
  paragraph,
  quote,
  relatedArticles,
  seoData,
  seriesOrBlockArticles,
  tags,
  video,
} from '@haaretz/app-utils';

export default gql`
  query StandardArticleContent($path: String!) {
    page(path: $path) {
      pageType
      ...PageSeoData
      slots {
        ... on StandardArticleSlots {
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
              authors {
                ... on CreditObject {
                  ...CreditObj
                }
                ... on AuthorObject {
                  ...AuthorObj
                }
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
              inputTemplate
              commentsElementId
            }
          }
        }
      }
    }
  }
  ${author.authorObj}
  ${author.creditObj}
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
  ${paragraph}
  ${quote}
  ${relatedArticles}
  ${seoData}
  ${seriesOrBlockArticles}
  ${tags}
  ${video}
`;
