/* global window */
/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.InstagramEmbed,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */

/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

const updateScript = () => {
  window.instgrm.Embeds.process();
};

export default class Instagram extends React.Component {
  static propTypes = {
    /**
     * Instagram's HTML tag (supplied by Instagram `<blockquote>....</blockquote>`).
     */
    source: PropTypes.string.isRequired,
    /**
     * A function to be called when the audio element finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    appendScript({
      src: '//platform.instagram.com/en_US/embeds.js',
      id: 'instagram-js',
      isAsync: true,
      onLoadFunction: this.props.onLoadCallback,
      updateFunction: updateScript,
    });
  }

  render() {
    return (
      <FelaComponent
        style={{
          clear: 'both',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '-12px',
        }}
        render={({ className, }) => (
          <div className={className} dangerouslySetInnerHTML={{ __html: this.props.source, }} />
        )}
      />
    );
  }
}
