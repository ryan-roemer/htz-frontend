import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import { parseStyleProps, } from '@haaretz/htz-css-tools';

import getAction from './actionList';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const buttonPropType = PropTypes.oneOfType([
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    buttonText: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
    buttonStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
    iconStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  }),
  PropTypes.string.isRequired,
]);

/* eslint-disable no-trailing-spaces */
const propTypes = {
  /**
   * Each button can be a string (e.g. 'facebook') or an object with additional attributes
   (e.g. {
  name: 'facebookLogo',
  buttonText: 78,
  iconStyles: {
    color: '#3b5998',
  },
  buttonStyles: {
    backgroundColor: 'pink',
  },
}).
   * the objects 'iconStyles' and 'buttonStyles' will override the global styles
   * ('globalIconsStyles' and 'globalButtonsStyles') **only** for the button they're assigned to.
   * This buttons props may contain a single button (String or Object), an array of buttons
   * (String, Object or both), or an Object with two key: `start` and `end` which may contain a
   * a single button or an array of buttons each, and display the 'start' button/s at the start
   * of the row/column, and the 'end' button/s at the end.
   */
  buttons: PropTypes.oneOfType([
    buttonPropType,
    PropTypes.arrayOf(buttonPropType),
    PropTypes.shape({
      start: PropTypes.oneOfType([
        buttonPropType,
        PropTypes.arrayOf(buttonPropType),
      ]),
      end: PropTypes.oneOfType([
        buttonPropType,
        PropTypes.arrayOf(buttonPropType),
      ]),
    }),
  ]).isRequired,
  /**
   * The name of the element this buttons affect.
   */
  elementName: PropTypes.string,
  /**
   * The path to the element this buttons affect.
   */
  elementUrl: PropTypes.string,
  /**
   * A style prop that will affect all the buttons in this component.
   */
  globalButtonsStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  /**
   * A style prop that will affect all the icons inside the buttons in this component.
   */
  globalIconsStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  /**
   * The size of the buttons Icons (according to the [`Icon`](./#icon) component)
   */
  size: PropTypes.number,
  /**
   * Should the icon's bar be vertical or horizontal (default).
   */
  vertical: PropTypes.bool,
};

const defaultProps = {
  elementName: null,
  elementUrl: null,
  globalButtonsStyles: null,
  globalIconsStyles: null,
  miscStyles: null,
  vertical: false,
  size: 2,
};

const wrapperStyle = ({ vertical, miscStyles, theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  ...(vertical
    ? {
      flexDirection: 'column',
      height: '100%',
    }
    : {}),
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});
const ActionWrapper = createComponent(wrapperStyle);

const ActionButtons = ({
  buttons,
  elementName,
  elementUrl,
  globalButtonsStyles,
  globalIconsStyles,
  miscStyles,
  size,
  vertical,
}) => {
  const getButton = (button, index) => {
    const { buttonStyles, iconStyles, name, } = button;
    const ActionButton = getAction(name || button);
    return (
      <ActionButton
        key={index}
        fontSize={-2}
        // Ben:
        // The 'save action button' style should sent by parent component,
        // but the state if the article is saved or not is from the 'actionList',
        // so for those cases the style is a function to run by 'actionList'.
        // Make sure to add the 'globalButtonsStyles' to that function.
        buttonStyles={
          buttonStyles && typeof buttonStyles === 'function'
            ? {
              func: buttonStyles,
              global: globalButtonsStyles || {},
            }
            : {
              ...(globalButtonsStyles || {}),
              ...(buttonStyles || {}),
            }
        }
        size={size}
        iconStyles={{
          ...(globalIconsStyles || {}),
          ...(iconStyles || {}),
        }}
        elementName={elementName}
        elementUrl={elementUrl}
      />
    );
  };

  const getBatch = (buttonsObj, end) => (buttonsObj instanceof Array
    ? buttonsObj.map((button, index) => getButton(button, index))
    : getButton(buttonsObj));

  return (
    <ActionWrapper vertical={vertical} miscStyles={miscStyles}>
      {!buttons.start ? (
        getBatch(buttons)
      ) : (
        <Fragment>
          {getBatch(buttons.start)}
          {getBatch(buttons.end)}
        </Fragment>
      )}
    </ActionWrapper>
  );
};

ActionButtons.propTypes = propTypes;
ActionButtons.defaultProps = defaultProps;

export default ActionButtons;
