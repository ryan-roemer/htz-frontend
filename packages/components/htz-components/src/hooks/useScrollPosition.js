// @flow
/* globals window */

import * as React from 'react';
import throttleFn from '../utils/throttle';

type ScrollPosition = {
  x: number,
  y: number,
};

type ScrollPositionOpts = {
  throttle: number,
};

export default function useScrollPosition({
  throttle = 100,
}: ScrollPositionOpts = {}): ScrollPosition {
  const isServer = typeof window === 'undefined';
  const initialState: ScrollPosition = {
    x: isServer ? 0 : window.pageXOffset,
    y: isServer ? 0 : window.pageYOffset,
  };

  const [ { x, y, }, setScroll, ] = React.useState(initialState);

  const handle = throttleFn(() => {
    setScroll({
      x: window.pageXOffset,
      y: window.pageYOffset,
    });
  }, throttle);

  React.useEffect(() => {
    window.addEventListener('scroll', handle);

    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, []);

  return { x, y, };
}
