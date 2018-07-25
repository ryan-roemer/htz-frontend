/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.FacebookEmbed,
  ]
 * *************************************************************** */

/* globals FB */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

// eslint-disable-next-line react/prop-types
const FacebookWrapper = ({ type, children, }) => {
  const width =
    type === 'post' ? '552px' : type === 'comment' ? '620px' : '100%';

  return <FelaComponent style={{ width, }}>{children}</FelaComponent>;
};

export default class Facebook extends React.Component {
  static propTypes = {
    /**
     * The type of this facebook element
     * ('post', 'video' or 'comment').
     */
    embedType: PropTypes.string.isRequired,
    /**
     * Facebook's URL (for post and comment) or HTML tag (for video).
     */
    source: PropTypes.string.isRequired,
    /**
     * These settings are relevant only for video elements.
     */
    settings: PropTypes.shape({
      /**
       * Should it display the post along with the video ('false' || 'true').
       */
      showText: PropTypes.string,
      /**
       * The width of the video.
       */
      width: PropTypes.string,
      /**
       * The height of the video.
       */
      height: PropTypes.string,
    }).isRequired,
    /**
     * A function to be called when the element finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    appendScript({
      src: '//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.9',
      id: 'facebook-jssdk',
      isAsync: true,
      onLoadFunction: this.initScript,
      updateFunction: this.updateScript,
    });
  }

  initScript = () => {
    FB.init({
      appId: '110687712359084',
      status: true,
      xfbml: true,
      version: 'v2.9',
    });

    FB.Event.subscribe('xfbml.render', () => {
      console.log('fb embed is loaded');
      this.props.onLoadCallback && this.props.onLoadCallback();
    });
  };

  updateScript = () => {
    FB.XFBML.parse();
  };

  render() {
    const type = this.props.embedType;
    const showText = this.props.settings.showText || false;

    const tag =
      type === 'post' ? (
        <div className="fb-post" data-width="" data-href={this.props.source} />
      ) : type === 'comment' ? (
        <div
          className="fb-comment-embed"
          data-width="auto"
          data-href={this.props.source}
        />
      ) : (
        <div
          className="fb-video"
          data-width="auto"
          data-href={this.props.source}
          data-allowfullscreen="true"
          data-autoplay="false"
          data-show-text={showText}
        />
      );

    return <FacebookWrapper type={this.props.embedType}>{tag}</FacebookWrapper>;
  }
}
