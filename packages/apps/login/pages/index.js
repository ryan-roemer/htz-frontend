/* eslint-disable react/no-did-mount-set-state */

import React, { Fragment, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { createComponent, FelaTheme, } from 'react-fela';
import isEmail from 'validator/lib/isEmail';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme/index';
import GET_HOST from './queries/GetHost';
import FlowDispenser from '../components/FlowDispenser/FlowDispenser';
import { storeFlowNumber, } from '../components/FlowDispenser/flowStorage';
import { LoginContentStyles, } from '../components/StyleComponents/LoginStyleComponents';
import objTransform from '../util/objectTransformationUtil';
import { saveUserData, getDataFromUserInfo, saveOtpHash, generateOtp, mockDataFromUserInfo, } from './queryutil/userDetailsOperations';

// Styling Components -------
const { PageWrapper, ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
// --------------------------

const generateEmailError = message => [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const saveHashIfSuccessTrue = ({ success, hash, msg, client, }) => {
  if (success) {
    saveOtpHash(client)({ otpHash: hash, });
  }
  return { success, hash, msg, };
};

const handleGenerateOtp = ({ phoneNum, client, }) =>
  generateOtp(client)({ typeId: phoneNum, })
    .then(({ success, hash, msg, }) => saveHashIfSuccessTrue({ success, hash, msg, client, }));

const handleResponseFromGraphql = ({ client, getFlowByData, email, res, }) => {
  const dataSaved = saveUserData(client)({ userData: res.userByMail, });
  const transformedObj = objTransform(res);
  console.log(`data is: ${JSON.stringify(transformedObj.user)}, email is: ${email}`);
  const flow = getFlowByData(transformedObj.user);
  storeFlowNumber(client)(flow.flowNumber);
  console.log(flow.initialTransition);
  handleGenerateOtp({ client, phoneNum: dataSaved.userData.phoneNum, })
    .then(({ success, }) => {
      if (success) {
        Router.push(flow.initialTransition);
      }
      else {
        // TODO: show error
        Router.push(flow.initialTransition); // <- Tmp, should be replaced with error handler
      }
    });
};

const onSubmit = (client, getFlowByData) => ({ email, }) => {
  // mockDataFromUserInfo(client)(email)
  getDataFromUserInfo(client)(email)
    .then(res => handleResponseFromGraphql({ client, getFlowByData, email, res, }))
    // TODO handle error
    .catch(err => console.error(err));
};

const Index = () => (
  <Fragment>
    <ApolloConsumer>
      {client => {
        const host = client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        return (
          <StyleProvider renderer={styleRenderer} theme={theme(host)}>
            <FelaTheme
              render={theme => (
                <Fragment>
                  <PageWrapper>
                    <Header />
                    <ContentWrapper>
                      <FlowDispenser
                        render={({ getFlowByData, }) => (
                          <FormWrapper>
                            <ItemCenterer>
                              <h5>לכניסה או הרשמה לאתר הזינו כתובת דוא”ל</h5>
                            </ItemCenterer>
                            <Form
                              clearFormAfterSubmit={false}
                              // initialValues={{ email: 'insert email' }}
                              validate={validateEmailInput}
                              onSubmit={onSubmit(client, getFlowByData)}
                              render={({ getInputProps, handleSubmit, clearForm, }) => (
                                <Fragment>
                                  <TextInput
                                    type="email"
                                    label={theme.emailInputLabel}
                                    noteText="אנא הזינו כתובת דוא”ל"
                                    requiredText={{
                                      long: theme.emailInputRequiredLong,
                                      short: theme.emailInputRequiredShort,
                                    }}
                                    {...getInputProps({
                                      name: 'email',
                                      label: theme.emailInputLabel,
                                      type: 'email',
                                    })}
                                  />
                                  <ItemCenterer>
                                    <Button onClick={handleSubmit}>המשך</Button>
                                  </ItemCenterer>
                                </Fragment>
                              )}
                            />
                          </FormWrapper>
                        )}
                      />
                    </ContentWrapper>
                    <Footer />
                  </PageWrapper>
                </Fragment>
              )}
            />
          </StyleProvider>
        );
      }}
    </ApolloConsumer>
  </Fragment>
);

export default Index;
