import gql from 'graphql-tag';
import {
  author,
  articleHeader,
  content,
  dfpBanner,
  embed,
  htmlElement,
  image,
  imageGallery,
  interactive,
  link,
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
          aside
          article {
            ... on Content {
              inputTemplate
              contentId
              contentName
              properties
            }
            ... on ArticleHeader {
              ...ArticleHeader
            }
            ... on ArticleData {
              # Guy Kedar, todo: when papi exports full authors, remove query here and get authors only from article header element
              authors {
                ... on CreditObject {
                  ...CreditObj
                }
                ... on AuthorObject {
                  ...AuthorObj
                }
              }
              inputTemplate
              commentsElementId
              body {
                ... on Content {
                  ...Content
                }
                ... on DfpBanner {
                  ...DfpBanner
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
            }
          }
        }
      }
    }
  }
  ${author.authorObj}
  ${author.creditObj}
  ${articleHeader}
  ${content}
  ${dfpBanner}
  ${embed}
  ${htmlElement}
  ${image}
  ${imageGallery}
  ${interactive}
  ${link}
  ${paragraph}
  ${quote}
  ${relatedArticles}
  ${seoData}
  ${seriesOrBlockArticles}
  ${tags}
  ${video}
`;
