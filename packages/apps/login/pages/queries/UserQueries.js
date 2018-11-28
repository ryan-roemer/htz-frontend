import gql from 'graphql-tag';

export default gql`
  query GetEmailData($email: String!) {
    userByMail(id: $email) {
      ssoId
      firstName
      phoneNum
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

const USER = gql`
  query getUser {
    userData @client {
      ssoId
      userCrmStatus
      facebook {
        token
        redirect
      }
    }
  }
`;

const USER_DATA = gql`
  query getUserData {
    userData @client {
      ssoId
      firstName
      phoneNum
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

const OTP_HASH = gql`
  query getOtpHash {
    otpHash @client
  }
`;

const PHONE_NUM = gql`
  query getPhoneNum {
    userData @client {
      phoneNum
    }
  }
`;

const HOSTNAME = gql`
  query getHostname {
    hostname @client
  }
`;

const USER_EMAIL = gql`
  query getUserEmail {
    userEmail @client
  }
`;

const PHONE_EMAIL_CONFIRMATION = gql`
  query getUserEmail {
    phoneEmailConfirmation @client
  }
`;

export { USER, USER_DATA, PHONE_NUM, OTP_HASH, USER_EMAIL, HOSTNAME, PHONE_EMAIL_CONFIRMATION, };
