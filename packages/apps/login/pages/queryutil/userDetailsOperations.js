import INSPECT_EMAIL, { USER_DATA, PHONE_NUM, OTP_HASH, USER_EMAIL, } from '../queries/UserQueries';
import { GENERATE_HASH, CONNECT_MAIL_MOBILE, } from '../mutations/UserMutations';

const getDataFromUserInfo = client => email =>
  client
    .query({
      query: INSPECT_EMAIL,
      variables: { email, },
    })
    .then(res => {
      const data = res.data;
      console.log(JSON.stringify({ userData: data.userByMail, }));
      return data;
    });

const mockDataFromUserInfo = client => email =>
  Promise.resolve({
    userByMail: {
      ssoId: '20023790436',
      phoneNum: '0548888888',
      userStatus: {
        isEmailValidated: false,
        isMobileValidated: true,
        isPhoneEmailConn: false,
      },
      userCrmStatus: {
        id: 654654,
        isActiveTm: true,
        isActiveHeb: false,
        isActiveEng: false,
      },
    },
  });

const getUserData = client => client.readQuery({ query: USER_DATA, }).userData;
const getOtpHash = client => client.readQuery({ query: OTP_HASH, }).otpHash;
const getEmail = client => client.readQuery({ query: USER_EMAIL, }).userEmail;
const getPhoneNum = client => client.readQuery({ query: PHONE_NUM, }).userData.phoneNum;

const saveUserData = client => userDataObj => {
  client.writeData({ data: userDataObj, });
  return userDataObj;
};

const generateOtp = client => phoneNumObj =>
  client.mutate({
    variables: phoneNumObj,
    mutation: GENERATE_HASH,
  });

const connectMailWithPhone = client => dataObj =>
  client.mutate({
    variables: dataObj,
    mutation: CONNECT_MAIL_MOBILE,
  });

const saveOtpHash = client => otpHashObj => {
  client.writeData({ data: otpHashObj, });
  return otpHashObj;
};

const saveUserEmail = client => email => {
  client.writeData({ data: { userEmail: email, }, });
  return email;
};

const savePhoneNum = client => phoneNumObj => {
  client.writeData({ data: phoneNumObj, });
  return phoneNumObj;
};

export {
  getPhoneNum,
  savePhoneNum,
  getUserData,
  saveUserData,
  getOtpHash,
  saveOtpHash,
  getEmail,
  saveUserEmail,
  getDataFromUserInfo,
  mockDataFromUserInfo,
  generateOtp,
  connectMailWithPhone,
};
