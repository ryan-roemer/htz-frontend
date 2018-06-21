/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.GiphyEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

Giphy.propTypes = {
  /**
   * These settings are extracted from the Giphy source code.
   */
  settings: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * A function to be called when the gif finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

Giphy.defaultProps = {
  onLoadCallback: null,
};

const giphyWrapper = () => ({
  margin: '0',
  marginBottom: '-4px',
});

const GiphyWrapper = createComponent(giphyWrapper, 'figure', props =>
  Object.keys(props)
);

function Giphy(props) {
  const { settings, } = props;
  const { src, height, width, } = settings;

  // TODO: Temporary
  const innerWidth = 600;
  // prettier-ignore
  const newHeight = (innerWidth / width) * height;

  return (
    <GiphyWrapper>
      <iframe
        title="Giphy"
        src={src}
        width={innerWidth}
        height={newHeight}
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
        onLoad={props.onLoadCallback}
      />
    </GiphyWrapper>
  );
}

export default Giphy;
