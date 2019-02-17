import React from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { visuallyHidden, } from '@haaretz/htz-css-tools';

const VisuallyHiddenStyled = createComponent(visuallyHidden, 'span', [ 'id', ]);

VisuallyHidden.propTypes = {
  /** ID for the HTML element (to be referenced with the aria-describedby attribute) */
  id: PropTypes.string,
  children: PropTypes.node,
};

VisuallyHidden.defaultProps = {
  id: null,
  children: null,
};

function VisuallyHidden({ id, children, }) {
  return <VisuallyHiddenStyled {...id ? { id, } : {}}>{children}</VisuallyHiddenStyled>;
}
export default VisuallyHidden;
