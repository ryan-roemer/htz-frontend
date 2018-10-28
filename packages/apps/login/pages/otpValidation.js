import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { getUserData, } from './queryutil/userDetailsOperations'

import { ApolloConsumer, } from 'react-apollo';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
// import { StyleProvider, } from '@haaretz/fela-utils';
// import { createComponent, FelaTheme, } from 'react-fela';
// import isEmail from 'validator/lib/isEmail';
// import Header from '../layouts/Header';
// import Footer from '../layouts/Footer';
// import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme/index';
// import GET_HOST from './queries/GetHost';
// import INSPECT_EMAIL from './queries/InspectEmail';
// import FlowDispenser from '../components/FlowDispenser/FlowDispenser';
// import { storeFlowNumber, } from '../components/FlowDispenser/flowStorage';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const { PageWrapper, ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smscode', order: 1, errorText: message, }, ];
const isNumeric = number => !isNaN(number);
const validateSmsCodeInput = ({ smscode, }) =>
  (!isNumeric(smscode) || !smscode || smscode.length < 1
    ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
    : []);

const onSubmit = () => {
  console.log('submit');
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

const OtpValidation = () => (
  <FSMLayout>
    {({ currentState, findRout, doTransition, }) => (
        <ApolloConsumer>
          {client => (
            <Fragment>
              <ContentWrapper>
                <FormWrapper>
                  <ItemCenterer>
                    <h5>
                      להתחברות הזינו את הקוד שנשלח למספר
                      <br />
                      <span dir="ltr">{ getUserData(client).phoneNum }</span>
                    </h5>
                  </ItemCenterer>

                  <Form
                    clearFormAfterSubmit={false}
                    // initialValues={{ email: 'insert email' }}
                    validate={validateSmsCodeInput}
                    onSubmit={onSubmit}
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
                              name: 'smscode',
                              label: 'קוד אימות',
                              type: 'text',
                            })}
                          />
                          <InputLinkButton>
                            <span
                              onClick={() => {
                                const route = doTransition('sendAgain');
                                Router.push(route);
                              }}
                            >
                              שלח בשנית
                            </span>
                          </InputLinkButton>
                        </div>
                        <ItemCenterer>
                          <Button onClick={handleSubmit}>התחברות</Button>
                        </ItemCenterer>
                      </Fragment>
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

                    <br/>

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
              </ContentWrapper>
            </Fragment>
          )}
        </ApolloConsumer>
        )}
  </FSMLayout>
);

export default OtpValidation;
