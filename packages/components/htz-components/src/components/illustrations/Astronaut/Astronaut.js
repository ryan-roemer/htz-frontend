/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

const style = ({ theme, size, }) => ({
  extend: [ parseComponentProp('size', size, theme.mq, setSize), ],
});

function setSize(size, value) {
  return {
    fontSize: `${value}rem`,
  };
}

class Astronaut extends React.Component {
  static propTypes = {
    size: PropTypes.oneOfType([ PropTypes.string, PropTypes.array, ]).isRequired,
    hideAstronaut: PropTypes.bool,
  };

  static defaultProps = {
    hideAstronaut: false,
  };

  // TODO missing isomorphic ID solution is missing: https://github.com/reactjs/rfcs/pull/32
  state = { idSuffix: '', };

  render() {
    const { size, hideAstronaut, } = this.props;
    return (
      <FelaComponent
        size={size}
        rule={style}
        render={({ theme, className, }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 666.8 658.6"
            width="1em"
            height="0.9877024595em"
            className={className}
          >
            <FelaComponent
              style={{
                opacity: '0',
                transform: 'scale(4) translate(-53%,-18%)',
                animationDelay: '1s',
                animationDuration: '5s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                animationName: {
                  '12%': { opacity: '0', },
                  '15%': { opacity: '1', },
                  '45%': {
                    opacity: '1',
                  },
                  '50%': { opacity: '0', },
                  '100%': { opacity: '0', },
                },
              }}
              render={({ className, theme, }) => (
                <circle className={className} fill="#3FA0CB" cx="492" cy="165.9" r="2.2" />
              )}
            />
            <FelaComponent
              style={{
                animationDelay: '1s',
                animationDuration: '5s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                animationName: {
                  '0%': { opacity: '0', },
                  '10%': { opacity: '0', transform: 'scale(1) rotate(0)', },
                  '15%': { opacity: '1', },
                  '40%': { transform: 'scale(1.6) rotate(90deg)', },
                  '50%': { opacity: '0', transform: 'scale(1) rotate(0)', },
                  '100%': { opacity: '0', },
                },
              }}
              render={({ className, theme, }) => (
                <circle className={className} fill="#3FA0CB" cx="608.5" cy="277.5" r="3.5" />
              )}
            />
            <FelaComponent
              style={{
                animationDelay: '1s',
                animationDuration: '5s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                animationName: {
                  '0%': { opacity: '0', },
                  '10%': { opacity: '0', },
                  '15%': { opacity: '1', },
                  '40%': { opacity: '0', },
                  '100%': { opacity: '0', },
                },
              }}
              render={({ className, theme, }) => (
                <circle className={className} fill="#BED3DE" cx="176" cy="171" r="4.6" />
              )}
            />
            <FelaComponent
              style={{
                animationDelay: '2s',
                animationDuration: '4s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                animationName: {
                  '0%': { opacity: '0', },
                  '10%': { opacity: '0', },
                  '15%': { opacity: '1', transform: 'scale(1)', },
                  '40%': { transform: 'scale(1.3)', },
                  '50%': { opacity: '0', transform: 'scale(1.3)', },
                  '51%': { transform: 'scale(1)', },
                  '100%': { opacity: '0', },
                },
              }}
              render={({ className, theme, }) => (
                <circle className={className} fill="#3FA0CB" cx="106" cy="183" r="2" />
              )}
            />
            <FelaComponent
              style={{
                animationDuration: '4.5s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                animationName: {
                  '0%': { opacity: '0', },
                  '10%': { opacity: '0', },
                  '15%': { opacity: '1', transform: 'scale(1)', },
                  '40%': { transform: 'scale(1.3)', },
                  '50%': { opacity: '0', transform: 'scale(1)', },
                  '100%': { opacity: '0', },
                },
              }}
              render={({ className, theme, }) => (
                <circle className={className} fill="#3FA0CB" cx="548.5" cy="181.5" r="1.5" />
              )}
            />
            <g className="astronaut-stars">
              <circle fill="#3FA0CB" cx="596.5" cy="261.5" r="2.5" />
              <circle fill="#3FA0CB" cx="555" cy="226" r="1" />
              <circle fill="#3FA0CB" cx="40" cy="311" r="3" />
              <path
                fill="#3FA0CB"
                d="M42 347c0 0-0.7 0-1.5 0s-1.5 0-1.5 0 0.7 0 1.5 0S42 347 42 347z"
              />
              <circle fill="#3FA0CB" cx="129" cy="561" r="2" />
              <circle fill="#3FA0CB" cx="386" cy="631" r="1" />
              <circle fill="#3FA0CB" cx="350" cy="646" r="1" />
              <circle fill="#3FA0CB" cx="300" cy="640" r="2" />
              <circle fill="#3FA0CB" cx="161.5" cy="600.5" r="2.5" />
              <circle fill="#3FA0CB" cx="59.5" cy="422.5" r="1.5" />
              <circle fill="#3FA0CB" cx="38" cy="385" r="2" />
              <circle fill="#3FA0CB" cx="90.5" cy="270.5" r="1.5" />
              <circle fill="#3FA0CB" cx="69" cy="309" r="2" />
              <circle fill="#3FA0CB" cx="62.5" cy="272.5" r="1.5" />
              <circle fill="#3FA0CB" cx="127" cy="232" r="1.5" />
              <circle fill="#3FA0CB" cx="165.5" cy="199" r="1.5" />
              <circle fill="#3FA0CB" cx="166" cy="154" r="2" />
              <circle fill="#3FA0CB" cx="397.5" cy="112.5" r="1.5" />
              <circle fill="#3FA0CB" cx="380" cy="73" r="2" />
              <rect x="183" y="100" fill="#3FA0CB" width="3" height="3" />
              <rect x="149" y="135" fill="#3FA0CB" width="3" height="3" />
              <rect x="601" y="345" fill="#3FA0CB" width="3" height="3" />
              <rect x="525" y="556" fill="#3FA0CB" width="3" height="3" />
              <polygon fill="#3FA0CB" points="492 598 490 598 490 598 " />
              <rect x="385" y="139" fill="#3FA0CB" width="3" height="3" />
              <rect x="518" y="163" fill="#3FA0CB" width="3" height="3" />
              <circle fill="#3FA0CB" cx="592.5" cy="376.5" r="1.5" />
              <circle fill="#3FA0CB" cx="580.5" cy="290.5" r="1.5" />
              <path fill="#3FA0CB" d="M558 239c0 0-0.4 0-1 0s-1 0-1 0 0.4 0 1 0S558 239 558 239z" />
              <circle fill="#3FA0CB" cx="224" cy="617" r="2" />
              <circle fill="#3FA0CB" cx="196" cy="608" r="2" />
              <circle fill="#3FA0CB" cx="245" cy="636" r="1" />
              <path
                fill="#3FA0CB"
                d="M39.4 357.7c0 0 24.9 19.7 23.5 20.2C61.6 378.3 41.2 357.5 39.4 357.7z"
              />
              <circle fill="#3FA0CB" cx="65.6" cy="379.9" r="0.7" />
              <circle fill="#3FA0CB" cx="85.2" cy="520.8" r="1" />
              <circle fill="#3FA0CB" cx="118.9" cy="534.6" r="0.9" />
              <circle fill="#3FA0CB" cx="64.9" cy="406.6" r="1.1" />
              <circle fill="#3FA0CB" cx="78.8" cy="416.2" r="0.8" />
              <circle fill="#3FA0CB" cx="77.2" cy="433" r="1.2" />
              <circle fill="#3FA0CB" cx="91.5" cy="456.8" r="0.5" />
              <circle fill="#3FA0CB" cx="534.1" cy="222.2" r="1.1" />
              <circle fill="#3FA0CB" cx="498" cy="189.4" r="1.1" />
              <circle fill="#3FA0CB" cx="481.9" cy="180.4" r="0.8" />
              <circle fill="#3FA0CB" cx="420.4" cy="130.4" r="0.5" />
              <circle fill="#3FA0CB" cx="425.1" cy="112.6" r="1.4" />
              <circle fill="#3FA0CB" cx="399.6" cy="94.3" r="1.6" />
              <circle fill="#3FA0CB" cx="382.7" cy="122.7" r="1.1" />
              <circle fill="#3FA0CB" cx="412.5" cy="153.1" r="1.9" />
              <circle fill="#3FA0CB" cx="431.6" cy="142.1" r="1.4" />
              <circle fill="#3FA0CB" cx="542" cy="204.4" r="0.8" />
              <circle fill="#3FA0CB" cx="447.7" cy="124.4" r="2.2" />
              <circle fill="#3FA0CB" cx="131.9" cy="185" r="1.1" />
              <circle fill="#3FA0CB" cx="610.6" cy="404.2" r="1.6" />
              <circle fill="#3FA0CB" cx="545.5" cy="523.3" r="1.1" />
              <path
                fill="#3FA0CB"
                d="M555.7 510.1c0.8 0 1.4 0.6 1.4 1.4s-0.6 1.4-1.4 1.4 -1.4-0.6-1.4-1.4S554.9 510.1 555.7 510.1z"
              />
              <circle fill="#3FA0CB" cx="554.6" cy="519.7" r="0.8" />
              <circle fill="#3FA0CB" cx="564.9" cy="499.5" r="1.4" />
              <circle fill="#3FA0CB" cx="558.7" cy="496.5" r="1.1" />
              <circle fill="#3FA0CB" cx="533" cy="533.7" r="1.1" />
              <circle fill="#3FA0CB" cx="103.2" cy="507.2" r="1.4" />
              <path fill="#3FA0CB" d="M587 233c0 0-36 22-30 22" />
              <circle fill="#3FA0CB" cx="448.6" cy="589.4" r="1" />
              <circle fill="#3FA0CB" cx="471.8" cy="581.2" r="1.7" />
              <circle fill="#3FA0CB" cx="416.2" cy="614.2" r="2" />
              <circle fill="#3FA0CB" cx="405.3" cy="611.5" r="1.4" />
              <circle fill="#3FA0CB" cx="417.9" cy="603" r="1.7" />
              <circle fill="#3FA0CB" cx="383.1" cy="612.5" r="1" />
              <circle fill="#3FA0CB" cx="157.8" cy="557" r="1.4" />
              <circle fill="#3FA0CB" cx="575.1" cy="385.8" r="1.4" />
              <circle fill="#3FA0CB" cx="573" cy="417.2" r="2.7" />
              <circle fill="#3FA0CB" cx="568.2" cy="329.2" r="1.4" />
              <circle fill="#3FA0CB" cx="84.1" cy="344.9" r="2" />
              <circle fill="#3FA0CB" cx="139" cy="582" r="3" />
              <circle fill="#B9E3F6" cx="26" cy="408" r="11.5" />
              <FelaComponent
                style={{
                  transform: 'rotate(-1deg) translate(0, 2%)',
                  animationDuration: '3s',
                  animationTimingFunction: 'linear',
                  animationDirection: 'alternate',
                  animationIterationCount: 'infinite',
                  animationName: {
                    '0%': { transform: 'rotate(1deg) translate(0,-1%)', },
                    '100%': { transform: 'rotate(-1deg) translate(0,1%)', },
                  },
                }}
                render={({ className, theme, }) => (
                  <g className={className}>
                    <circle fill="#087EB5" cx="610.7" cy="459.5" r="22.2" />
                    <path
                      fill="#087EB5"
                      d="M617 460.7c0-0.6 0-1.1 0-1.1S617 460 617 460.7c0 0.6 0 1.1 0 1.1S617 461.3 617 460.7zM613.7 463.1c-15.7 6-23.5 6.9-23.5 6.9s-6.3 1.4-7.1 0.3c-0.6-0.8 6.5-3.9 6.5-3.9l-0.5-1.7c0 0-21.2 10-20.2 13 0.7 2.2 13.1 4.7 46.8-6.9 19.2-6.6 41.2-21.6 39.3-25.8 -1.4-3-24.7 4.1-24.7 4.1l1.1 2.3c0 0 4.5-1.4 5.2-0.5C637.8 452.5 623.9 459.2 613.7 463.1zM630.8 450.3c0 0 20.1-5.1 19.4-2.9 -0.7 2.2-11 11.4-33.7 21.1s-48.7 11.1-42.3 6 14.9-9.7 14.9-9.7 -14.7 9.3-7.9 8.6c6.8-0.7 18.3-2.6 33.3-9 0 0 31.6-14.2 25.9-14.7C637.5 449.5 630.8 450.3 630.8 450.3zM579.5 471.4c0 0-5.5 3.3-3 4.1s15.5 0.6 37.1-7.7c32.9-12.7 44-25 17.2-17.5 0 0 15-3.3 12.1 0.1 -3.6 4.1-17.2 11-31.1 16.5C597.2 472.8 570.3 477.5 579.5 471.4z"
                    />
                  </g>
                )}
              />
              <circle fill="#96D4F1" cx="580.6" cy="483.2" r="0.5" />
              <circle fill="#96D4F1" cx="643.2" cy="461.3" r="0.4" />
              <circle fill="#96D4F1" cx="633.7" cy="432.1" r="2" />
              <circle fill="#96D4F1" cx="585.3" cy="435.4" r="0.5" />
              <circle fill="#DCF1FB" cx="130.9" cy="293.4" r="36" />
              <path
                fill="#A9E2FF"
                d="M100.8 284.9c0 0-2.6 7.2 0.7 4.6C104.7 286.8 102.7 282.3 100.8 284.9zM138.7 269.4c-2-0.7-2.6 4.6 0 3.3C141.3 271.3 138.7 269.4 138.7 269.4zM116.5 324.5c0 0 0.9 1.5 2.1 0.9C119.8 324.7 116.7 323.6 116.5 324.5zM167.3 298.1c0 0-1.4 2.6-0.2 2.2S168.5 296.9 167.3 298.1zM144 302.1c0 0-2.1 0.9-0.5 0.9S145.4 301.9 144 302.1zM141.1 324.7c0 0-1.5 1.2-0.2 1.2C142.3 325.9 142.7 324.7 141.1 324.7zM121.3 262.3c0 0-1.5 0.7-2.1 1.5C118.7 264.7 123.4 261.6 121.3 262.3z"
              />
              <circle
                id={`SVGID_1_${this.state.idSuffix}`}
                fill="#527B95"
                cx="66"
                cy="473"
                r="16.4"
              />
              <defs>
                <circle id={`SVGID_12_${this.state.idSuffix}`} cx="66" cy="473" r="16.4" />
              </defs>
              <clipPath id={`SVGID_14_${this.state.idSuffix}`}>
                <use xlinkHref={`#SVGID_12_${this.state.idSuffix}`} overflow="visible" />
              </clipPath>
              <path
                clipPath={`url(#SVGID_14_${this.state.idSuffix})`}
                fill="#B9E3F6"
                d="M64 459.5c0 0-3.8 1-4.6 2.5s-0.8 3.1-0.2 3.8c0.6 0.8-0.8 2.9-1.5 3.1 -0.8 0.2-4.2 2.1-4.2 3.1s0.8 2.7 0.8 2.7 1.3 1.9 0.8 1.9c-0.6 0 6.5 1.7 5.2 2.9 -1.3 1.2 0.2 2.1 1.9 2.3 1.7 0.2 4 1.5 2.1 2.9 -1.9 1.3 1.3 1.7 0.4 2.1 -1 0.4 1.4 2.7 1.4 2.7s-6.8-1.3-7.8-3.1c-1-1.7-0.2-2.7-1.3-3.3s1.3-3.6 0-3.8 -6.7-1.5-6.5-2.7 -1.3-2.3-0.8-3.5c0.6-1.2-1.3-7.8 0.4-8.7 1.7-1 6.3-5.6 7.7-4.8C59 460.2 64 459.5 64 459.5z"
              />
              <defs>
                <circle id={`SVGID_16_${this.state.idSuffix}`} cx="66" cy="473" r="16.4" />
              </defs>
              <clipPath id={`SVGID_18_${this.state.idSuffix}`}>
                <use xlinkHref={`#SVGID_16_${this.state.idSuffix}`} overflow="visible" />
              </clipPath>
              <path
                clipPath={`url(#SVGID_18_${this.state.idSuffix})`}
                fill="#B9E3F6"
                d="M76.8 461.2c-0.8 0-5 1.2-3.3 1.5 1.7 0.4 4.6 1 4 1.5s-0.4 1.5-2.1 1.9 -4.6-1.2-5-0.2 0.2 2.3 1 2.5 3.1 2.7 4.4 2.7 3.8 0.8 2.5 2.1c-1.3 1.3-2.9 2.7-2.3 3.3 0.6 0.6 1.3 6.1 2.5 5.8 1.2-0.4 1-1.9 1.7-2.7 0.8-0.8 1.3-0.8 2.3-1.3s1.3-2.3 1.2-3.8c-0.2-1.5 0.8-2.9 1-5s-0.2-7.5-1.5-8.8 -2.5-4-3.6-3.5C78.4 457.8 76.8 461.2 76.8 461.2z"
              />
              <defs>
                <circle id={`SVGID_19_${this.state.idSuffix}`} cx="66" cy="473" r="16.4" />
              </defs>
              <clipPath id={`SVGID_20_${this.state.idSuffix}`}>
                <use xlinkHref={`#SVGID_19_${this.state.idSuffix}`} overflow="visible" />
              </clipPath>
              <path
                clipPath={`url(#SVGID_20_${this.state.idSuffix})`}
                fill="#B9E3F6"
                d="M68 459.9c0 0-1.3 1.5-0.2 1.2C69 460.6 68.6 459.9 68 459.9z"
              />
              <defs>
                <circle id={`SVGID_21_${this.state.idSuffix}`} cx="66" cy="473" r="16.4" />
              </defs>
              <clipPath id={`SVGID_22_${this.state.idSuffix}`}>
                <use xlinkHref={`#SVGID_21_${this.state.idSuffix}`} overflow="visible" />
              </clipPath>
              <path
                clipPath={`url(#SVGID_22_${this.state.idSuffix})`}
                fill="#B9E3F6"
                d="M62.8 469.3c0 0-2.1 1.2-0.6 1.2C63.8 470.4 62.8 469.3 62.8 469.3z"
              />
              <defs>
                <circle id={`SVGID_23_${this.state.idSuffix}`} cx="66" cy="473" r="16.4" />
              </defs>
              <clipPath id={`SVGID_24_${this.state.idSuffix}`}>
                <use xlinkHref={`#SVGID_23_${this.state.idSuffix}`} overflow="visible" />
              </clipPath>
              <path
                clipPath={`url(#SVGID_24_${this.state.idSuffix})`}
                fill="#B9E3F6"
                d="M70.9 485.6c0 0 1.3 1.3 1.3 0.4C72.2 485 71.5 485.8 70.9 485.6z"
              />
              <defs>
                <circle id={`SVGID_25_${this.state.idSuffix}`} cx="66" cy="473" r="16.4" />
              </defs>
              <clipPath id={`SVGID_26_${this.state.idSuffix}`}>
                <use xlinkHref={`#SVGID_25_${this.state.idSuffix}`} overflow="visible" />
              </clipPath>
              <path
                clipPath={`url(#SVGID_26_${this.state.idSuffix})`}
                fill="#B9E3F6"
                d="M64 478.7c0 0 1.3 1.3 1.3 0.4C65.3 478.1 64.6 478.8 64 478.7z"
              />
              <path
                fill="#3FA0CB"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                d="M587.3 332.8c0 0 2.4 2.9 5.3 2.7s11.7-3.9 9.5-6.3C600 326.7 591.6 329.6 587.3 332.8zM554.3 302.2l-6.8 13.1c0 0 28.6 6.2 29 5.5 0.4-0.8 7.2-14.5 7.2-14.5L554.3 302.2z"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="559.7"
                y1="303.5"
                x2="554"
                y2="316.4"
              />
              <path
                fill="#3FA0CB"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                d="M566.2 304.4c-0.4 1-5.1 13.6-5.1 13.6M574.3 306.3c-0.4 1-5.1 13.6-5.1 13.6M579 322c0 0 5.2 10.4 5.9 10.3s8.8 2.1 8.8 2.1l9.6-5.8 -3.9-11.9 -10.1-0.1L579 322zM571.5 306.8c0 0 7.7 14.5 8.4 14.4s8 1.2 8 1.2l9.6-5.8 -4.3-16.4 -11.1-0.7L571.5 306.8zM597.9 307.2c-0.9 0.1-7.2 14.3-7.2 14.3l47 8.4 6.9-18L597.9 307.2z"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="607.6"
                y1="308.5"
                x2="601.2"
                y2="323.2"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="619.9"
                y1="309.4"
                x2="612.9"
                y2="325.4"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="632.3"
                y1="310.8"
                x2="625.5"
                y2="327.4"
              />
              <path
                fill="#3FA0CB"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                d="M579.2 300.3c-1 0.3-10.8 5.4-3 5.8 7.8 0.3 10.8-2.1 12.5-3.1s3-4.4-1.4-4.4C582.9 298.6 579.2 300.3 579.2 300.3z"
              />
              <polyline
                fill="#3FA0CB"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                points="581 322.8 588.5 324.3 593.7 334.4 "
              />
              <path
                fill="#3FA0CB"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                d="M581.7 300.4c0 0-8.6 4-5.7 4.1 7 0.1 14.6-3.4 12.3-4.4C586.2 299.1 584.1 299.7 581.7 300.4z"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="582.2"
                y1="308.5"
                x2="587.2"
                y2="320.3"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="594.3"
                y1="313"
                x2="590.2"
                y2="312.4"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="582.3"
                y1="307.3"
                x2="593.8"
                y2="301.1"
              />
              <line
                fill="none"
                stroke="#2F4856"
                strokeWidth="0.5"
                strokeMiterlimit="10"
                x1="572.5"
                y1="307.4"
                x2="581.2"
                y2="308.6"
              />
              <FelaComponent
                style={{
                  transform: 'translate(1%) rotate(-56deg)',
                  animationDelay: '0.5s',
                  animationDuration: '30s',
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'linear',
                  animationDirection: 'forwards',
                  animationName: {
                    '0%': { transform: 'translate(1%) rotate(-56deg)', },
                    '45%': { opacity: '1', },
                    '70%': {
                      opacity: '0',
                      transform: 'translate(0%) rotate(15deg)',
                    },
                    '100%': {
                      opacity: '0',
                      transform: 'translate(0%) rotate(15deg)',
                    },
                  },
                }}
                render={({ theme, className, }) => (
                  <g className={className}>
                    <circle
                      id={`SVGID_3_${this.state.idSuffix}`}
                      fill="#BED3DE"
                      cx="83"
                      cy="227"
                      r="23.5"
                    />
                    <defs>
                      <circle id={`SVGID_27_${this.state.idSuffix}`} cx="83" cy="227" r="23.5" />
                    </defs>
                    <clipPath id={`SVGID_28_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_27_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <path
                      clipPath={`url(#SVGID_28_${this.state.idSuffix})`}
                      fill="#6AA2BF"
                      d="M62.6 207.7c7.4-3.2 26.3-11.8 34.3 13.7 4.6 14.6 3 26.5-14 34.5 -8.2 3.9-26.3 0.8-28.7-3.8C49.3 243.2 40 217.4 62.6 207.7z"
                    />
                  </g>
                )}
              />
              <polyline fill="#2F4856" points="87.5 215.9 87.6 215.9 88.3 216.1 87.3 217 " />
              <path
                fill="#BED3DE"
                d="M73.6 243.5c0 0-0.6 1.3 0.6 1C75.3 244.2 74.3 242.9 73.6 243.5zM88.3 208.5c0 0-1 1.3 1.3 1.3M84.5 205.4c0 0 1.4-0.4 1.3 0.6M98.1 243.2c0 0 2.2 0 0.3 1.4M67.1 216.3c0 0-0.7 1 0 0.9C67.8 217 67.7 215.7 67.1 216.3zM97 236.5c0 0-0.7 1.3 0 1C97.8 237.2 97.8 236 97 236.5zM75.7 218.6c0 0-0.6 1 0.3 0.7S76.3 218 75.7 218.6zM88.8 247.8c0 0-1.2 0.9-0.1 0.7C89.7 248.4 89.7 247.7 88.8 247.8z"
              />
              <circle fill="#A9E2FF" cx="39" cy="243" r="1" />
              <circle fill="#A9E2FF" cx="85.5" cy="165.5" r="1.5" />
              <circle fill="#A9E2FF" cx="619" cy="260" r="3" />
              <circle fill="#A9E2FF" cx="602" cy="203" r="2" />
              <path
                fill="#A9E2FF"
                d="M568 173c0 0.6 0 1 0 1S568 173.6 568 173s0-1 0-1S568 172.4 568 173z"
              />
              <circle fill="#A9E2FF" cx="486.5" cy="92.5" r="1.5" />
              <circle fill="#A9E2FF" cx="415" cy="57" r="2" />
              <circle fill="#A9E2FF" cx="185.5" cy="75.5" r="3.5" />
              <circle fill="#A9E2FF" cx="126.5" cy="116.5" r="2.5" />
              <circle fill="#A9E2FF" cx="544" cy="577" r="3" />
              <circle fill="#A9E2FF" cx="601" cy="507" r="3" />
              <circle fill="#A9E2FF" cx="494" cy="611" r="2" />
              <circle fill="#A9E2FF" cx="168.5" cy="627.5" r="2.5" />
              <circle fill="#A9E2FF" cx="83.5" cy="544.5" r="3.5" />
              <circle fill="#A9E2FF" cx="33" cy="448" r="2" />
              <circle fill="#A9E2FF" cx="11" cy="331" r="2" />
              <circle fill="#A9E2FF" cx="30.5" cy="279.5" r="1.5" />
              <circle fill="#A9E2FF" cx="67" cy="195" r="2" />
              <circle fill="#A9E2FF" cx="561" cy="158" r="3" />
              <circle fill="#A9E2FF" cx="583.5" cy="531.2" r="0.8" />
              <circle fill="#A9E2FF" cx="590.6" cy="501.2" r="1.4" />
              <circle fill="#A9E2FF" cx="630.5" cy="408.3" r="0.8" />
              <circle fill="#A9E2FF" cx="619.9" cy="384.5" r="1.1" />
              <circle fill="#A9E2FF" cx="622.6" cy="367.5" r="1.1" />
            </g>
            <FelaComponent
              style={{
                transformOrigin: 'center',
                animationDuration: '20s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDirection: 'alternate',
                animationName: {
                  '0%': { transform: 'translate(0,0) rotate(0deg)', },
                  '20%': { transform: 'translate(0,1%) rotate(3deg)', },
                  '22%': { transform: 'translate(0,1%) rotate(3deg)', },
                  '50%': { transform: 'translate(1%,0) rotate(0deg)', },
                  '70%': { transform: 'translate(0,-1%) rotate(-3deg)', },
                  '73%': { transform: 'translate(0,-1.2%) rotate(-3deg)', },
                  '100%': { transform: 'translate(0,0) rotate(0deg)', },
                },
              }}
              render={({ className, }) => (
                <g className={className}>
                  <g className="astronaut-planet">
                    <circle
                      id={`SVGID_5_${this.state.idSuffix}`}
                      fill="#087EB5"
                      cx="326.9"
                      cy="377.2"
                      r="236.1"
                    />
                    <defs>
                      <circle
                        id={`SVGID_29_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_30_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_29_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <path
                      opacity="0.6"
                      clipPath={`url(#SVGID_30_${this.state.idSuffix})`}
                      fill="#35515E"
                      enableBackground="new    "
                      d="M173.7 575.1c183.7 76.6 366.2-37 367.5-197.8 1.4-177.4-143.8-219.7-187.3-222.7 -43.4-2.9-16.9-36.4 30.3-31.3 47.2 5.1 289.6 188.8 199.1 354.7s-120 141.7-215.7 152c-95.7 10.2-204.2-53.6-204.2-53.6l11.5-11.5"
                    />
                    <defs>
                      <circle
                        id={`SVGID_31_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_32_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_31_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <path
                      opacity="0.3"
                      clipPath={`url(#SVGID_32_${this.state.idSuffix})`}
                      fill="#35515E"
                      enableBackground="new    "
                      d="M62.8 423.9c0 0 39.6 158.7 239.2 155.1 159.8-2.9 270.6-95.6 289.9-179.4 23.6-102.2-2.8 234.4-257.2 246.8S68.8 495.3 57.4 458.2 62.8 423.9 62.8 423.9z"
                    />
                    <defs>
                      <circle
                        id={`SVGID_33_${this.state.idSuffix}`}
                        cx="49.1"
                        cy="488.6"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_34_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_33_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <ellipse
                      transform="matrix(0.1224 -0.9925 0.9925 0.1224 -365.2786 766.9171)"
                      clipPath={`url(#SVGID_34_${this.state.idSuffix})`}
                      fill="#055F88"
                      cx="251"
                      cy="590"
                      rx="3.8"
                      ry="7.8"
                    />
                    <defs>
                      <circle
                        id={`SVGID_35_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_36_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_35_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <circle
                      opacity="0.3"
                      clipPath={`url(#SVGID_36_${this.state.idSuffix})`}
                      fill="#6D1002"
                      enableBackground="new    "
                      cx="135.7"
                      cy="482.2"
                      r="2.6"
                    />
                    <defs>
                      <circle
                        id={`SVGID_37_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_38_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_37_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <circle
                      clipPath={`url(#SVGID_38_${this.state.idSuffix})`}
                      fill="#3998C4"
                      cx="491.4"
                      cy="367"
                      r="2"
                    />
                    <defs>
                      <circle
                        id={`SVGID_39_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_40_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_39_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <circle
                      clipPath={`url(#SVGID_40_${this.state.idSuffix})`}
                      fill="#3998C4"
                      cx="184.7"
                      cy="305"
                      r="1.7"
                    />
                    <defs>
                      <circle
                        id={`SVGID_41_${this.state.idSuffix}`}
                        cx="502.6"
                        cy="607.8"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_42_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_41_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <ellipse
                      transform="matrix(0.0961 -0.9954 0.9954 0.0961 95.7616 896.9802)"
                      clipPath={`url(#SVGID_42_${this.state.idSuffix})`}
                      fill="#077EB5"
                      cx="541.7"
                      cy="395.8"
                      rx="16"
                      ry="3.8"
                    />
                    <defs>
                      <circle
                        id={`SVGID_43_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_44_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_43_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <path
                      opacity="0.3"
                      clipPath={`url(#SVGID_44_${this.state.idSuffix})`}
                      fill="#043F5B"
                      enableBackground="new    "
                      d="M212 493c0 0-4 11 7 20s20 5 21-3S231 479 212 493z"
                    />
                    <defs>
                      <circle
                        id={`SVGID_45_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_46_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_45_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <path
                      opacity="0.3"
                      clipPath={`url(#SVGID_46_${this.state.idSuffix})`}
                      fill="#6D1002"
                      enableBackground="new    "
                      d="M130.9 329.4c0 0-7.9 7.6-2.9 10.6C133 343 136.8 325.9 130.9 329.4z"
                    />
                    <defs>
                      <circle
                        id={`SVGID_47_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_48_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_47_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <path
                      opacity="0.6"
                      clipPath={`url(#SVGID_48_${this.state.idSuffix})`}
                      fill="#055F88"
                      enableBackground="new    "
                      d="M495 243c0 0-9-14-7-4S497 250 495 243z"
                    />
                    <defs>
                      <circle
                        id={`SVGID_49_${this.state.idSuffix}`}
                        cx="326.9"
                        cy="377.2"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_50_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_49_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <path
                      opacity="0.6"
                      clipPath={`url(#SVGID_50_${this.state.idSuffix})`}
                      fill="#055F88"
                      enableBackground="new    "
                      d="M477 505c0 0-13 11-5 9S487 501 477 505z"
                    />
                    <defs>
                      <circle
                        id={`SVGID_51_${this.state.idSuffix}`}
                        cx="413.8"
                        cy="637.9"
                        r="236.1"
                      />
                    </defs>
                    <clipPath id={`SVGID_52_${this.state.idSuffix}`}>
                      <use xlinkHref={`#SVGID_51_${this.state.idSuffix}`} overflow="visible" />
                    </clipPath>
                    <ellipse
                      transform="matrix(0.274 -0.9617 0.9617 0.274 -38.5863 848.9059)"
                      opacity="0.6"
                      clipPath={`url(#SVGID_52_${this.state.idSuffix})`}
                      fill="#3998C4"
                      enableBackground="new    "
                      cx="543"
                      cy="450"
                      rx="8.2"
                      ry="2"
                    />
                  </g>
                  {hideAstronaut ? null : (
                    <g className="astronaut-astronaut">
                      <path
                        opacity="0.6"
                        fill="#043F5B"
                        enableBackground="new    "
                        d="M372.3 152.2c0 0 37.7 4.9 33.6 8.1 -9.5 7.4-36.4 27-36.4 27l-18.2-2c0 0-11.6 11.7-15.1 17.4 -11.9 19.8-13.9 40-13.9 40s-12.4 26.5-35 21.7c-16.7-3.5-5-24.1-5-24.1s0-61.4-29.6 7.4c-6.3 14.6-42.5 28.1-36.8 0 3.8-18.4 16.3-40.7 19.2-45.1 2.9-4.4 5.9-10.6 19.1-18"
                      />
                      <path
                        fill="none"
                        stroke="#1D1D1B"
                        strokeWidth="0.5"
                        strokeMiterlimit="10"
                        d="M317.5 246c0 0 17.4 0.8 21 2.4"
                      />
                      <path
                        fill="none"
                        stroke="#1D1D1B"
                        strokeWidth="0.5"
                        strokeMiterlimit="10"
                        d="M314.3 247.6c0 0 9.9 1.6 11.5 1.6"
                      />
                      <path
                        fill="none"
                        stroke="#1D1D1B"
                        strokeWidth="0.5"
                        strokeMiterlimit="10"
                        d="M319.1 243.2c0 0 7.1 0.8 9.5 0.8"
                      />
                      <path
                        fill="none"
                        stroke="#1D1D1B"
                        strokeWidth="0.5"
                        strokeMiterlimit="10"
                        d="M256.9 246.8c0 0 7.1-1.6 11.5-0.8"
                      />
                      <path
                        fill="none"
                        stroke="#1D1D1B"
                        strokeWidth="0.5"
                        strokeMiterlimit="10"
                        d="M248.5 248.4c0 0 9.9 0.4 15.1 1.2"
                      />
                      <path
                        fill="none"
                        stroke="#1D1D1B"
                        strokeWidth="0.5"
                        strokeMiterlimit="10"
                        d="M215.3 246.8c-1.2 0-15.9 0-21 1.2"
                      />
                      <line
                        fill="none"
                        stroke="#1D1D1B"
                        strokeWidth="0.5"
                        strokeMiterlimit="10"
                        x1="212.9"
                        y1="249.9"
                        x2="186.3"
                        y2="251.1"
                      />
                      <path
                        opacity="0.6"
                        fill="none"
                        stroke="#043F5B"
                        strokeMiterlimit="10"
                        enableBackground="new    "
                        d="M446.9 176.2c1.1 0.7 15.9 38.1-74.8 72.6 -79.5 30.2-97-24.7-98.9-33.6"
                      />
                      <path
                        fill="#FFFFFF"
                        stroke="#1D1D1B"
                        strokeWidth="0.8"
                        strokeMiterlimit="10"
                        d="M467.9 194.4c-6.4-11.3-21-18.2-21-18.2s-13.5 11.8-15.2 14.5c-1.6 2.6 7.2 4.7 19.6 18.1C452.9 210.4 467.9 194.4 467.9 194.4z"
                      />
                      <path
                        id={`SVGID_7_${this.state.idSuffix}`}
                        fill="#FDDA9E"
                        d="M339.2 184c0 0 3.8 0.9 11.4 0.9 6.9 0 18.7-19.4 20-19.4 2.3 0 2.5-91.8-0.6-128.1 -0.7-8.4-7.9-13.7-9-14.4 -0.9-0.6-15.3-1.7-23.1-1.9 -27.4-0.8-69.4 1.2-69.4 1.2s-48.7 4.1-50.2 4.8c-5.7 2.8 7.8 158.8 7.8 158.8"
                      />
                      <defs>
                        <path
                          id={`SVGID_53_${this.state.idSuffix}`}
                          d="M339.2 184c0 0 3.8 0.9 11.4 0.9 6.9 0 18.7-19.4 20-19.4 2.3 0 2.5-91.8-0.6-128.1 -0.7-8.4-7.9-13.7-9-14.4 -0.9-0.6-15.3-1.7-23.1-1.9 -27.4-0.8-69.4 1.2-69.4 1.2s-48.7 4.1-50.2 4.8c-5.7 2.8 7.8 158.8 7.8 158.8"
                        />
                      </defs>
                      <clipPath id={`SVGID_54_${this.state.idSuffix}`}>
                        <use xlinkHref={`#SVGID_53_${this.state.idSuffix}`} overflow="visible" />
                      </clipPath>
                      <path
                        clipPath={`url(#SVGID_54_${this.state.idSuffix})`}
                        fill="#E0B560"
                        d="M307.4 20.1c2.1 2.1 10.9 14.4 12.3 21.2s6.8 10.3 6.8 10.3 0.7 18.5 0.7 20.5 -6.2 8.2-6.2 8.2 28.7 14.4 32.1 35.5c3.4 21.2 0.7 64.2-4.1 74.5 -4.8 10.3-48.9 1-48.9 1l-20-171.9L307.4 20.1z"
                      />
                      <defs>
                        <path
                          id={`SVGID_55_${this.state.idSuffix}`}
                          d="M339.2 184c0 0 3.8 0.9 11.4 0.9 6.9 0 18.7-19.4 20-19.4 2.3 0 2.5-91.8-0.6-128.1 -0.7-8.4-7.9-13.7-9-14.4 -0.9-0.6-15.3-1.7-23.1-1.9 -27.4-0.8-69.4 1.2-69.4 1.2s-48.7 4.1-50.2 4.8c-5.7 2.8 7.8 158.8 7.8 158.8"
                        />
                      </defs>
                      <clipPath id={`SVGID_56_${this.state.idSuffix}`}>
                        <use xlinkHref={`#SVGID_55_${this.state.idSuffix}`} overflow="visible" />
                      </clipPath>
                      <path
                        opacity="0.6"
                        clipPath={`url(#SVGID_56_${this.state.idSuffix})`}
                        fill="#E0B560"
                        enableBackground="new    "
                        d="M319.5 64.2c0 0 19.1-38.1 0.8-45C302 12.4 266.2 20 266.2 20L319.5 64.2z"
                      />
                      <defs>
                        <path
                          id={`SVGID_57_${this.state.idSuffix}`}
                          d="M339.2 184c0 0 3.8 0.9 11.4 0.9 6.9 0 18.7-19.4 20-19.4 2.3 0 2.5-91.8-0.6-128.1 -0.7-8.4-7.9-13.7-9-14.4 -0.9-0.6-15.3-1.7-23.1-1.9 -27.4-0.8-69.4 1.2-69.4 1.2s-48.7 4.1-50.2 4.8c-5.7 2.8 7.8 158.8 7.8 158.8"
                        />
                      </defs>
                      <clipPath id={`SVGID_58_${this.state.idSuffix}`}>
                        <use xlinkHref={`#SVGID_57_${this.state.idSuffix}`} overflow="visible" />
                      </clipPath>
                      <path
                        clipPath={`url(#SVGID_58_${this.state.idSuffix})`}
                        fill="#E0B560"
                        d="M328.6 17.4c0 0 11.5 0 16 7.5s10.6 38.3 9.3 47.8c-1.4 9.6 6.2 84.7 0 101.8s-5.5 21.9-5.5 21.9 9.6-11.2 13-20.3c8.1-21.3-1.7-108.8 1.7-110.1 3.4-1.4 10.3-5.4 10.3-5.4l0.3-4.2 -11.6 4.1c0 0 1.4-17.8-1.4-23.2C358 31.7 351.8 14.6 328.6 17.4z"
                      />
                      <defs>
                        <path
                          id={`SVGID_59_${this.state.idSuffix}`}
                          d="M339.2 184c0 0 3.8 0.9 11.4 0.9 6.9 0 18.7-19.4 20-19.4 2.3 0 2.5-91.8-0.6-128.1 -0.7-8.4-7.9-13.7-9-14.4 -0.9-0.6-15.3-1.7-23.1-1.9 -27.4-0.8-69.4 1.2-69.4 1.2s-48.7 4.1-50.2 4.8c-5.7 2.8 7.8 158.8 7.8 158.8"
                        />
                      </defs>
                      <clipPath id={`SVGID_60_${this.state.idSuffix}`}>
                        <use xlinkHref={`#SVGID_59_${this.state.idSuffix}`} overflow="visible" />
                      </clipPath>
                      <path
                        clipPath={`url(#SVGID_60_${this.state.idSuffix})`}
                        fill="none"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M344.6 24.9c0 0 5.9 7.2 6.8 19.2 3.1 41 8.8 132.8-2.3 142.4 -14.4 12.4-114.7 2.1-114.7 2.1S225.6 32.4 236 27.7 335.9 13.3 344.6 24.9z"
                      />
                      <path
                        id={`SVGID_2_${this.state.idSuffix}`}
                        fill="none"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M339.2 184c0 0 3.8 0.9 11.4 0.9 6.9 0 18.7-19.4 20-19.4 2.3 0 2.5-91.8-0.6-128.1 -0.7-8.4-7.9-13.7-9-14.4 -0.9-0.6-15.3-1.7-23.1-1.9 -27.4-0.8-69.4 1.2-69.4 1.2s-48.7 4.1-50.2 4.8c-5.7 2.8 7.8 158.8 7.8 158.8"
                      />
                      <path
                        fill="#FDDA9E"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M252.7 82.2c0 0-52.6 18.7-52.6 57.3 0 19.5 38 33.3 58 25.7"
                      />
                      <ellipse
                        fill="#FDDA9E"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        cx="230.2"
                        cy="143.9"
                        rx="16.3"
                        ry="16.3"
                      />
                      <path
                        id={`SVGID_9_${this.state.idSuffix}`}
                        fill="#868686"
                        d="M209.9 197.3l7.3 26.8c0 0-7.7 4.7-8.1 6.5 -0.5 1.8 3.4 16.7 3.4 16.7s0.7 5.6 12.2 5.4c10.1-0.2 26.4-5 25.9-5l9.2-1.8c0 0-7.2-29.5-9.7-34.5"
                      />
                      <defs>
                        <path
                          id={`SVGID_61_${this.state.idSuffix}`}
                          d="M209.9 197.3l7.3 26.8c0 0-7.7 4.7-8.1 6.5 -0.5 1.8 3.4 16.7 3.4 16.7s0.7 5.6 12.2 5.4c10.1-0.2 26.4-5 25.9-5l9.2-1.8c0 0-7.2-29.5-9.7-34.5"
                        />
                      </defs>
                      <clipPath id={`SVGID_62_${this.state.idSuffix}`}>
                        <use xlinkHref={`#SVGID_61_${this.state.idSuffix}`} overflow="visible" />
                      </clipPath>
                      <path
                        clipPath={`url(#SVGID_62_${this.state.idSuffix})`}
                        fill="#C6C6C5"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M209.1 230.6c0 0 10.8-8.1 22.1-2.3s19.8 15.3 22.3 14.4c2.5-0.9 2.7-11 2.7-11l7.8 17.7 -54.9 14.9V230.6z"
                      />
                      <path
                        id={`SVGID_4_${this.state.idSuffix}`}
                        fill="none"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M209.9 197.3l7.3 26.8c0 0-7.7 4.7-8.1 6.5 -0.5 1.8 3.4 16.7 3.4 16.7s0.7 5.6 12.2 5.4c10.1-0.2 26.4-5 25.9-5l9.2-1.8c0 0-7.2-29.5-9.7-34.5"
                      />
                      <path
                        fill="#FDDA9E"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M311 82c2 1.6 54.7 34.2 30 104.4l-20.7 4 -20.2 0.8 -30.3-0.6 -15.7 0.2 -4.6-0.4 4.6 21.4c0 0-43.8 0.4-46-0.4 -2.1-0.7 3.7-2.9 2.6-4.3 -1.1-1.4-8.4-32.2-9.2-42.4 -0.5-6.7 5.1-17.8 12.8-17.1 11.1 1 26 3.4 30 4.1 0 0-5.5-24.4-4.3-37.5 1.8-19.1 9-34.6 42.9-35.9 9.6-0.4 18.9 0.2 25.4 3"
                      />
                      <path
                        fill="#E0B560"
                        d="M259.9 146.7l0.6 9.9c0 0 7 6.7 9.3 13.7s4.9 17.5 4.9 17.5l2.3 0.6c0 0 1.7-24.2 3.8-26.2s3.2-33.2 5.8-33.2c2.6 0 23-1.5 23-1.5s-0.3-4.9-0.6-7c-0.6-4.9-3.5-35.5-5.3-35.8 -1.4-0.2-6.7 22.9-6.7 22.9l-2.9-3.2 -47.2 11.4 2.3 29.7L259.9 146.7z"
                      />
                      <path
                        fill="#E0B560"
                        d="M248.9 170c0 0 2-3.2 1.7 1.7s5.2-3.8 3.8 2 1.7 2.9 1.5 6.1 16.9 1.2 16.9 1.2 3.5 5.5 2.9 7.9 -25.9 0.3-25.9 0.3L248.9 170z"
                      />
                      <path
                        fill="#FDDA9E"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M231.5 124c6.9 4.3 9.3 16.8 5.8 22.5s-12 6.9-18.9 2.6 -9.7-12.4-6.2-18.1C215.7 125.3 224.6 119.7 231.5 124z"
                      />
                      <ellipse
                        fill="#CA9C3F"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        cx="272.6"
                        cy="84.6"
                        rx="37.5"
                        ry="33.3"
                      />
                      <path fill="none" stroke="#1D1D1B" strokeMiterlimit="10" d="M288.5 96.3" />
                      <path fill="none" stroke="#1D1D1B" strokeMiterlimit="10" d="M243.1 88.9" />
                      <path
                        fill="#FDDA9E"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M236.2 121.6c0 0-7.7-13.3-10.1-10.1 -2.4 3.2 2.4 12 2.4 12s-3.7-1.1-4.8 1.6 1.3 5.3 1.3 5.3 -3.7-1.6-3.7 1.3c-0.1 5.5 6.6 8.6 8.3 9.7 6.8 4.3 3.1-3.5 2.6-4.9 -0.5-1.3 6.2 1.2 6.2-0.4s-4.3-8.9-4.3-8.9S241.5 131 236.2 121.6z"
                      />
                      <path
                        id={`SVGID_11_${this.state.idSuffix}`}
                        fill="#FDDA9E"
                        d="M312 128.7c-12.3-1.6-29.8 0.7-29.8 0.7s-1.7 14.2-1.2 21 3.3 10.6 3.3 10.6c22.7 1.8 66.7 7.1 67.2-25 0.7-40-38.5-52.8-38.5-52.8"
                      />
                      <defs>
                        <path
                          id={`SVGID_63_${this.state.idSuffix}`}
                          d="M325.4 136.3c-11.8 3.8-26.7 13.2-26.7 13.2s4.5 13.6 7.8 19.5 7.5 8.2 7.5 8.2c21.3-8 63.4-21.8 50.3-51.1 -16.3-36.5-57.2-31.5-57.2-31.5"
                        />
                      </defs>
                      <clipPath id={`SVGID_64_${this.state.idSuffix}`}>
                        <use xlinkHref={`#SVGID_63_${this.state.idSuffix}`} overflow="visible" />
                      </clipPath>
                      <ellipse
                        transform="matrix(0.906 -0.4232 0.4232 0.906 -11.7737 151.7788)"
                        clipPath={`url(#SVGID_64_${this.state.idSuffix})`}
                        fill="#087EB5"
                        stroke="#1D1D1B"
                        strokeWidth="0.8"
                        strokeMiterlimit="10"
                        cx="335.9"
                        cy="102.4"
                        rx="7.3"
                        ry="15.2"
                      />
                      <path
                        id={`SVGID_6_${this.state.idSuffix}`}
                        fill="none"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M312 128.7c-12.3-1.6-29.8 0.7-29.8 0.7s-1.7 14.2-1.2 21 3.3 10.6 3.3 10.6c22.7 1.8 66.7 7.1 67.2-25 0.7-40-38.5-52.8-38.5-52.8"
                      />
                      <path fill="#FFFFFF" stroke="#1D1D1B" strokeMiterlimit="10" d="M204 179.2" />
                      <path
                        fill="#FFFFFF"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M253.1 209.6"
                      />
                      <path
                        fill="#FFFFFF"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M296.2 153.3"
                      />
                      <path
                        fill="#FFFFFF"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M242.3 154.2"
                      />
                      <path
                        id={`SVGID_13_${this.state.idSuffix}`}
                        fill="#868686"
                        d="M322.8 201.5c-0.7 0.7-1.4 24.8-2.9 32.5 -1.6 7.7-2 11.9-2 11.9S307.6 253 298 255c-16.7 3.5-24.4-2.7-24.4-3.1 0-0.9 0.3-11.2 0.3-11.2s4-7.6 4.7-8c0.7-0.5 0.7-0.5 0.7-0.5L280 211"
                      />
                      <defs>
                        <path
                          id={`SVGID_65_${this.state.idSuffix}`}
                          d="M322.8 201.5c-0.7 0.7-1.4 24.8-2.9 32.5 -1.6 7.7-2 11.9-2 11.9S307.6 253 298 255c-16.7 3.5-24.4-2.7-24.4-3.1 0-0.9 0.3-11.2 0.3-11.2s4-7.6 4.7-8c0.7-0.5 0.7-0.5 0.7-0.5L280 211"
                        />
                      </defs>
                      <clipPath id={`SVGID_66_${this.state.idSuffix}`}>
                        <use xlinkHref={`#SVGID_65_${this.state.idSuffix}`} overflow="visible" />
                      </clipPath>
                      <path
                        clipPath={`url(#SVGID_66_${this.state.idSuffix})`}
                        fill="#C6C6C5"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M272.5 240.1c0.7-0.5 10.6-12.9 18-9.7s21.5 15.6 23.3 14 5.9-8.8 5.9-8.8l2.3 16.2 -49.6 10.7L272.5 240.1z"
                      />
                      <path
                        id={`SVGID_8_${this.state.idSuffix}`}
                        fill="none"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M322.8 201.5c-0.7 0.7-1.4 24.8-2.9 32.5 -1.6 7.7-2 11.9-2 11.9S307.6 253 298 255c-16.7 3.5-24.4-2.7-24.4-3.1 0-0.9 0.3-11.2 0.3-11.2s4-7.6 4.7-8c0.7-0.5 0.7-0.5 0.7-0.5L280 211"
                      />
                      <path
                        fill="#FDDA9E"
                        stroke="#1D1D1B"
                        strokeMiterlimit="10"
                        d="M317 165.2c0-1.1-12-13.7-20.2-12.7 -7.3 0.9-25.3 1.7-17.8 52.1 0 0-6.6 5.8-3.5 5.8 3.2 0 48 1.4 48 1.4s1.6-12 0.4-33.9"
                      />
                      <g id="Astronaut">
                        <ellipse
                          id={`SVGID_15_${this.state.idSuffix}`}
                          transform="matrix(0.0426 -0.9991 0.9991 0.0426 192.2581 324.8105)"
                          fill="#FDDA9E"
                          cx="265.6"
                          cy="62.1"
                          rx="53.1"
                          ry="47.7"
                        />
                        <defs>
                          <ellipse
                            id={`SVGID_67_${this.state.idSuffix}`}
                            transform="matrix(0.0426 -0.9991 0.9991 0.0426 192.2581 324.8105)"
                            cx="265.6"
                            cy="62.1"
                            rx="53.1"
                            ry="47.7"
                          />
                        </defs>
                        <clipPath id={`SVGID_68_${this.state.idSuffix}`}>
                          <use xlinkHref={`#SVGID_67_${this.state.idSuffix}`} overflow="visible" />
                        </clipPath>
                        <g clipPath={`url(#SVGID_68_${this.state.idSuffix})`}>
                          <path
                            id={`SVGID_17_${this.state.idSuffix}`}
                            fill="#087EB5"
                            d="M299.7 92.3c1.3 0.1-5.6-37.1-5.6-37.1s-18.9-9.7-42.1-8.6c-23.3 1.1-31 6.5-31 6.5l-6.4 3.8c0 0 4.9 39.1 5.8 39.8 0.9 0.7 21.9 23.4 22.9 23.2s46.3-4.2 46.3-4.2l11.3-19L299.7 92.3z"
                          />
                          <defs>
                            <path
                              id={`SVGID_69_${this.state.idSuffix}`}
                              d="M299.7 92.3c1.3 0.1-5.6-37.1-5.6-37.1s-18.9-9.7-42.1-8.6c-23.3 1.1-31 6.5-31 6.5l-6.4 3.8c0 0 4.9 39.1 5.8 39.8 0.9 0.7 21.9 23.4 22.9 23.2s46.3-4.2 46.3-4.2l11.3-19L299.7 92.3z"
                            />
                          </defs>
                          <clipPath id={`SVGID_70_${this.state.idSuffix}`}>
                            <use
                              xlinkHref={`#SVGID_69_${this.state.idSuffix}`}
                              overflow="visible"
                            />
                          </clipPath>
                          <path
                            clipPath={`url(#SVGID_70_${this.state.idSuffix})`}
                            fill="#6AB2D3"
                            d="M239.9 47.5c0 0-6.5 51.6 8.5 64.6 15 13.1-30.7-13.7-33.9-39.2S230.8 42.3 239.9 47.5z"
                          />
                          <defs>
                            <ellipse
                              id={`SVGID_71_${this.state.idSuffix}`}
                              transform="matrix(0.0426 -0.9991 0.9991 0.0426 192.2581 324.8105)"
                              cx="265.6"
                              cy="62.1"
                              rx="53.1"
                              ry="47.7"
                            />
                          </defs>
                          <clipPath id={`SVGID_72_${this.state.idSuffix}`}>
                            <use
                              xlinkHref={`#SVGID_71_${this.state.idSuffix}`}
                              overflow="visible"
                            />
                          </clipPath>
                          <path
                            opacity="0.8"
                            clipPath={`url(#SVGID_72_${this.state.idSuffix})`}
                            fill="#FFFFFF"
                            enableBackground="new    "
                            d="M232.8 93.7c-3.4-9.3-1-38.2 19.1-38.2 16.7 0 13.8 21.5 16.7 35.8 5.6 27.1 21.5 22.3 5.6 23.1C263.9 115 243.9 124 232.8 93.7z"
                          />
                          <defs>
                            <ellipse
                              id={`SVGID_73_${this.state.idSuffix}`}
                              transform="matrix(0.0426 -0.9991 0.9991 0.0426 192.2581 324.8105)"
                              cx="265.6"
                              cy="62.1"
                              rx="53.1"
                              ry="47.7"
                            />
                          </defs>
                          <clipPath id={`SVGID_74_${this.state.idSuffix}`}>
                            <use
                              xlinkHref={`#SVGID_73_${this.state.idSuffix}`}
                              overflow="visible"
                            />
                          </clipPath>
                          <path
                            clipPath={`url(#SVGID_74_${this.state.idSuffix})`}
                            fill="#E0B560"
                            d="M229.5 25.6c0 0 11.6-7.5 24.6-8.9s47.2 4.1 55.4 32.8 3.4-37.6-23.9-45.1C258.2-3.1 237 15.3 229.5 25.6z"
                          />
                          <ellipse
                            id={`SVGID_10_${this.state.idSuffix}`}
                            transform="matrix(0.0426 -0.9991 0.9991 0.0426 192.2581 324.8105)"
                            fill="none"
                            stroke="#1D1D1B"
                            strokeMiterlimit="10"
                            cx="265.6"
                            cy="62.1"
                            rx="53.1"
                            ry="47.7"
                          />
                        </g>
                        <path
                          opacity="0.4"
                          fill="#006C96"
                          enableBackground="new    "
                          d="M237.8 94.3c-0.3-2.3-0.2-4.4 0.2-6.5s1.1-3.9 2.1-5.5 2.2-2.9 3.6-4c1.4-1 3-1.6 4.8-1.8 1.8-0.2 3.4 0 5.1 0.7 1.6 0.7 3.1 1.7 4.5 3.1 1.3 1.4 2.4 3 3.3 4.9s1.5 4 1.7 6.3c0.3 2.3 0.2 4.4-0.2 6.5 -0.4 2.1-1.1 3.9-2.1 5.5s-2.2 2.9-3.6 4c-1.4 1-3 1.6-4.8 1.8 -1.8 0.2-3.4 0-5.1-0.7 -1.6-0.7-3.1-1.7-4.5-3.1 -1.3-1.4-2.4-3-3.3-4.9C238.6 98.7 238 96.6 237.8 94.3zM244.5 99.2c0 0.5-0.1 1-0.1 1.5 -0.1 0.5-0.2 1-0.3 1.5v0.1c0 0 0.1 0 0.1 0.1l10-12c0 0 0.2 0.2 0.5 0.5s0.5 0.8 0.6 1.6c0.2 0.9 0.3 1.9 0.3 3s-0.4 1.6-1.2 1.7c-0.5 0.1-1.1 0.1-2 0.2 0.3 1.7 0.3 3.2 0 4.5l5.4-0.6c0.1-0.1 0.1-0.2 0-0.3 -0.1-0.3-0.3-0.9-0.6-1.8 -0.3-0.9-0.5-1.9-0.7-3.1 -0.1-0.8-0.2-1.6-0.1-2.4 0-0.8 0-1.6-0.1-2.4s-0.2-1.3-0.3-1.7c-0.1-0.4-0.2-1-0.4-1.9 -0.1-0.7-0.2-1.4-0.2-2.1s0.1-1.4 0.3-2c0 0 0-0.1-0.1-0.1l-0.9 0.1c-0.6 0.8-1.5 1.8-2.6 3.2 -1.2 1.4-2.2 2.7-3.2 3.8 -0.1-0.1-0.3-0.2-0.4-0.5 -0.1-0.2-0.3-0.6-0.5-1.1 -0.2-0.6-0.3-1.2-0.2-1.6s0.1-0.9 0-1.3c0-0.4-0.1-0.8-0.1-1.1 -0.1-0.3-0.1-0.5-0.2-0.7 -1 0.1-2.6 0.3-4.6 0.5 0.7 1.2 0.9 2.9 0.5 5.1 1.3-0.1 2.4-0.3 3.3-0.4 0.2 0 0.5 0.1 0.7 0.3 0.2 0.2 0.4 0.5 0.5 0.9 0.1 0.3 0.1 0.5 0 0.8 0 0.3-0.1 0.5-0.2 0.6 -0.8 0.9-1.4 1.6-1.9 2.3 -0.5 0.7-1.1 1.3-1.7 1.9 0.2 0.6 0.3 1.1 0.3 1.4C244.5 98.1 244.5 98.6 244.5 99.2L244.5 99.2z"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M231.6 106.5c1-1.1 27.2-0.6 27.4 0.4 0.5 1.8 11.1 46.8 10.3 46.8s-23.5 1-25.6-0.2 -9.9-33.5-12.8-44.1C230.3 107.1 231.4 106.8 231.6 106.5z"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M253.3 153.6c0 0 17.7 1.4 22.4 38.3"
                        />
                        <ellipse
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          cx="284.8"
                          cy="146.1"
                          rx="7.3"
                          ry="16.1"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M284.6 155.9c-3.7 1-14.5-2.4-15.5-2.4s1.4-3.5 1.4-3.5 -3.8-1.4-5.6-2.8c-1.7-1.4 4.5-4.9 4.5-4.9s-4.5-1.7-8-3.8 4.2-4.9 4.2-4.9 -5.2 0.7-8.4-2.1 -2.8-5.2 1.4-7.7c4.2-2.4 11.2-1 12.2-1 0 0 11.2 2.4 12.6 10.8"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          x1="324.3"
                          y1="188.5"
                          x2="329.1"
                          y2="179.5"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          x1="251.6"
                          y1="200.5"
                          x2="245.4"
                          y2="168.4"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          x1="249.6"
                          y1="190.2"
                          x2="255.9"
                          y2="171"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M333.4 160.4c0 0 8.5 8 7.7 26"
                        />
                        <path
                          fill="#EAD6B3"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M304.9 53.1c3.2-0.4 14.8-0.8 14.8-0.8l0.7 20.4 -5.1 5.1 -8.1 1.5L304.9 53.1z"
                        />
                        <path
                          fill="#EAD6B3"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M314.4 51.9c0 0 2.3 17.6-0.6 27"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M316.4 125.6c0 0 28.7 16.2 10.4 35.3"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M322.8 123.2c0 0 25.5 9.6 16.7 32.6"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M328.3 120.8c0 0 26.3 5.6 21.5 23.1"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          x1="247.1"
                          y1="201.2"
                          x2="209.7"
                          y2="203.6"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M203.3 174.6c0 0 23.8-11.1 44.2 2"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M217.2 224.1c1.1-0.6 12.9-3.6 22.1-1.1"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M279.6 231.6c0 0 3.6-5.3 15.4-4.7"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M212.1 229.4c0 0 3.7 19.4 4.5 20.8"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M216.3 228c0 1.4 3.9 23.6 5.1 24.2"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M222.8 226.3"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M222.8 226.3c0 0 2.8 26.4 5.1 26.7"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M239.1 233.3c0 0 0.3 16.3 2.2 16.3"
                        />
                        <path
                          fill="#868686"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M246.7 238.7c0 0.8 0 8.7 1.7 8.7"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          x1="253.5"
                          y1="242.8"
                          x2="254.3"
                          y2="246.3"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M286.3 230.4c0 0-4.7 6.6-5 10.6s-0.4 14.1-0.4 14.1"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M276.8 237.6c-0.3 1.1-1.1 14.3-0.8 15.2"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M292.8 234.8c-0.3 0.8-2 3.4-2.5 9.6 -0.6 6.2-0.5 11.9-0.5 11.9"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M300.6 238.7c0 2-1.1 12.6-0.6 14.3"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          d="M307.1 242.6c0 0.8-1.4 7.9-1.4 7.9"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          x1="312.2"
                          y1="244"
                          x2="311.3"
                          y2="247.7"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          x1="316.4"
                          y1="240.9"
                          x2="315.8"
                          y2="244.9"
                        />
                        <polyline
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeMiterlimit="10"
                          points="254.7 154.2 255.8 158.3 260.9 158.3 260 154.2 "
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M451.5 182.6c0 0-6.5-1.7-8.2 2.1 -1.8 4.2-0.5 9 3.5 12.2 3.7 3 10.4 3.7 12.6-1.3C461.6 190.5 455.8 183.7 451.5 182.6z"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M447.6 190.2c-0.1 0.8-0.3 2 0.9 3.4 0.8 1 2.5 1.3 3.9 0.6 3.4-1.8 13-12.5 10.7-15.6s-2.6-3.7-5.2-1.7C455.4 178.9 447.6 190.2 447.6 190.2z"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M459.4 187.8c-6.3 1.5-5.8-5.7-5.8-5.7"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M456.8 182.4c0 0 1.2 1.8 1.7 1.4 0.5-0.4 5.7-6.8 5.7-6.8l-1.8-1.7L456.8 182.4z"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M462.5 175.2c0 0 46.4-56.5 24.3-57.7 -14.5-0.8-52.7 63.7-97.1 88.5 -43.9 24.5-115 23.6-123.1 1.2 -5.6-15.5-2.8-43.2-8.2-48.6"
                        />
                        <polyline
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          points="323.4 64.4 353.3 64.4 370.3 58.1 "
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M300.8 96.8l-2.1-43c0 0-24.7-13.8-53.1-10.9 -26.1 2.7-26.2 9.9-26.2 9.9"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M277.9 177.2c0 0 18-7.3 40.4 3.2"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M279 204.7c-0.2 0.2 27.1 2 36.2 1.5"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M302.8 28.8c0 0 31.5-3.1 35.6 1s8.1 17.3 8.1 30.5"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M359.7 42c0 0-1 13.2 3.1 8.1C366.9 45.1 362.8 34.9 359.7 42z"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M330.9 95c-0.3 0.9-3.2 5.8 4.1 13.6 4.4 4.7 8.8 0.3 8.8 0.3"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M307.9 59.1c0 0-1.9 4.7 2.2 5C314.2 64.4 312.9 56.2 307.9 59.1z"
                        />
                        <path
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M309.8 69.8c0 0-0.9 1.9 1.6 1.9S312.3 68.2 309.8 69.8z"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M232.3 108.9c0.9 0 22.1-0.6 24.3 0.6 2.2 1.3 3.6 11.8 3.6 11.8"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M237.3 111.2c0 0 3.8-0.6 4.4 0.3 0.6 0.9 0 2-2.2 2.1S235.7 113.9 237.3 111.2z"
                        />
                        <path
                          fill="#FFFFFF"
                          d="M272.4 54.7c0 0-3.9 2.9-0.5 3.4C275.3 58.6 277.3 54.2 272.4 54.7z"
                        />
                        <path
                          fill="#FFF0DA"
                          d="M273.8 28.4c0 0-11.4-5.3-13.7-1.5S278.4 30.7 273.8 28.4z"
                        />
                        <path
                          fill="#FFF0DA"
                          d="M248.6 27.6c0 0-10.7-0.8-13.7 3.8S248.6 27.6 248.6 27.6z"
                        />
                        <path fill="#FFF0DA" d="M283.5 23.2c0 0-9.6-8.2-29.4-6.6" />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M210.8 207.3c0.3 0.4 30.3-0.9 34.1-1.3"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M361.9 42.3c0 0-1.1 6.2 0.9 5.2S364.4 40.2 361.9 42.3z"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.8"
                          strokeMiterlimit="10"
                          d="M226.1 122.6c-1.8 0-8.9-0.9-15.2 1.3"
                        />
                        <line
                          fill="none"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          x1="264.6"
                          y1="140.8"
                          x2="265.2"
                          y2="144.4"
                        />
                        <path
                          fill="#FFFFFF"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M262.3 134.1"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M284.8 130c0 0 5.4 9.3 4.7 18.8"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M277.7 180.7c0 0 12.9-5.7 35.3 0.4"
                        />
                        <path
                          fill="#FDDA9E"
                          stroke="#1D1D1B"
                          strokeWidth="0.5"
                          strokeMiterlimit="10"
                          d="M239.7 175.8c0 0-17.1-4.8-35.7 3.5"
                        />
                      </g>
                    </g>
                  )}
                </g>
              )}
            />
          </svg>
        )}
      />
    );
  }
}

export default Astronaut;
