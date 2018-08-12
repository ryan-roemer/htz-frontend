/* global window */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
// import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import { getDfpSingleton, } from '@haaretz/dfp';
import logger from '../../componentsLogger';

export const instance = {};
export const adPriorities = {
  high: 'high',
  normal: 'normal',
  low: 'low',
};
const NORMAL_PRIORITY_ADS_DELAY_MS = 0;
const LOW_PRIORITY_ADS_DELAY_MS = 5000;

const initDfpScript = (dfpConfig = {}, DEBUG = false) => {
  //  Part I: immidiate initialization of high priority DFP ads, like maaavaron
  let q;
  if (dfpConfig) {
    q = getDfpSingleton(dfpConfig);
    if (DEBUG) {
      window.q = q;
    }

    // if (typeof AdBlockUtil !== 'undefined' && typeof AdBlockUtil.killadblock === 'function') {
    //   window.addEventListener('adblockDetected', AdBlockUtil.killadblock);
    // }

    q.initGoogleTag().then(dfp => {
      const showSlots = priority => {
        if (DEBUG) {
          logger.info(
            `4. Display slots - calling for display for all ${priority} priority slots`
          );
        }
        dfp.adManager.showAllSlots(priority);
      };

      showSlots(adPriorities.high);
      setTimeout(() => {
        showSlots(adPriorities.normal);
      }, NORMAL_PRIORITY_ADS_DELAY_MS);
      setTimeout(() => {
        showSlots(adPriorities.low);
      }, LOW_PRIORITY_ADS_DELAY_MS);
    });
  }
  else {
    throw new Error('DfpInjectorInit error: dfpConfig is not ready!');
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
      const DEBUG = window.location.search.includes('debug');
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
      const dfpConfig = this.props.dfpConfig;
      try {
        instance.dfp = initDfpScript(dfpConfig, DEBUG);
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

function DfpInjectorWrapper(pathObject) {
  return (
    <Query query={GET_AD_MANAGER} variables={{ path: pathObject.path, }}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        if (error) logger.error(error);
        const { dfpConfig, } = data.page;
        return <DfpInjector dfpConfig={dfpConfig} path={pathObject.path} />;
      }}
    </Query>
  );
}

export default DfpInjectorWrapper;
