/* ----------------------------------- */
/* LOGIN WITH FACEBOOK INSTANT ARTICLE */
/* ----------------------------------- */

/** Config --------------------------------------------- */

const FACEBOOK_LOGIN_PATH = 'https://ms-apps.haaretz.co.il/ms-fb-instant/subscribe/facebook-redirect';
const PARAM_TOKEN = 'account_linking_token';
const PARAM_REDIRECT = 'redirect_uri';


/** Misc ----------------------------------------------- */

const windowError = () => {
  console.warn("could not redirect to facebook login - window is undefined");
}

/**
 * builds and returns the full url for facebook login
 */
const buildRedirectUrl = ({params,}) => {
  return `${FACEBOOK_LOGIN_PATH}?account_linking_token=${token}&subscription_status=${subscription}&publisher_user_id=${userid}&redirect_uri=${redirect}`;
}


/** Exported ------------------------------------------- */

/**
 * returns the facebook's login url for redirection (when reaching login via instant article)
 */
const loginWithFacebook = (params) => {
  if (params && (params.token && params.subscription && params.userid && params.redirect)) {
    return buildRedirectUrl(params);
  } else {
    console.warn("could not redirect to facebook login - missing params");
    return false;
  }
}

/**
 * returns the required params for loginWithFacebook
 */
const getFacebookParams = (subscription = '', userid = '') => {
  if (typeof window !== 'undefined') {
    const params = new URL(window.location).searchParams;
    if(params.get(PARAM_TOKEN)) {
      return {
        token: params.get(PARAM_TOKEN),
        redirect: params.get(PARAM_REDIRECT),
        subscription,
        userid,
      }
    } else {
      return false;
    }
  } else {
    windowError();
  }
}

export { loginWithFacebook, getFacebookParams, };