import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import IconAvatar from '../../Icon/icons/IconAvatar';

class UserButton extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    onClick: PropTypes.func,
    role: PropTypes.string,
    buttonRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.object, }),
    ]),
  };

  static defaultProps = {
    userName: null,
    onClick: null,
    role: null,
    buttonRef: null,
  };

  state = { isHovered: false, };

  handleMouseEnter = () => this.setState({ isHovered: true, });

  handleMouseLeave = () => this.setState({ isHovered: false, });

  render() {
    const { isHovered, } = this.state;
    const { isOpen, userName, onClick, role, buttonRef, } = this.props;
    return (
      <FelaComponent
        style={(
          {
            theme
          }
        ) => ({
          height: '100%',
          color: theme.color('userMenu', 'iconColor'),
          display: 'flex',
          border: 'none',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          paddingInlineStart: '2rem',
          paddingInlineEnd: '1rem',

          extend: [
            theme.getTransition(1, 'swiftOut'),
            theme.type(-1),
            isOpen || isHovered
              ? {
                backgroundColor: isHovered
                  ? theme.color('userMenu', 'bgHover')
                  : theme.color('userMenu', 'bgOpen'),
                color: theme.color('userMenu', 'textOpenOrHover'),
              }
              : {},
          ]
        })}>{({ className, theme, }) => (
          <button
            ref={buttonRef}
            type="button"
            className={className}
            onClick={onClick}
            role={role}
            aria-expanded={isOpen}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onFocus={this.handleMouseEnter}
            onBlur={this.handleMouseLeave}
          >
            <FelaComponent
              as="span"
              style={{
                paddingBlockStart: '0.4rem',
                color:
                  isHovered || isOpen
                    ? theme.color('userMenu', 'textOpenOrHover')
                    : theme.color('userMenu', 'text'),
                extend: [ theme.getTransition(1, 'swiftOut'), ],
              }}
            >
              {userName ? (
                <FelaComponent
                  as="span"
                  style={{
                    fontWeight: '400',
                  }}
                >
                  {theme.userMenuI18n.buttonText}
                  {','}
                  {' '}
                </FelaComponent>
              ) : null}
              <FelaComponent
                as="span"
                style={{
                  fontWeight: '700',
                }}
              >
                {userName || theme.userMenuI18n.noUserData}
              </FelaComponent>
            </FelaComponent>
            <IconAvatar size={3.5} miscStyles={{ marginRight: '2rem', }} />
          </button>
        )}</FelaComponent>
    );
  }
}

export default UserButton;
