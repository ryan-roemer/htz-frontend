// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  mutation AddVote($commentId: ID!, $group: String!, $lineageString: String!) {
    addVote(
      newVote: { commentId: $commentId, group: $group, lineageString: $lineageString }
    ) {
      status
    }
  }
`;
