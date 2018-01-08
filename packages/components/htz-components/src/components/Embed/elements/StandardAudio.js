/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.SoundCloudEmbed,
    com.polobase.FM103Embed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

StandardAudio.propTypes = {
  /**
   * The type of audio you want to embed
   * (for example: '103FM').
   */
  embedType: PropTypes.string.isRequired,
  /**
   * The audio's source code.
   */
  content: PropTypes.string.isRequired,
  /**
   * A function to be called when the audio element finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

StandardAudio.defaultProps = {
  onLoadCallback: null,
};

const audioWrapper = ({ height, }) => ({
  margin: '0',
  height: `${height}px` || 'auto',
  overflow: 'hidden',
  position: 'relative',
});

const AudioWrapper = createComponent(audioWrapper, 'figure', props =>
  Object.keys(props)
);

function StandardAudio(props) {
  const src =
    props.embedType === '103FM'
      ? `https://103fm.maariv.co.il/mediaEmbed.aspx?${props.content}`
      : `https://w.soundcloud.com/player/?url=${props.content}`;

  const height =
    props.embedType === '103FM'
      ? 300
      : props.embedType === 'playlist' ? 450 : 180;

  return (
    <AudioWrapper height={height}>
      <iframe
        title="audio embed"
        width="100%"
        height="100%"
        scrolling="no"
        frameBorder="no"
        src={src}
        seamless
        onLoad={props.onLoadCallback}
      />
    </AudioWrapper>
  );
}

export default StandardAudio;
