import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

ListItem.propTypes = {
  /**
   * A node to be rendered inside the <ul><li> dropdown list.
   * Can be any object: such as component, button, href etc...
   */
  children: PropTypes.node.isRequired,
  /**
   * A style object to be used by the <li>.
   */
  // eslint-disable-next-line react/forbid-prop-types
  itemStyle: PropTypes.object.isRequired,
  onTabNext: PropTypes.func,
  onTabPrev: PropTypes.func,
};

ListItem.defaultProps = {
  onTabNext: () => {},
  onTabPrev: () => {},
};

export default function ListItem({ children, itemStyle, onTabNext, onTabPrev, }) {
  return (
    <FelaComponent
      style={itemStyle}
      render={({ className, }) => (
        <li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
          className={className}
          onKeyDown={e => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) onTabPrev(e);
            else onTabNext(e);
          }}
        >
          {children}
        </li>
      )}
    />
  );
}
