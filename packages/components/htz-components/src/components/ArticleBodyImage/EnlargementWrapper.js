// @flow
import React from 'react';
import { rgba, } from '@haaretz/htz-css-tools';

import type { Node, ChildrenArray, } from 'react';

import { FelaComponent, } from 'react-fela';
import IconZoomIn from '../Icon/icons/IconZoomIn';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';

type Props = {
  children: ChildrenArray<Node> | Node,
  onClick?: ?() => void,
  iconText: string,
};

type State = {
  hide: ?boolean,
};

const iconStyle = ({ theme, hide, }: { theme: Object, hide: ?boolean, }): Object => ({
  position: 'absolute',
  top: '1rem',
  end: '1rem',
  backgroundColor: rgba(theme.color('neutral'), 0.8),
  marginBottom: '3rem',
  padding: '1rem',
  opacity: hide ? '0' : '1',
  zIndex: '1',
  borderRadius: '50%',
  overflow: 'hidden',
  extend: [
    { transitionProperty: 'opacity', },
    theme.getDuration('transition', 0),
    theme.getTimingFunction('transition', 'linear'),
  ],
  ':focus': {
    opacity: '1',
  },
});

function Icon({ hide, iconText, }: { hide: ?boolean, iconText: string, }): Node {
  return (
    <FelaComponent style={iconStyle} hide={hide}>
      {({ className, }) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        <button type="button" className={className}>
          <IconZoomIn
            color={[ 'neutral', '-10', ]}
            size={2.5}
            miscStyles={{
              display: 'block',
              margin: '0 auto',
            }}
          />
          <VisuallyHidden>{iconText}</VisuallyHidden>
        </button>
      )}
    </FelaComponent>
  );
}

class EnlargementWrapper extends React.Component<Props, State> {
  static defaultProps = {
    onClick: null,
    iconText: 'לחצו להגדלה',
  };

  state = {
    hide: true,
  };

  toggleHide: boolean => void = hide => this.setState({
    hide,
  });

  render(): Node {
    const { children, onClick, iconText, } = this.props;
    return (
      <FelaComponent
        style={{
          overflow: 'hidden',
          position: 'relative',
          cursor: 'zoom-in',
        }}
      >
        {({ className, }) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className={className}
            onClick={onClick}
            onMouseEnter={() => this.toggleHide(false)}
            onMouseLeave={() => this.toggleHide(true)}
          >
            <Icon isFullScreen={false} hide={this.state.hide} iconText={iconText} />
            {children}
          </div>
        )}
      </FelaComponent>
    );
  }
}

export default EnlargementWrapper;
