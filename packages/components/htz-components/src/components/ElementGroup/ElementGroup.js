import React from 'react';
import PropTypes from 'prop-types';

import useGetComponent from '../../hooks/GetComponentContext/useGetComponent';

const propTypes = {
  contentLists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hideOnSite: PropTypes.bool.isRequired,
  inputTemplate: PropTypes.string.isRequired,
  contentName: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
};

function ElementGroup({ contentLists, }) {
  const getComponent = useGetComponent();
  return contentLists.map(element => {
    const Element = getComponent(element.inputTemplate);
    const { properties, ...elementWithoutProperties } = element;
    return (
      <Element
        key={element.contentId}
        {...elementWithoutProperties}
        {...properties}
      />
    );
  });
}

ElementGroup.propTypes = propTypes;

export default ElementGroup;
