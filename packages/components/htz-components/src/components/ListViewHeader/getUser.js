import gql from 'graphql-tag';

export const getUser = gql`
  query getUser {
    user @client {
        type
    }
  }
`;
