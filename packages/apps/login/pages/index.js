/* eslint-disable react/no-did-mount-set-state */

import React, { Fragment, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { FelaTheme, } from 'react-fela';
import isEmail from 'validator/lib/isEmail';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme/index';
import GET_HOST from './queries/GetHost';
import INSPECT_EMAIL from './queries/InspectEmail';
import FlowDispenser from '../components/FlowDispenser/FlowDispenser';
import { storeFlowNumber, } from '../components/FlowDispenser/flowStorage';

const generateEmailError = message =>
  [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('must provide email')
    : !isEmail(email)
      ? generateEmailError('invalid email')
      : []); // email is valid

const getDataFromUserInfo = client => email =>
  client.query({
    query: INSPECT_EMAIL,
    variables: { email, },
  }).then(res => res.data);

const mockDataFromUserInfo = client => email => Promise.resolve({
  user: {
    isUserExist: true,
    isEmailValid: true,
    isPhoneValid: true,
    isPhoneConnectedWithEmail: true,
    isUserPaying: false,
  },
});

const onSubmit = (client, getFlowByData) => ({ email, }) => {
  // getDataFromUserInfo(client)(email)
  mockDataFromUserInfo(client)(email) // TODO remove mock
    .then(res => {
      console.log(`data is: ${JSON.stringify(res.user)}, email is: ${email}`);

      const flow = getFlowByData(res.user);
      storeFlowNumber(client)(flow.flowNumber);
      console.log(flow.initialTransition);
      Router.push(flow.initialTransition);
    })
    // TODO handle error
    .catch(err => console.error(err));
};

const Index = () => (
  <Fragment>
    <ApolloConsumer>
      { client => {
        const host = client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        return (
          <StyleProvider renderer={styleRenderer} theme={theme(host)}>
            <FelaTheme
              render={theme => (
                <Fragment>
                  <Header />
                  <FlowDispenser
                    render={({ getFlowByData, }) => (
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
                            <Button onClick={handleSubmit}>submit</Button>
                          </Fragment>
                        )}
                      />
                    )}
                  />
                  <Footer />
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
