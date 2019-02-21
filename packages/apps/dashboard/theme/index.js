// consts
import bps from './consts/bps';
import cssReset from './consts/cssReset';
import fontStacks from './consts/fontStacks';
import gridStyle from './consts/gridStyle';
import typeConf from './consts/typeConf';

// methods
import getColor from './methods/getColor';
import {
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
  getTransitionString,
} from './methods/animation';
import getMqString from './methods/getMqString';
import getZIndex from './methods/getZIndex';
import pxToRem from './methods/pxToRem';
import typesetter from './methods/typesetter';
import mq from './methods/mq';

export { cssReset, };

const theme = Object.freeze({
  // Constants
  bps,
  direction: 'rtl',
  gridStyle,
  fontStacks,
  typeConf,

  // Methods
  color: getColor,
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
  getTransitionString,
  getMqString,
  getZIndex,
  mq,
  pxToRem,
  type: typesetter,
});

export default theme;
export { bps, fontStacks, getColor, getTransition, mq, pxToRem, typesetter, };
