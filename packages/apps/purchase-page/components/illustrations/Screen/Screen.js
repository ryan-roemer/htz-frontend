/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

Screen.propTypes = {
  size: PropTypes.number.isRequired,
};

function setFill(theme) {
  return {
    fill: theme.color('secondary', 'base'),
  };
}

function Screen({ size, }) {
  return (
    <FelaComponent
      style={{ fontSize: `${size}rem`, }}
      render={({ theme, className, }) => (
        <svg
          height="1em"
          width="1.452380952380952em"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122 84"
        >
          <path
            fill="#B4B4B4"
            d="M119.2 1.4C116 .1 6 .1 4 2.1s-4.4 65.6-3 66c1.6.3 21.3.5 44 .6 0 6-.3 11-1 11.2-1.5.5-20.7 1-18.8 2.3 1 .8 57 1.8 57.6.7.3-.5-2.5-7-5.7-14.1H116L121.4 2s-1.3-.3-2.2-.7z"
          />
          <path
            fill="none"
            stroke="#1D1D1B"
            d="M45 69.1c-.1 5.8-.4 10.7-1 10.8-1.6.5-20.8 1-19 2.3 1 .8 57 1.8 57.7.7.3-.5-2.5-7-5.7-14.1"
          />
          <path
            fill="none"
            stroke="#1D1D1B"
            d="M3.9 2.1c-2 2-4.4 65.6-3 66 3.7.9 115 .7 115 .7L121.4 2s-1.3-.3-2.2-.7C116 .1 6 .1 4 2.1z"
          />
          <path
            fill="none"
            stroke="#1D1D1B"
            strokeWidth=".5"
            d="M119.3 1.2c-1.3 12-5.2 66.9-5.2 66.9"
          />
          <path
            fill="none"
            stroke="#1D1D1B"
            strokeWidth=".8"
            d="M114.6 4.7l-4.5 55.6-105.9-1L7.4 5.6zM43.9 79.8l30.8.4"
          />
          <path
            fill="none"
            stroke="#1D1D1B"
            strokeWidth=".5"
            d="M56.6 62.3s-3.7 3 .6 3.6c4.4.7 2.4-5-.6-3.6z"
          />
          <FelaComponent
            style={setFill}
            render={({ className, }) => (
              <path
                className={className}
                d="M114.6 4.7l-4.5 55.6-105.9-1L7.4 5.6z"
              />
            )}
          />
          <path
            fill="#FFF"
            d="M95.5 29.7a.6.6 0 1 1 1.1 0 .6.6 0 0 1-1.1 0zm-10-9.3a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm-29-.7c-.2 0-.4.2-.4.4s.2.3.4.3a.3.3 0 0 0 0-.7zm-18 20.4a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM30 30.5a.7.7 0 1 0-1.3 0 .7.7 0 0 0 1.3 0zm-3.5-15.3a.6.6 0 1 0 0 1.1.6.6 0 0 0 0-1.1zm62.2-4.6a.3.3 0 1 0 0 .7.3.3 0 0 0 0-.7zM16.4 46.3a.3.3 0 1 0 0 .7.3.3 0 0 0 0-.7zm-8.9 7a.3.3 0 1 0 0 .7.3.3 0 0 0 0-.7zm99.3-30.1c.2 0 .4-.2.4-.4a.3.3 0 1 0-.4.4zm-5.1 28.6a.5.5 0 1 0 0 .9.5.5 0 0 0 0-1zm-31.5.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2zm14.2-10.5a.3.3 0 0 0 0 .7.3.3 0 0 0 0-.7zm-22.7 1.4a.3.3 0 1 0 0 .7.3.3 0 0 0 0-.7zm34-4.6a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm6.1-24.7a.3.3 0 1 0 0-.7.3.3 0 0 0 0 .7zm-86.3 9.4a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm39.9-13a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zM30.3 51.8a.5.5 0 1 0 0 .9.5.5 0 0 0 0-1zm13.2-30.3a.3.3 0 1 0-.7 0 .3.3 0 0 0 .7 0zm11 16a.2.2 0 1 0 0 .5.2.2 0 0 0 0-.4zM49.1 53c-.2 0-.3 0-.3.2a.2.2 0 1 0 .3-.2zm28.5-19.6c-.1 0-.2 0-.2.2a.2.2 0 1 0 .2-.2zm-7-16.7a.2.2 0 1 0 0-.5.2.2 0 0 0 0 .5zM31.2 14a.2.2 0 1 0 0 .4.2.2 0 0 0 0-.4zm-18.8-2.8l-.2.2a.2.2 0 1 0 .2-.2zm31.2 28a.2.2 0 1 0 0 .4.2.2 0 0 0 0-.5zm21-25.2c-.2 0-.3 0-.3.2a.2.2 0 1 0 .3-.2zM49 22.4a.2.2 0 1 0 0-.5.2.2 0 0 0 0 .5zm-9.4 6.2a.2.2 0 1 0 0 .4.2.2 0 0 0 0-.4zm26.9 22.2c-.2 0-.3 0-.3.2 0 .1.1.2.3.2.1 0 .2 0 .2-.2l-.2-.2zm15.7 4.5c-.1 0-.2 0-.2.2a.2.2 0 1 0 .2-.2zm-9.6-28.7a.3.3 0 0 0 0 .7.3.3 0 0 0 0-.7zm-23 4.3a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM94.3 45l12.8-3.7S92.6 45 94.3 45zM19 9.8l11.4 4a69.2 69.2 0 0 0-11.4-4z"
          />
        </svg>
      )}
    />
  );
}

export default Screen;
