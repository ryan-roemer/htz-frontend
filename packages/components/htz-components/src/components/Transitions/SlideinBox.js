import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import getTransitionEnd from '../../utils/getTransitionEnd';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';

export default class SlideinBox extends React.Component {
  state = {
    animating: false,
  };

  componentDidMount() {
    this.element
      && this.element.addEventListener(
        getTransitionEnd(this.element),
        this.handleTransitionEnd,
        false
      );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.changeState();
    }
  }

  changeState = () => {
    this.setState(
      prevState => ({
        animating: !prevState.animating,
      }),
      () => {
        this.element
          && this.props.show
          && this.props.focus
          && !this.state.animating
          && this.element.focus();
      }
    );
  };

  handleTransitionEnd(event) {
    if (event.target === this.element) {
      this.changeState();
    }
  }

  render() {
    const { animating, } = this.state;
    const { children, duration, show, direction, maxHeight, position, } = this.props;
    const axis = direction.match(/(ttb|btt)/i) ? 'y' : 'x';
    const tdir = direction.match(/(ttb|ste)/) ? -1 : 1;

    return (
      <FelaComponent
        style={({ theme, }) => ({
          overflow: 'hidden',
          position,
          left: 0,
          right: 0,
          zIndex: theme.getZIndex('above'),
          extend: [
            ...parseStyleProps(show ? { maxHeight, } : { maxHeight: 0.333, }, theme.mq, theme.type),
          ],
          transitionProperty: 'max-height',
          ...theme.getDuration('transition', duration / 2),
          ...theme.getDelay('transition', duration / 2),
          ...theme.getTimingFunction('transition', 'linear'),
          ':before': {
            position: 'absolute',
            display: 'block',
            transitionProperty: 'transform',
            ...theme.getDuration('transition', duration / 2),
            ...theme.getTimingFunction('transition', 'linear'),
            content: '""',
            height: '2px',
            width: '100%',
            backgroundColor: theme.color('primary', '-1'),
            ...(direction === 'btt' ? { bottom: '0', } : { top: '0', }),
            transform: `logical translateX(${show ? 0 : -100}%)`,
            zIndex: 1,
          },
        })}>{({ className, }) => (
          <div className={className} aria-expanded={show} aria-hidden={!show}>
            <FelaComponent
              style={({ theme, }) => ({
                transform: `logical translate${axis}(${tdir * (show ? 0 : 100)}%)`,
                transitionProperty: 'transform',
                ...theme.getDuration('transition', duration / 2),
                ...theme.getDelay('transition', duration / 2),
                ...theme.getTimingFunction('transition', 'linear'),
              })}>{({ className, }) => (
                <div
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={show ? '0' : '-1'}
                  className={className}
                  // eslint-disable-next-line no-return-assign
                  ref={element => (this.element = element)}
                >
                  {!show && !animating ? null : children}
                </div>
              )}</FelaComponent>
          </div>
        )}</FelaComponent>
    );
  }
}

SlideinBox.propTypes = {
  /**
   * The element that should be faded.
   */
  children: PropTypes.node.isRequired,
  /**
   * The duration of the trnasition.
   */
  duration: PropTypes.number,
  /**
   * The trigger of the trnasition.
   */
  show: PropTypes.bool.isRequired,
  /**
   * Is toggle-box is focused when opened
   */
  focus: PropTypes.bool,
  /**
   * Direction of animation. (start-to-end, end-to-start, top-to-bottom, bottom-to-top)
   */
  direction: PropTypes.oneOf([ 'ste', 'ets', 'ttb', 'btt', ]),
  /**
   * Max height of box. A fix number of rythem-units OR array of media-query objects
   * ( { from: bp, until: bp, value: value }).
   */
  maxHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.number.isRequired,
      })
    ),
  ]).isRequired,
  position: PropTypes.oneOf([ 'absolute', 'relative', ]),
};
SlideinBox.defaultProps = {
  duration: 0,
  focus: false,
  direction: 'ttb',
  position: 'relative',
};
