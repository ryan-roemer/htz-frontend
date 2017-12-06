// consts
import bps from './consts/bps';
import btnStyle from './consts/btnStyle';
import inputStyle from './consts/inputStyle';
import fontStacks from './consts/fontStacks';
import getColor from './methods/getColor';
import typeConf from './consts/typeConf';
import cssReset from './consts/cssReset';

// methods
import { getTimingFunction, getTransition, } from './methods/animation';
import pxToRem from './methods/pxToRem';
import typesetter from './methods/typesetter';
import mq from './methods/mq';

export { cssReset, };

/**
 * Haaretz theme component
 *
 * @prop {Object} bps - An immutable [mqoptions](https://haaretz.github.io/htz-frontend/htz-css-tools#mqoptions)
 *   object with breakpoint definitions
 * @prop {Object} bps.width - An immutable
 *   [WidthBpsConfig](https://haaretz.github.io/htz-frontend/htz-css-tools#widthbpsconfig) object with
 *   values of boundary points between named width-breakpoints
 * @prop {Object} bps.misc - An immutable
 *   [MiscBpsConfig](https://haaretz.github.io/htz-frontend/htz-css-tools#miscbpsconfig) object with
 *   values named miscellaneous media-features media queries
 * @prop {Object} btnStyle - An immutable Object with button style definitions
 * @prop {number} btnStyle.borderWidth  - The width of a button's outline, in pixels
 * @prop {string} btnStyle.borderStyle  - The `border-style` of a button's outline
 * @prop {number} btnStyle.radius  - A button's `border-radius`, in pixels.
 * @prop {'rtl'} direction - The application's flow direction
 * @prop {Object} fontStacks - An object containing font-family stacks for different use cases
 * @prop {Object} inputStyle - An immutable Object with input style definitions
 * @prop {number} inputStyle.borderWidth  - The width of an input's outline, in pixels
 * @prop {string} inputStyle.borderStyle  - The `border-style` of an input's outline
 * @prop {number} inputStyle.radius  - An input's `border-radius`, in pixels.
 * @prop {Object} typeConf - An immutable
 *   [TypeConf](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf) object per-breakpoint
 *   typographic and vertical-rhythm values
 * @prop {function} color - A [colorGetter](https://haaretz.github.io/htz-frontend/htz-css-tools#colorgetter)
 *   function for retrieving color values from the predefined color palette.
 * @prop {function} getTransition - A function taking a `duration` step (`number`), an `easing` (`string`)
 *   and a `delay` step (`number`) arguments.
 * @prop {function} getTimingFunction - A function taking a `type` argument, indicating the effect
 *   to which the timing function is applied to (`animation`|`transition`) and an `easing` (`string`)
 *   argument, referring to a named timing-function describing how the intermediate values of the CSS
 *   properties being affected by an animation or transition effect are calculated.
 * @prop {function} mq - A [media-query function](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf),
 *   which intelligently returns a media-query scoped css-in-js object based on breakpoints defined
 *   in `theme.bps`
 * @prop {function} pxToRem - A function that
 *   [converts px values to rem](https://haaretz.github.io/htz-frontend/htz-css-tools#remfunctiontype)
 *   at given breakpoints while accounting to changes in vertical rhythm
 * @prop {function} type - A [Typesetter](https://haaretz.github.io/htz-frontend/htz-css-tools#typesetter)
 *   function that returns a CSS-in-JS object of typographic styles conforming to a global predefined
 *   typographic scale and vertical rhythm
 */
const htzTheme = Object.freeze({
  // Objects
  bps,
  btnStyle,
  direrction: 'rtl',
  fontStacks,
  inputStyle,
  typeConf,

  // Methods
  color: getColor,
  getTransition,
  getTimingFunction,
  mq,
  pxToRem,
  type: typesetter,
});

export default htzTheme;
export { getColor, getTransition, mq, pxToRem, typesetter, };
