import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import ToolBar from './elements/ToolBar';
import IconClose from '../Icon/icons/IconClose';
import IconZoomIn from '../Icon/icons/IconZoomIn';

const propTypes = {
  captionElement: PropTypes.node,
  /**
   * The name of the shown item.
   */
  itemName: PropTypes.string.isRequired,
  /**
   * The path to the of the shown item.
   */
  itemUrl: PropTypes.string.isRequired,
  /**
   * A render prop that passes down `isFullScreen` (Boolean).
   */
  render: PropTypes.func.isRequired,
};

const defaultProps = {
  captionElement: null,
};

const containerStyle = ({ isFullScreen, theme, }) => ({
  overflow: 'hidden',
  position: 'relative',
  ...(isFullScreen
    ? {
      backgroundColor: theme.color('neutral'),
      display: 'flex',
      height: '100%',
      position: 'fixed',
      top: '0',
      start: '0',
      end: '0',
      bottom: '0',
      width: '100%',
      zIndex: '6',
      extend: [
        parseComponentProp(
          'flexDirection',
          [
            { until: 's', misc: 'portrait', value: 'column', },
            { from: 's', misc: 'portrait', value: 'row', },
            { until: 'm', misc: 'landscape', value: 'column', },
            { from: 'm', misc: 'landscape', value: 'row', },
          ],
          theme.mq,
          (prop, value) => ({ [prop]: value, })
        ),
      ],
    }
    : {}),
});
const FullScreenContainer = createComponent(containerStyle, 'figure');

const iconStyle = ({ theme, isFullScreen, }) => ({
  backgroundColor: theme.color('neutral'),
  height: '5rem',
  marginBottom: '3rem',
  padding: '1rem',
  width: '100%',
  zIndex: '1',
  ':hover': {
    backgroundColor: theme.color('neutral', '+1'),
  },
  ...(isFullScreen || {
    borderRadius: '50%',
    cursor: 'zoom-in',
    end: '1rem',
    position: 'absolute',
    top: '1rem',
    width: '5rem',
  }),
});

// eslint-disable-next-line react/prop-types
const IconUnstyled = ({ isFullScreen, ...props }) => (
  <FelaComponent
    render={({ theme, }) => {
      const ToggleIcon = isFullScreen ? IconClose : IconZoomIn;
      const label = isFullScreen ? theme.zoomoutText : theme.zoominText;
      return (
        <button {...props} aria-label={label}>
          <ToggleIcon
            color={[ 'neutral', '-10', ]}
            size={2.5}
            miscStyles={{
              display: 'block',
              margin: '0 auto',
            }}
          />
        </button>
      );
    }}
  />
);

const Icon = createComponent(iconStyle, IconUnstyled, props =>
  Object.keys(props)
);

const mediaWrapperStyle = ({ isFullScreen, theme, }) =>
  (isFullScreen
    ? {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      extend: [
        ...theme.mq(
          { from: 's', },
          {
            display: 'flex',
            flexDirection: 'column',
          }
        ),
      ],
    }
    : {});
const MediaWrapper = createComponent(mediaWrapperStyle);

/**
 * This component receives a media component
 * ([Image](./#image), [Video](./#video), [Gallery](./#gallery), etc),
 * and displays it in a full-screen, with it's caption & credit, and some sharing buttons.
 */
class FullScreenMedia extends React.Component {
  state = {
    mediaWidth: null,
    isFullScreen: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mediaWidth: this.mediaRef.offsetWidth,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.mediaWidth !== nextState.mediaWidth ||
      this.state.isFullScreen !== nextState.isFullScreen ||
      this.props.captionElement !== nextProps.captionElement
    );
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.state.isFullScreen) {
      document.addEventListener('keydown', this.handleGlobalKeydown);
    }
    else {
      document.removeEventListener('keydown', this.handleGlobalKeydown);
    }
    /* eslint-enable no-undef */
  }

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.toggleFullScreen();
    }
  };

  toggleFullScreen = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen,
    });
  };

  render() {
    const { render, captionElement, itemName, itemUrl, } = this.props;
    const { isFullScreen, } = this.state;

    return (
      <FullScreenContainer isFullScreen={isFullScreen}>
        {!isFullScreen && (
          <Icon isFullScreen={false} onClick={this.toggleFullScreen} />
        )}
        <div />
        <MediaWrapper
          isFullScreen={isFullScreen}
          innerRef={mediaRef => (this.mediaRef = mediaRef)} // eslint-disable-line no-return-assign
        >
          {render({ isFullScreen, })}
        </MediaWrapper>
        {isFullScreen && (
          <Fragment>
            <FelaComponent
              style={{
                position: 'absolute',
                top: '2rem',
                end: '2rem',
              }}
            >
              <Icon isFullScreen onClick={this.toggleFullScreen} />
            </FelaComponent>
            <ToolBar
              itemName={itemName}
              itemUrl={itemUrl}
              closeButton={
                <Icon isFullScreen onClick={this.toggleFullScreen} />
              }
              captionElement={captionElement}
            />
          </Fragment>
        )}
      </FullScreenContainer>
    );
  }
}

FullScreenMedia.propTypes = propTypes;
FullScreenMedia.defaultProps = defaultProps;

export default FullScreenMedia;
