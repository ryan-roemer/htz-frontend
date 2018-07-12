import React from 'react';
import PropTypes from 'prop-types';
import logger from '../../componentsLogger';

const propTypes = {
  children: PropTypes.node.isRequired,
  FallbackComponent: PropTypes.node,
};

const defaultProps = {
  FallbackComponent: null,
};

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
    logger.error(error, info);
  }

  render() {
    const { children, FallbackComponent, } = this.props;
    return this.state.hasError ? (
      FallbackComponent ? (
        <FallbackComponent />
      ) : null
    ) : (
      children
    );
  }
}

ErrorBoundary.propTypes = propTypes;
ErrorBoundary.defaultProps = defaultProps;

export default ErrorBoundary;
