// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  mutation SignUpNotificationEmail($commentId: ID!, $hash: String!, $userEmail: String!) {
    signUpNotificationEmail(newSignUp: { commentId: $commentId, hash: $hash, userEmail: $userEmail}) {
      status
    }
  }
`;
