/* @flow */
import type { BorderStyle, BorderOptions, } from './types';

/**
 * Utility function to parse the arguments passed to border functions
 *
 * @param optsOrWidth - The width of a border or a BorderOptions object as
 *   the single argument to the function
 * @param [lines] - The number of vertical-rhythm lines the border + padding
 *   should occupy. Mandatory when not passing an object as the first argument
 * @param [style] - The border-style
 * @param [color] - The border-color
 *
 * @private
 */
export default function getBorderOpts(
  optsOrWidth: BorderOptions | string | number,
  lines?: number,
  style?: BorderStyle,
  color?: string
): [number | string, number | void, BorderStyle | void, string | void] {
  const errorMessage = 'You passed invalid arguments to a "border" function';
  if (
    typeof optsOrWidth === 'object' &&
    typeof lines === 'undefined' &&
    typeof style === 'undefined' &&
    typeof color === 'undefined'
  ) {
    if (typeof optsOrWidth.width === 'undefined') {
      throw new Error(errorMessage);
    }
    return [
      optsOrWidth.width,
      optsOrWidth.lines,
      optsOrWidth.style,
      optsOrWidth.color,
    ];
  }
  if (typeof optsOrWidth === 'string' || typeof optsOrWidth === 'number') {
    return [ optsOrWidth, lines, style, color, ];
  }

  throw new Error(errorMessage);
}
