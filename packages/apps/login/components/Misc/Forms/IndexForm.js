import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import isEmail from 'validator/lib/isEmail';
import Router from 'next/router';
import objTransform from '../../../util/objectTransformationUtil';
import { storeFlowNumber, } from '../../FlowDispenser/flowStorage';
import { saveUserData, getDataFromUserInfo, saveOtpHash, generateOtp, saveUserEmail, validateMailWithPhone, } from '../../../pages/queryutil/userDetailsOperations';
import { writeMetaDataToApollo, parseRouteInfo, } from '../../../pages/queryutil/flowUtil';
import Preloader from '../../Misc/Preloader';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { sendMailValidation, } from '../../../util/requestUtil';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods ----------------------------
const b64DecodeUnicode = str => (str
  ? decodeURIComponent(atob(str).split('').map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''))
  : null);

const getParamsData = params => {
  if (params) {
    const decodedParams = atob(b64DecodeUnicode(params)).split('&');
    return {
      email: decodedParams[0].split('=')[1],
      phone: decodedParams[1].split('=')[1],
    };
  }

  return { email: '', phone: '', };
};

const getUrlParams = () => {
  const pageUrl = new URL(window.location.href);
  return {
    confirmation: pageUrl.searchParams.get('confirmation'),
    ...getParamsData(pageUrl.searchParams.get('params')),
  };
};

const generateEmailError = message => [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const vlidateEmailPhoneConnection = (client, email, autoRoute, confirmation, eventsHandler) => {
  validateMailWithPhone(client)({ email, confirmation, })
    .then(
      () => {
        eventsHandler();
        return Router.push(autoRoute);
      },
      error => {
        showError(error.message);
      }
    );
};

const hasValidatedPhone = dataSaved => dataSaved
        && dataSaved.userData
        && dataSaved.userData.userStatus
        && dataSaved.userData.userStatus.isMobileValidated
        && dataSaved.userData.phoneNum;

const hasValidatedEmail = dataSaved => dataSaved
        && dataSaved.userData
        && dataSaved.userData.userStatus
        && dataSaved.userData.userStatus.isEmailValidated;

const handleGenerateOtp = ({ phoneNum, email, ssoId, client, flow, route, showError, setPreloader, autoRoute, confirmation, eventsHandler, }) =>
  generateOtp(client)({ typeId: phoneNum, })
    .then(data => {
      const json = data.data.generateOtp;
      saveOtpHash(client)({ otpHash: json.hash, });
      if (json.success) {
        if (confirmation) {
          saveUserData(client)({ userData: { phoneNum, ssoId, __typename: 'SsoUser', }, });
          vlidateEmailPhoneConnection(client, email, autoRoute, confirmation, eventsHandler);
        }
        else {
          eventsHandler();
          Router.push(route);
        }
      }
      else {
        setPreloader(false);
        showError((json.msg || 'אירעה שגיאה, אנא נסה שנית מאוחר יותר.'));
      }
    });

const handleResponseFromGraphql =
  ({ client, getFlowByData, email, phone, res, showError, setPreloader, eventsTrackers, autoRoute, confirmation, }) => {
    const dataSaved = saveUserData(client)({ userData: res.userByMail, });
    const transformedObj = objTransform(res);
    const flow = getFlowByData(transformedObj.user);
    if (confirmation) {
      flow.flowNumber = 1;
      flow.initialState = 'loginFormsOtp';
    }
    storeFlowNumber(client)(flow.flowNumber);
    const eventsHandler = sendTrackingEvents(eventsTrackers, { page: 'Main Login', flowNumber: flow.flowNumber, label: 'proceedEmail', });
    const { route, metadata, } = parseRouteInfo(flow.initialTransition);
    writeMetaDataToApollo(client, metadata);
    if (hasValidatedPhone(dataSaved) || confirmation) {
      handleGenerateOtp({
        client,
        email,
        phoneNum: phone || dataSaved.userData.phoneNum,
        ssoId: res.userByMail.ssoId,
        flow,
        route,
        showError,
        setPreloader,
        autoRoute,
        confirmation,
        eventsHandler,
      });
    }
    else if (!hasValidatedEmail(dataSaved)) {
      sendMailValidation({ email, }).then(
        () => {
          eventsHandler();
          Router.push(route);
        },
        error => {
          showError((error.message || 'אירעה שגיאה'));
        }
      );
    }
    else {
      eventsHandler();
      Router.push(route);
    }
  };

const onSubmit = (
  client,
  getFlowByData,
  showError,
  hideError,
  setPreloader,
  eventsTrackers,
  autoRoute,
  confirmation
) => ({ email, phone, }) => {
  hideError();
  setPreloader(true);
  saveUserEmail(client)(email);
  // mockDataFromUserInfo(client)(email)
  getDataFromUserInfo(client)(email)
    .then(res => {
      handleResponseFromGraphql({
        client,
        getFlowByData,
        email,
        phone,
        res,
        showError,
        setPreloader,
        eventsTrackers,
        autoRoute,
        confirmation,
      });
    })
    .catch(err => {
      setPreloader(false);
      showError('אירעה שגיאה. אנא נסה שנית במועד מאוחר יותר');
    });
};
// ------------------------------------

class IndexForm extends Component {
  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
  }

  /* :::::::::::::::::::::::::::::::::::: { PROPS :::::::::::::::::::::::::::::::::::: */
  static propTypes = {
    client: PropTypes.object.isRequired,
    getFlowByData: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    gaAction: PropTypes.func,
    biAction: PropTypes.func,
  };

  static defaultProps = {
    client: null,
    getFlowByData: null,
    theme: null,
    gaAction: null,
    biAction: null,
  };
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  componentDidMount() {
    this.autoSubmit(this.props);
  }

  setPreloader = isLoadingStatus => {
    this.setState({ isLoading: !!isLoadingStatus, });
  };

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  };

  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  /**
   * the autoSubmit method runs when the user returns to the login page from a confirmation email
   */
  autoSubmit = ({ client, getFlowByData, }) => {
    const { confirmation, email, phone, } = getUrlParams();
    const eventsTrackers = { gaAction: this.props.gaAction, biAction: this.props.biAction, };
    if (confirmation) {
      const autoSubmitFunction = onSubmit(client, getFlowByData, this.showError, this.hideError, this.setPreloader, eventsTrackers, '/loginForms', confirmation);
      autoSubmitFunction({ email, phone, });
    }
  }
  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { client, getFlowByData, theme, gaAction, biAction, } = this.props;
    const eventsTrackers = { gaAction, biAction, };
    return (
      <FormWrapper>
        <ItemCenterer>
          <h5>לכניסה או הרשמה לאתר הזינו כתובת דוא”ל</h5>
        </ItemCenterer>
        <Form
          clearFormAfterSubmit={false}
          validate={validateEmailInput}
          onSubmit={onSubmit(client, getFlowByData, this.showError, this.hideError, this.setPreloader, eventsTrackers)}
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

              <ErrorBox className={this.state.showError ? '' : 'hidden'}>
                <span>
                  {this.state.errorMessage}
                </span>
              </ErrorBox>

              <ItemCenterer>
                <Preloader isLoading={this.state.isLoading} />
                <Button onClick={handleSubmit}>המשך</Button>
              </ItemCenterer>
            </Fragment>
          )}
        />
      </FormWrapper>
    );
    /* :::::::::::::::::::::::::::::::::::: RENDER } :::::::::::::::::::::::::::::::::::: */
  }
}

export default IndexForm;
