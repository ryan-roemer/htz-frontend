/* global window */
import { Component, } from 'react';
import PropTypes from 'prop-types';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import DFP from '@haaretz/dfp';
import logger from '../../componentsLogger';

export const instance = {};

const initDfpScript = (dfpConfig = {}) => {
  //  Part I: immidiate initialization of DFP ads, like maaavaron
  let q;
  if (dfpConfig) {
    q = new DFP(dfpConfig);
    if (window.location.search.includes('debug')) {
      window.q = q;
    }
    q.initGoogleTag().then(() => {
      // if (typeof AdBlockUtil !== 'undefined' && typeof AdBlockUtil.killadblock === 'function') {
      //   window.addEventListener('adblockDetected', AdBlockUtil.killadblock);
      // }
      window.googletag.pubads().collapseEmptyDivs();
      q.adManager.showAllSlots();
    });
  }
  else {
    throw new Error('Init Part I: dfpConfig is not ready!');
  }
  //  Part II: delayed initialization of DFP ads, rest of ads.
  if (dfpConfig) {
    window.addEventListener('DOMContentLoaded', () => {
      q.initGoogleTag().then(() => {
        q.adManager.showAllSlots();
      });
    });
  }
  else {
    throw new Error('Init Part II: dfpConfig is not ready!');
  }
  //  Part III: delayed initialization of DFP ads, rest of ads.
  if (dfpConfig) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        q.initGoogleTag().then(() => {
          q.adManager.showAllSlots();
        });
      }, 10000);
    });
  }
  else {
    throw new Error('Init Part III: dfpConfig is not ready!');
  }
  return q;
};

export const GET_AD_MANAGER = gql`
  query getDfpConfig($path: String!) {
    page(path: $path) {
      dfpConfig {
        adSlotConfig
        adManagerConfig {
          network
          adUnitBase
        }
        conflictManagementConfig
        impressionManagerConfig
        googleGlobalSettings {
          enableSingleRequest
          enableAsyncRendering
          breakpointType
        }
      }
    }
  }
`;

const propTypes = {
  /** Indicates data loading state */
  loading: PropTypes.bool,
  /** Indicates data error state */
  error: PropTypes.bool,
  /** Indicates the path of the page to get the dfpConfig from */
  path: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  dfpConfig: PropTypes.shape({
    adSlotConfig: PropTypes.shape().isRequired,
    adManagerConfig: PropTypes.shape({
      network: PropTypes.string.isRequired,
      adUnitBase: PropTypes.string.isRequired,
    }).isRequired,
    conflictManagementConfig: PropTypes.shape().isRequired,
    impressionManagerConfig: PropTypes.shape(),
    googleGlobalSettings: PropTypes.shape({
      enableSingleRequest: PropTypes.bool.isRequired,
      enableAsyncRendering: PropTypes.bool.isRequired,
      breakpointType: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
const defaultProps = {
  loading: false,
  error: false,
  dfpConfig: {},
};

class DfpInjector extends Component {
  state = { shouldRender: false, };

  componentDidMount() {
    if (!this.state.shouldRender) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
      const dfpConfig = this.props.dfpConfig;
      try {
        instance.dfp = initDfpScript(dfpConfig);
      }
      catch (e) {
        logger.error(e);
      }
    }
  }

  render() {
    if (this.state.shouldRender) {
      const { loading, error, } = this.props;
      if (loading) {
        return null;
      }
      if (error) {
        logger.error(error);
        return null;
      }
      return null;
    }
    return null;
  }
}

DfpInjector.propTypes = propTypes;
DfpInjector.defaultProps = defaultProps;

export default graphql(GET_AD_MANAGER, {
  options: props => ({
    variables: { path: props.path, },
  }),
  props: ({ data, }) => data.page,
})(DfpInjector);
