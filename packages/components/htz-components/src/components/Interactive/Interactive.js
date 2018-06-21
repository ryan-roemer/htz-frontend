import React from 'react';
import PropTypes from 'prop-types';
import BeforeAndAfter from './components/BeforeAndAfter';

const propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  elementType: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  contentName: PropTypes.string.isRequired,
  properties: PropTypes.shape({}),
};

const defaultProps = {
  properties: null,
};

const template = new Map([ [ 'com.interactive.beforeafter', BeforeAndAfter, ], ]);

function InteractiveElement(props) {
  const Element = template.get(props.inputTemplate);
  return Element ? (
    <Element {...props} />
  ) : (
    <p>not supported interactive element</p>
  );
}

InteractiveElement.propTypes = propTypes;
InteractiveElement.defaultProps = defaultProps;

export default InteractiveElement;
