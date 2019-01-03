import React, { Fragment, } from 'react';
import Router from 'next/router';
import { Form, TextInput, Button, Login, HtzLink, } from '@haaretz/htz-components';
import theme from '../../../theme/index';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { getUserData, getPhoneNum, getOtpHash, generateOtp, getEmail, } from '../../../pages/queryutil/userDetailsOperations';
import { getHost, } from '../../../util/requestUtil';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smsCode', order: 1, errorText: message, }, ];
const isNumeric = number => Number(number).toString() !== 'NaN';
const validateSmsCodeInput = ({ smsCode, }) =>
  (!isNumeric(smsCode) || !smsCode || smsCode.length < 1
    ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
    : []);

const onSubmit = ({ client, host, loginWithMobile, }) => ({ smsCode, termsChk, }) =>
  loginWithMobile(getPhoneNum(client), getEmail(client), smsCode, termsChk, getOtpHash(client))
    .then(
      // eslint-disable-next-line no-undef
      () => { window.location = `https://www.${host}`; },
      reason => console.log(reason.message) // TODO: add error UI
    );

const handleGenerateOtp = (client, doTransition) => {
  generateOtp(client)({ typeId: getUserData(client).phoneNum, })
    .then(
      () => {
        console.log("SmS Sent again");
        const route = doTransition('sendAgain');
        Router.push(route);
      },
      (error) => {
        console.log("Error sending SmS again");
      }
    );
}
    
const hidePhone = phoneNumber => {
  return phoneNumber.substring(0, 3) + "****" + phoneNumber.substring(7);
}

// --------------------------

export default ({ client, findRout, doTransition, }) => {
  const host = getHost(client);
  return (
    <FormWrapper>
      <ItemCenterer>
        <h5>
          להתחברות הזינו את הקוד שנשלח למספר
          <br />
          <span dir="ltr">{ hidePhone(getUserData(client).phoneNum) }</span>
        </h5>
      </ItemCenterer>
      <Login
        render={({ loginWithMobile, }) => (
          <Form
            clearFormAfterSubmit={false}
            // initialValues={{ email: 'insert email' }}
            validate={validateSmsCodeInput}
            onSubmit={onSubmit({ host, client, loginWithMobile, })}
            render={({ getInputProps, handleSubmit, clearForm, }) => (
              <Fragment>
                <div>
                  <TextInput
                    type="number"
                    label={theme.emailInputLabel}
                    noteText="אנא הזינו את הקוד שנשלח אליכם"
                    requiredText={{
                      long: 'אנא הזינו את הקוד שנשלח אליכם',
                      short: '*',
                    }}
                    {...getInputProps({
                      name: 'smsCode',
                      label: 'קוד אימות',
                      type: 'text',
                    })}
                  />
                  <InputLinkButton>
                    <button
                      data-role="resend"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGenerateOtp(client, doTransition);
                      }}
                    >
                      שלח בשנית
                    </button>
                  </InputLinkButton>
                </div>
                <ItemCenterer>
                  <Button onClick={handleSubmit}>התחברות</Button>
                </ItemCenterer>
              </Fragment>
            )}
          />
        )}
      />
    </FormWrapper>
  );
};
