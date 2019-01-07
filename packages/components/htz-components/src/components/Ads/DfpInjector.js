/* global window */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import DFP, { dfpTargeting, } from '@haaretz/dfp';
import Query from '../ApolloBoundary/Query';
import logger from '../../componentsLogger';
import UserDispenser from '../User/UserDispenser';
import getSectionPairFromLineage from './utils/getSectionsFromLineage';

export const instance = {};
export const adPriorities = {
  high: 'high',
  normal: 'normal',
  low: 'low',
};

const initDfpScript = (pageType, dfpConfig = {}, DEBUG = false) => {
  //  Part I: immidiate initialization of high priority DFP ads, like maaavaron
  let q;
  if (dfpConfig) {
    q = new DFP(pageType, dfpConfig);
    if (DEBUG) {
      window.q = q;
    }

    // if (typeof AdBlockUtil !== 'undefined' && typeof AdBlockUtil.killadblock === 'function') {
    //   window.addEventListener('adblockDetected', AdBlockUtil.killadblock);
    // }
    const displayHighPrioritySlots = () => {
      q.initGoogleTag().then(() => {
        DEBUG
          && logger.info(
            `4. Display slots - calling for display for all ${
              adPriorities.high
            } priority slots`
          );
        q.adManager.showAllSlots(adPriorities.high);
      });
    };

    const displayNormalPrioritySlots = () => {
      q.initGoogleTag().then(() => {
        DEBUG
          && logger.info(
            `4. Display slots - calling for display for all ${
              adPriorities.normal
            } priority slots`
          );
        q.adManager.showAllSlots(adPriorities.normal);
      });
    };

    switch (window.document.readyState) {
      case 'loading':
        window.document.addEventListener('DOMContentLoaded', () => {
          displayHighPrioritySlots();
          displayNormalPrioritySlots();
        });
        break;
      case 'interactive':
        displayHighPrioritySlots();
        displayNormalPrioritySlots();
        break;
      default:
        // 'complete' - no need for event listeners.
        displayHighPrioritySlots();
        displayNormalPrioritySlots();
    }
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
      lineage {
        pathSegment
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
  pageType: PropTypes.string.isRequired,
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
    section: PropTypes.string,
    subSection: PropTypes.string,
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
      const { pageType, dfpConfig, } = this.props;
      try {
        if (window.tomer) {
          console.log('Client Navigation BLa Bla BLa');
        }
        instance.dfp = initDfpScript(pageType, dfpConfig, DEBUG);
        window.tomer = true;
      }
      catch (e) {
        logger.error(e);
      }
    }
  }

  componentWillUnmount() {
    console.log('Destroy Slots');
    // eslint-disable-next-line no-undef
    googletag.destroySlots();
    // this.setState()
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

DfpInjectorWrapper.propTypes = {
  path: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
};

function DfpInjectorWrapper({ path, pageType, }) {
  return (
    <React.Fragment>
      <Query query={GET_AD_MANAGER} variables={{ path, }}>
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) logger.error(error);
          const { dfpConfig, lineage, } = data.page;
          const [ section, subSection, ] = getSectionPairFromLineage(lineage);
          return (
            <DfpInjector
              dfpConfig={{ ...dfpConfig, section, subSection, }}
              path={path}
              pageType={pageType}
            />
          );
        }}
      </Query>
      <UserDispenser
        render={({ user, }) => {
          dfpTargeting.setAnonymousIdKey(user.anonymousId);
          return null;
        }}
      />
    </React.Fragment>
  );
}

export default DfpInjectorWrapper;
