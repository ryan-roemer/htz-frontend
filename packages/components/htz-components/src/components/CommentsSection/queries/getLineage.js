// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';

export default gql`
  query CommentListLineageQuery($articlePath: String!) {
    page(path: $articlePath) {
      ...PageBreadcrumbs
    }
  }
  ${breadcrumbs}
`;
