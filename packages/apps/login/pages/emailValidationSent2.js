import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { createComponent, } from 'react-fela';
import { ApolloConsumer, } from '@haaretz/htz-components';
import BottomLinks from '../components/Misc/BottomLinks';
import { sendMailValidation, } from '../util/requestUtil';
import { getEmail, } from './queryutil/userDetailsOperations';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { TextBox, } = LoginMiscLayoutStyles;
const greenTextStyle = () => ({
  color: '#2f872a',
})
const GreenText = createComponent(greenTextStyle);
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smscode', order: 1, errorText: message, }, ];

const isValidPhoneNumber = number => {
  const phoneRegex = /^(\s*|[\+0-9]\d{6,})$/;
  return phoneRegex.test(number);
};
const validatePhoneNumber = ({ smscode, }) =>
  (!isValidPhoneNumber(smscode) || !smscode || smscode.length < 10
    ? generateSmsCodeError('אנא הזינו מספר טלפון נייד')
    : []);

const onSubmit = doTransitionFunction => {
  const route = doTransitionFunction('accept');
  Router.push(route);
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------
class EmailValidationSent2 extends React.Component {

  state = {
    shouldSendEmail: false,
  }

  sendEmail = (email) => {
    return this.state.shouldSendEmail ? 
      sendMailValidation({ email, }) : null;
  }

  componentDidMount() {
    this.setState({ shouldSendEmail: true, });
  }

  render() {
    return(
      <ApolloConsumer>
        {client => {
            //const email = getEmail(client);
            //this.sendEmail(email);
            return(
              <FSMLayout>
                {({ currentState, findRout, doTransition, }) => (
                  <Fragment>
                    <ContentWrapper>
                      <FormWrapper>
                        <TextBox>
                          <GreenText>
                            <h5>נשלח אלייך מייל בשנית</h5>
                          </GreenText>
                        </TextBox>
            
                        <BottomLinks spacing={2}>
                          <span>לא הגיע? </span>
                          <br/>
                          <HtzLink href="https://www.haaretz.co.il/misc/contact-us" target="_blank">
                            פניה לשירות לקוחות
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
              </FSMLayout>
            );
          }
        }
      </ApolloConsumer>

      
    );
  }
}
export default EmailValidationSent2;
