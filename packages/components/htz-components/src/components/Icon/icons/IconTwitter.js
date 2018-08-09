/** ************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change this Icon component , it is generated
 * from the `iconTamplate.js` file the parent directory.
 * *************************************************************** */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import iconStyle from '../iconStyle';
import { iconPropTypes, iconDefaultProps, } from '../iconPropTypes';

const IconTwitter = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
        className={className}
        {...props}
        {...attrs}
      >
        {' '}
        <path
          fill="currentColor"
          d="M224 75.9c.1 2.3.2 4.6.2 6.8 0 70.7-49.6 152.3-140.1 152.3-27.9 0-53.7-8.9-75.5-24.1 3.8.5 7.8.7 11.8.7 23.1 0 44.3-8.5 61.1-22.9-21.5-.3-39.7-15.8-46-37.2 3 .7 6 .9 9.2.9 4.5 0 8.9-.6 13-1.8-22.5-5-39.5-26.6-39.5-52.5v-.7c6.6 4 14.2 6.3 22.3 6.7-13.2-9.5-21.9-25.9-21.9-44.5 0-9.8 2.4-19 6.6-26.9C49.5 65 85.8 86.4 126.7 88.5c-.8-3.9-1.2-8-1.2-12.1 0-29.6 22-53.5 49.2-53.5 14.1 0 27 6.5 35.9 17 11.2-2.5 21.8-6.9 31.3-13-3.7 12.5-11.5 22.9-21.7 29.6 10-1.3 19.4-4.1 28.3-8.4-6.5 10.7-14.9 20.1-24.5 27.8z"
        />
      </svg>
    )}
  />
);

IconTwitter.propTypes = iconPropTypes;
IconTwitter.defaultProps = iconDefaultProps;

export default IconTwitter;
