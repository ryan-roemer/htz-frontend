import React, { Fragment, Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';
import { getEmail, getPhoneEmailConfirmation, } from './queryutil/userDetailsOperations';
import { Form, TextInput, Button, Login, HtzLink, } from '@haaretz/htz-components';

import FSMLayout from '../layouts/FSMLayout';
import { getUserData, getPhoneNum, getOtpHash, } from './queryutil/userDetailsOperations';
import theme from '../theme/index';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import GET_HOST from './queries/GetHost';
import OtpForm from '../components/Misc/Forms/OtpForm';
import { validateMailWithPhone, } from './queryutil/userDetailsOperations';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smsCode', order: 1, errorText: message, }, ];
const isNumeric = number => Number(number).toString() !== 'NaN';
const validateSmsCodeInput = ({ smsCode, }) =>
  (!isNumeric(smsCode) || !smsCode || smsCode.length < 1
    ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
    : []);

const onSubmit = ({ client, host, loginWithMobile, showError, hideError }) => ({ smsCode, termsChk, }) => {
  hideError();
  loginWithMobile(getPhoneNum(client), smsCode, termsChk, getOtpHash(client))
    .then(
      // eslint-disable-next-line no-undef
      () => { window.location = `https://www.${host}`; },
      reason => showError((reason.message || "אירעה שגיאה, אנא נסה שנית מאוחר יותר."))
    );
}

const hidePhone = phoneNumber => `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7)}`;

/*const vlidateEmailPhoneConnection = (client) => {
  const email = getEmail(client);
  const confirmation = getPhoneEmailConfirmation(client);
  validateMailWithPhone(client)({ email, confirmation, })
    .then(
      () => {
        console.log("------ success vlidateEmailPhoneConnection");
      },
      (error) => {
        showError(error.message)
      }
    );
}*/

// --------------------------

class OtpValidation extends Component {

  state = {
    showError: false,
    errorMessage: '',
  }

  showError = (errorMsg) => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  }

  render() {
    return(
      <FSMLayout>
        {({ currentState, findRout, doTransition, }) => (
          <ApolloConsumer>
            {client => {
              const host = client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];
              return (
                <ContentWrapper>
                  <FormWrapper>
                    <ItemCenterer>
                      <h5>
                        להתחברות הזינו את הקוד שנשלח למספר
                        <br />
                        <span dir="ltr">{ /*hidePhone(getUserData(client).phoneNum)*/ }</span>
                      </h5>
                    </ItemCenterer>
                    <Login
                      render={({ loginWithMobile, }) => (
                        <Form
                          clearFormAfterSubmit={false}
                          // initialValues={{ email: 'insert email' }}
                          validate={validateSmsCodeInput}
                          onSubmit={onSubmit({ client, host, loginWithMobile, showError: this.showError, hideError: this.hideError })}
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
                                    onClick={e => {
                                      e.preventDefault();
                                      const route = doTransition('sendAgain');
                                      Router.push(route);
                                    }}
                                  >
                                    שלח בשנית
                                  </button>
                                </InputLinkButton>
                              </div>
    
                              <ErrorBox className={this.state.showError ? "" : "hidden"}>
                                <span>
                                  {this.state.errorMessage}
                                </span>
                              </ErrorBox>
    
                              <ItemCenterer>
                                <Button onClick={handleSubmit}>התחברות</Button>
                              </ItemCenterer>
                            </Fragment>
                          )}
                        />
                      )}
                    />
                    <BottomLinks spacing={2.5}>
                      <HtzLink
                        href={`${findRout('notMyPhone')}`}
                        onClick={e => {
                          e.preventDefault();
                          const route = doTransition('notMyPhone');
                          Router.push(route);
                        }}
                      >
                        לא הטלפון שלך?
                      </HtzLink>
    
                      <br />
    
                      <HtzLink
                        href={`${findRout('withPassword')}`}
                        onClick={e => {
                          e.preventDefault();
                          const route = doTransition('withPassword');
                          Router.push(route);
                        }}
                      >
                        כניסה באמצעות סיסמה
                      </HtzLink>
                    </BottomLinks>
                  </FormWrapper>
    
                  {/*<OtpForm dataRefs={{ host, client, findRout, doTransition, }} />*/}
                </ContentWrapper>
              );
            }}
          </ApolloConsumer>
        )}
      </FSMLayout>
    );
  }

}

export default OtpValidation;
