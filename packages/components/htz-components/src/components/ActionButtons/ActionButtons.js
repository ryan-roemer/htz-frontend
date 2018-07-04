import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import gql from 'graphql-tag';

import { border, parseStyleProps, } from '@haaretz/htz-css-tools';

import { Query, Mutation, } from '../ApolloBoundary/ApolloBoundary';
import getIcon from './iconList';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import ButtonGroup from '../Button/ButtonGroup'; // eslint-disable-line import/no-named-as-default
import EventTracker from '../../utils/EventTracker';

const PlatformQuery = gql`
  query GetPlatform {
    platform @client
  }
`;

export const TOGGLE_ZEN = gql`
  mutation ToggleZen {
    toggleZen @client
  }
`;

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
  boxModel: PropTypes.shape({
    hp: PropTypes.number,
    vp: PropTypes.number,
  }),
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
  isFlat: PropTypes.bool,
  /**
   * The size of the buttons Icons (according to the [`Icon`](./#icon) component)
   */
  size: PropTypes.number,
  /**
   * Should the icon's bar be vertical or horizontal (default).
   */
  vertical: PropTypes.bool,
};
/* eslint-enable no-trailing-spaces */

const defaultProps = {
  elementName: null,
  elementUrl: null,
  boxModel: { hp: 3, vp: 1, },
  globalButtonsStyles: null,
  globalIconsStyles: null,
  isFlat: false,
  miscStyles: null,
  vertical: false,
  size: 2,
};

const wrapperStyle = ({ vertical, miscStyles, theme, }) => ({
  display: 'flex',
  flexDirection: vertical ? 'column' : 'row',
  justifyContent: 'space-between',
  ...(vertical && {
    flexDirection: 'column',
    height: '100%',
  }),
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});
const ActionWrapper = createComponent(wrapperStyle);

const buttonStyle = ({ borderStyles, miscStyles, theme, }) => ({
  ...(borderStyles && border(borderStyles)),
  ...miscStyles,
});
const ActionButton = createComponent(buttonStyle, Button, props =>
  Object.keys(props)
);

const buttonTextStyle = () => ({
  marginEnd: '1rem',
});
const ButtonText = createComponent(buttonTextStyle, 'span');

const ActionButtons = ({
  boxModel,
  buttons,
  elementName,
  elementUrl,
  globalButtonsStyles,
  globalIconsStyles,
  isFlat,
  miscStyles,
  size,
  vertical,
}) => {
  const getButton = (button, index) => {
    const { buttonStyles, buttonText, iconStyles, name, } = button;
    return (
      <Mutation mutation={TOGGLE_ZEN}>
        {toggleZen => {
          const icon = getIcon(
            name || button,
            elementName,
            elementUrl,
            toggleZen
          );
          const Icon = icon.component;
          return (
            <Query query={PlatformQuery}>
              {({ loading, error, data, client, }) => {
                if (loading) return <p>loading...</p>;
                if (error) console.log(error);
                const { platform, } = data;
                return (
                  <EventTracker>
                    {({ biAction, }) => (
                      <ActionButton
                        key={index}
                        fontSize={-2}
                        boxModel={boxModel}
                        isFlat={isFlat}
                        miscStyles={{
                          ...(globalButtonsStyles && globalButtonsStyles),
                          ...(buttonStyles && buttonStyles),
                        }}
                        {...(icon.actionTag === 'href'
                          ? { href: icon.action, }
                          : {})}
                        onClick={() => {
                          if (icon.actionTag !== 'href') {
                            icon.action();
                          }
                          biAction({
                            actionCode: icon.bi,
                            additionalInfo: {
                              platform,
                              ...(buttonText
                                ? { NumOfTalkbacks: buttonText, }
                                : {}),
                            },
                          });
                        }}
                      >
                        {buttonText && <ButtonText>{buttonText}</ButtonText>}
                        <Icon
                          size={size}
                          miscStyles={{
                            ...(globalIconsStyles && globalIconsStyles),
                            ...(iconStyles && iconStyles),
                          }}
                        />
                      </ActionButton>
                    )}
                  </EventTracker>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  };

  const getBatch = (buttonsObj, end) =>
    (buttonsObj instanceof Array ? (
      <ButtonGroup isColumn={vertical}>
        {buttonsObj.map((button, index) => getButton(button, index))}
      </ButtonGroup>
    ) : (
      getButton(buttonsObj)
    ));

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
