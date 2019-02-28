// @flow

/* globals window */

import * as React from 'react';
import throttleFn from '../utils/throttle';

type ScrollPosition = {
  y: number,
  velocity: number,
};

type ScrollPositionOpts = {
  throttle: number,
};

export default function useScrollYPosition({
  throttle = 100,
}: ScrollPositionOpts = {}): ScrollPosition {
  const isServer = typeof window === 'undefined';
  const initialState: ScrollPosition = {
    y: isServer ? 0 : window.pageYOffset,
    velocity: 0,
  };

  const [ scrollState, setScroll, ] = React.useState(initialState);

  const handle = throttleFn(() => {
    const newY: number = window.pageYOffset;
    setScroll(preveState => ({
      y: newY,
      velocity: (newY - preveState.y) / (throttle || 1),
    }));
  }, throttle);

  React.useEffect(() => {
    window.addEventListener('scroll', handle);

    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, []);

  return scrollState;
}
