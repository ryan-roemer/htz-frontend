import gql from 'graphql-tag';

export default gql`
  query GetEmailData($email: String!) {
    userByMail(id: $email) {
      ssoId
      phoneNum
      userStatus {
        isEmailValidated
        isMobileValidated
        isPhoneEmailConn
      }
      userCrmStatus {
        isActiveTm
        isActiveHeb
        isActiveEng
      }
    }
  }
`;

const USER_DATA = gql`
  query getUserData {
    userData @client {
      ssoId
      userStatus {
        isEmailValidated
        isMobileValidated
        isPhoneEmailConn
      }
      userCrmStatus {
        id
        isActiveTm
        isActiveHeb
        isActiveEng
      }
    }
  }
`;

const PHONE_NUM = gql`
  query getPhoneNum {
    userData @client {
      phoneNum
    }
  }
`;

// export { USER_DATA, PHONE_NUM, };
