import React from 'react';
import PropTypes from 'prop-types'
import { format as formatFn, parse, isValid, } from 'date-fns';
import { createComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

const timePropTypes = {
  /**
   * The Date to format. Can be Date object or String in ISO 8601 formats.
   * For more information about ISO_8601, [read here](http://en.wikipedia.org/wiki/ISO_8601)
   */
  time: PropTypes.oneOfType([ PropTypes.string, PropTypes.instanceOf(Date), ]).isRequired,
  /**
   * The output format for the time prop.<br/>
   * Can be a __string__ or an array of __DateFormatRule__ objects({ from, until, format }).
   * For more details about formatting [read date-fns docs](https://date-fns.org/v1.29.0/docs/format)
   */
  format: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string,
        until: PropTypes.string,
        format: PropTypes.string,
      })
    ),
  ]),
  /**
   * CSS class names provided by Fela
   */
  className: PropTypes.string,
};

const timeDefaultProps = {
  format: 'DD.MM.YYYY HH:mm',
  className: null,
};

/**
/* Date format for the 'datetime' attribute. Also used as the default user date-format
 **/
const MACHINE_READABLE_FORMAT = 'YYYY-MM-DDTHH:mm:00Z';
/**
 *  Reg-ex for date-diffs
 *  [-/+] - defines past or future
 *  [number] - diff amount
 *  [s/m/h/d/y/midnight/noon] - diff unit: second, minute, hour, day, year, midnight, noon
 *
 *  examples:
 *    -3s = 3 seconds ago
 *    -1m = 1 minute ago
 *    -2h = 2 hours ago
 *    +2d = 2 day ahead
 *    +2y = 2 year ahead
 *    -0midnight = midnight of today (00:00)
 *    -0noon = noon of today (12:00)
 */
const TIME_DIFF_REGEXP = /([-+]?\d+)([smhdy]{1})/;

/**
 * Inner util for converting second/minutes/hours/days/years into milliseconds.
 */
const offsetUnitConverters = {
  s: amount => (1000 * amount), // seconds to milli
  m: amount => (60000 * amount), // minutes to milli
  h: amount => (3600000 * amount), // hours to milli
  d: amount => (86400000 * amount), // days to milli
  M: amount => (2629743830 * amount), // months to milli
  y: amount => (31556926000 * amount), // years to milli
}

/**
 * Gets a time with offset from a given time.
 * @param {Date} time - The time object to refer to.
 * @param {String} offset - offset expression to add/reduce from time.
 *
 * @returns {Date} - Date object with offset
 */
function getTimeOffset(time, offset) {
  const match = TIME_DIFF_REGEXP.exec(offset);
  let dateOffset;
  if (match) {
    const [ offset, offsetUnit, ] = [ parseInt(match[1], 10), match[2], ];
    dateOffset = new Date(time.getTime() + offsetUnitConverters[offsetUnit](offset));
  }
  return dateOffset;
}

/**
 * A reducer function for selecting appropriate date-format
 * @param {string} currentFormat - current date-format
 * @param {DateFormatRule} extendedFormatRule - A DateFormatRule that also contains dates for comparison.
 * @returns {string} date-format. If  extendedFormatRule is true, returns the rules format else returns the currentFormat.
 */
function formatReducer(currentFormat, extendedFormatRule) {
  const { from, until, format, now, time} = extendedFormatRule;
  const fromTime = from ? getTimeOffset(now, from) : null;
  const untilTime = until ? getTimeOffset(now, until) : null;

  let selectedFormat;

  // from & until are given and the range is valid
  if ((fromTime && untilTime) && (fromTime <= untilTime) ) {
    selectedFormat = fromTime <= time && time <= untilTime ? format : currentFormat;
  }
  // until is missing. check if current time is after fromTime
  else if (fromTime && !untilTime) {
    selectedFormat = fromTime <= time ? format : currentFormat;
  }
  // from is missing. check if current time is before untilTime
  else if (!fromTime && untilTime) {
    selectedFormat = time <= untilTime ? format : currentFormat;
  }
  // both, from & until are missing. just take the given format.
  else if (!(fromTime && untilTime)) {
    selectedFormat = format;
  }
  else {
    console.error(`Invalid time range [${from} - ${until}].`);
  }
  return selectedFormat;
}

/**
 * Defines a range of time and a date-format to apply for the range.
 * @typedef {Object} DateFormatRule
 * @property {string} from - string defines lower boundary of range. ex': '-2h' => 2 hours ago
 * @property {string} until - string defines upper boundary of range. ex': '+2d' => 2 days ahead
 * @property {string} format - date-format for this range
 */

/**
 * Selects the appropriate time-format according to user configuration.
 * @param {string|DateFormatRule[]} format - A string with date-format Or DateFormatRule array that defines different date-formats for different ranges of time.
 * @returns {string} date-format string
 */
function getFormatting(time, format) {
  let selectedFormat;
  if (typeof format === 'string') {
    selectedFormat = format;
  }
  else if (format instanceof Array) {
    const now = new Date(Date.now()); //I'm sorry for this stupid thing. made it to make testing easier
    selectedFormat = format
      .map(rule => ({ ...rule, now, time, }))
      .reduceRight(formatReducer, MACHINE_READABLE_FORMAT);
  }

  return selectedFormat;
}

function Time({ time, format, className, }) {
  const parsedTime = parse(time);
  if (isValid(parsedTime)) {
    let userFormat = getFormatting(parsedTime, format);
    if (!userFormat) {
      userFormat = MACHINE_READABLE_FORMAT;
    }
    const machineFormattedTime = formatFn(parsedTime, MACHINE_READABLE_FORMAT);
    const formattedTime = formatFn(parsedTime, userFormat);

    return <time dateTime={machineFormattedTime} className={className}>{formattedTime}</time>;
  }
  return '';
}

Time.propTypes = timePropTypes;
Time.defaultProps = timeDefaultProps;

export default Time;

