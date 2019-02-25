/* global window, document, googletag */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import Debug from '../Debug/Debug';

const propTypes = {
  id: PropTypes.string.isRequired,
  audianceTarget: PropTypes.string.isRequired,
  className: PropTypes.string,
  styleRule: PropTypes.func,
};
const defaultProps = {
  className: '',
  styleRule: null,
};

class AdSlotBase extends Component {
  state = {
    shouldRender: false,
    debugJsx: null,
  };

  componentDidMount() {
    if (!this.state.shouldRender) {
      const debugJsx = (
        <Debug>
          AdUnit:
          {this.props.id}
        </Debug>
      );
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, debugJsx, });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !this.state.shouldRender;
  }

  render() {
    if (this.state.shouldRender) {
      const { audianceTarget, miscStyles, } = this.props;
      const styleRule = this.props.styleRule ? this.props.styleRule : {};

      return (
        <React.Fragment>
          {this.state.debugJsx}
          <FelaComponent style={styleRule}>
            {({ className, }) => (
              <FelaComponent
                style={({ theme, }) => ({
                  extend: [
                    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
                  ],
                })}
              >
                {({ className: papiStyles, }) => (
                  <div
                    id={this.props.id}
                    data-audtarget={audianceTarget}
                    className={`js-dfp-ad ${this.props.className || ''} ${className} ${papiStyles}`}
                  />
                )}
              </FelaComponent>
            )}
          </FelaComponent>
        </React.Fragment>
      );
    }
    return null;
  }
}

AdSlotBase.propTypes = propTypes;
AdSlotBase.defaultProps = defaultProps;

export default AdSlotBase;
