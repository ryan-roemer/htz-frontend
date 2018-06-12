/* global document */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import List from './navigationA11yList';
import IconAccessibility from '../Icon/icons/IconAccessibility';

const wrapperStyle = () => ({
  display: 'inline',
});

const a11yButtonStyle = ({ theme, isOpen, }) => ({
  ...theme.type(-2),
  color: theme.color('navigationA11y', 'text'),
  border: 'none',
  padding: '1rem',
  ...(isOpen && {
    backgroundColor: theme.color('navigationA11y', 'bgOpen'),
    color: theme.color('navigationA11y', 'textOpenOrHover'),
  }),
  ':hover': {
    backgroundColor: theme.color('navigationA11y', 'bgHover'),
    color: theme.color('navigationA11y', 'textOpenOrHover'),
  },
});

/**
 * A menu component for the page header. A component which generate
 * two options: toggle accessibility on apollo link state and report a problem via email
 */
class NavigationA11y extends React.Component {
  componentWillMount() {
    this.setState({
      isOpen: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isOpen !== nextState.isOpen;
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener('click', this.handleGlobalClick);
      document.addEventListener('keydown', this.handleGlobalKeydown);
    }
    else {
      document.removeEventListener('click', this.handleGlobalClick);
      document.removeEventListener('keydown', this.handleGlobalKeydown);
    }
  }

  handleGlobalClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.changeState();
    }
  };

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.changeState();
      this.navButt.focus();
    }
  };

  changeState = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <FelaComponent
        rule={wrapperStyle}
        render={({ theme, className, }) => (
          <div
            ref={wrapper => (this.wrapper = wrapper)} // eslint-disable-line no-return-assign
            className={className}
          >
            <FelaComponent
              rule={a11yButtonStyle}
              isOpen={this.state.isOpen}
              render={({ className, }) => (
                <button
                  className={className}
                  onClick={this.changeState}
                  aria-expanded={this.state.isOpen}
                  ref={navButt => (this.navButt = navButt)} // eslint-disable-line no-return-assign
                >
                  <IconAccessibility size={3} />
                </button>
              )}
            />
            <FelaComponent style={{ position: 'relative', }}>
              {this.state.isOpen && (
                <List
                  theme={theme}
                  items={theme.navigationA11yI18n.menuItems}
                />
              )}
            </FelaComponent>
          </div>
        )}
      />
    );
  }
}

export default NavigationA11y;
