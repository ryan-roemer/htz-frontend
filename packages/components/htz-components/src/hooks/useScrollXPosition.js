// @flow
/* globals window */

import * as React from 'react';
import throttleFn from '../utils/throttle';

type ScrollPosition = {
  x: number,
  velocity: number,
};

type ScrollPositionOpts = {
  throttle: number,
};

export default function useScrollXPosition({
  throttle = 100,
}: ScrollPositionOpts = {}): ScrollPosition {
  const isServer = typeof window === 'undefined';
  const initialState: ScrollPosition = {
    x: isServer ? 0 : window.pageXOffset,
    velocity: 0,
  };

  const [ { x, velocity, }, setScroll, ] = React.useState(initialState);

  const handle = throttleFn(() => {
    const newX: number = window.pageXOffset;
    setScroll(preveState => ({
      x: newX,
      velocity: (newX - preveState.x) / (throttle || 1),
    }));
  }, throttle);

  React.useEffect(() => {
    window.addEventListener('scroll', handle);

    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, []);

  return { x, velocity, };
}
