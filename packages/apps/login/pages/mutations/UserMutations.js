import gql from 'graphql-tag';

const GENERATE_HASH = gql`
  mutation GenerateHash($typeId: String!) {
    generateOtp(typeId: $typeId) {
      success
      msg
      hash
    }
  }
`;

const CONNECT_MAIL_MOBILE = gql`
  mutation ConnectMailMobile($email: String!, $phone: String!, $userName: String!, $params: String!) {
    sendMobileEmailConnection(email: $email, phone: $phone, userName: $userName, params: $params) {
      success
      message
    }
  }
`;

export { GENERATE_HASH, CONNECT_MAIL_MOBILE, };
