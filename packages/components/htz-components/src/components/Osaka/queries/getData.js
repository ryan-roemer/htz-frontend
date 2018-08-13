// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export const fromCache = gql`
  query OsakaCacheQuery($path: String!) {
    articleSection @client {
      name
      id
      url
    }
    hostname @client
    page(path: $path) {
      seoData {
        canonicalUrl
      }
    }
  }
`;

export const nextArticle = gql`
  query OsakaNextArticle($sectionId: ID!, $readingHistory: [ID]) {
    nextArticle(sectionId: $sectionId, readingHistory: $readingHistory) {
      result
    }
  }
`;
