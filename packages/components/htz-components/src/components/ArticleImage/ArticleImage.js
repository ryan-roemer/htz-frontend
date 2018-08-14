import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { createComponent, FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';

import Caption from '../Caption/Caption';
import FullScreenMedia from '../FullScreenMedia/FullScreenMedia';
import Image from '../Image/Image';
import Picture from '../Image/Picture';
import { buildUrl, } from '../../utils/buildImgURLs';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { Mutation, } from '../ApolloBoundary/ApolloBoundary';

const ADD_IMAGE = gql`
  mutation AddImageToSchema($image: Object!) {
    addImageToSchema(image: $image) @client
  }
`;

const articleImagePropTypes = {
  /**
   * A mutation function that passes from `AddImageToSchema` mutation.
   */
  addImageToSchema: PropTypes.func.isRequired,
  /** The image's aspect ratio to use as base crop, default 'full' */
  aspects: PropTypes.string.isRequired,
  /**
   * react-fela class names
   */
  className: PropTypes.string,
  /** Image id from polopoly */
  contentId: PropTypes.string.isRequired,
  /** Image name from polopoly */
  contentName: PropTypes.string.isRequired,
  /**
   * Image's credit.
   */
  credit: PropTypes.string,
  /**
   * Enable the the button that allows you to see the image in full-screen..
   */
  enableEnlarge: PropTypes.bool,
  /**
   * Force the image to render in a specific aspect, regardless of the editor's choice.
   */
  forceAspect: PropTypes.string,
  /**
   * Is it a standard image or infographic.
   */
  imageType: PropTypes.string.isRequired,
  /**
   * Image's dada that comes from polopoly.
   */
  imgArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Should the image be rendered as full-screen.
   */
  isFullScreen: PropTypes.bool,
  /**
   * Is the image is a headline (Position 0).
   */
  isHeadline: PropTypes.bool,
  /**
   * Is this image is the last item in the article body (needed for margin bottom).
   */
  lastItem: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /**
   * Should the image be rendered with its caption.
   */
  showCaption: PropTypes.bool,
  /**
   * Image's title.
   */
  title: PropTypes.string,
  /**
   * The image's selected view mode set by the editor (regular, full or 1/3).
   */
  viewMode: PropTypes.string.isRequired,
};

const articleImageDefaultProps = {
  className: null,
  credit: null,
  enableEnlarge: true,
  forceAspect: null,
  isFullScreen: false,
  isHeadline: false,
  lastItem: false,
  miscStyles: {},
  showCaption: true,
  title: null,
};

const imagePropTypes = {
  /**
   * Force the image to render in a specific aspect, regardless of the editor's choice.
   */
  forceAspect: PropTypes.string,
  /**
   * Is it a standard image or infographic.
   */
  imageType: PropTypes.string.isRequired,
  /**
   * Image's dada that comes from polopoly.
   */
  imgArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Should the view switch to full-screen.
   */
  isFullScreen: PropTypes.bool,
  /**
   * The image's selected view mode set by the editor (regular, full or 1/3).
   */
  viewMode: PropTypes.string,
};

const imageDefaultProps = {
  isFullScreen: false,
  viewMode: 'FullColumnWithVerticalImage',
  forceAspect: null,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const wrapperStyle = ({
  viewMode,
  lastItem,
  isHeadline,
  miscStyles,
  theme,
  isFullScreen,
}) => ({
  position: 'relative',
  ...(!lastItem && !isHeadline
    ? parseComponentProp(
      'marginBottom',
      theme.articleStyle.body.marginBottom,
      theme.mq,
      mediaQueryCallback
    )
    : []),
  display: 'block',
  width: '100%',
  height: '100%',
  flexShrink: '0',
  ...(isFullScreen
    ? {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    : {}),
  ...theme.mq(
    { from: 's', misc: 'portrait', },
    {
      ...(isFullScreen ? { display: 'block', } : {}),
    }
  ),
  ...theme.mq(
    { from: 'm', misc: 'landscape', },
    {
      ...(isFullScreen ? { display: 'block', } : {}),
    }
  ),
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    viewMode === 'OneThirdView' && !isFullScreen
      ? {
        float: 'end',
        marginBottom: '0.75rem',
        marginStart: '1.5rem',
        width: 'calc(100%/3)',
      }
      : {},
  ],
});
const Wrapper = createComponent(wrapperStyle, 'figure');

const getAspect = viewMode => {
  switch (viewMode) {
    case 'regularModeBigImage':
      return 'full';
    case 'OneThirdView':
      return 'full';
    default:
      return 'full';
  }
};

const ImageElement = props => {
  const { imageType, imgArray, isFullScreen, viewMode, forceAspect, } = props;

  const aspect = forceAspect || getAspect(viewMode);

  const imgOptions = {
    transforms: {
      width: isFullScreen ? '1920' : '700',
      aspect,
      quality: 'auto',
    },
  };
  const sourceOptions = {
    transforms: {
      width: isFullScreen ? '1920' : '700',
      aspect,
      quality: 'auto',
    },
  };

  return imageType === 'image' ? (
    <Image
      hasWrapper={!isFullScreen}
      data={props}
      imgOptions={imgOptions}
      bgcolor={isFullScreen ? 'neutral' : ''}
    />
  ) : (
    <Picture
      hasWrapper={!isFullScreen}
      defaultImg={{
        data: props,
        sourceOptions,
      }}
      sources={[
        {
          until: 'm',
          data: {
            ...props,
            imgArray: [ imgArray[1], ],
          },
          sourceOptions,
        },
        {
          from: 'm',
          data: {
            ...props,
            imgArray: [ imgArray[0], ],
          },
          sourceOptions,
        },
      ]}
      bgcolor={isFullScreen ? 'neutral' : ''}
    />
  );
};

ImageElement.propTypes = imagePropTypes;
ImageElement.defaultProps = imageDefaultProps;

const UnwrappedImage = ({
  className,
  credit,
  isFullScreen,
  isHeadline,
  lastItem,
  miscStyles,
  showCaption,
  title,
  viewMode,
  ...image
}) => (
  <Wrapper
    viewMode={viewMode}
    lastItem={lastItem}
    isHeadline={isHeadline}
    className={className}
    miscStyles={miscStyles}
    isFullScreen={isFullScreen}
  >
    <ImageElement {...image} isFullScreen={isFullScreen} />
    {showCaption && !isFullScreen ? (
      <Caption caption={title} credit={credit} />
    ) : null}
  </Wrapper>
);

UnwrappedImage.propTypes = articleImagePropTypes;
UnwrappedImage.defaultProps = articleImageDefaultProps;

/**
 * The ArticleImage component takes the Image/Picture component, strips it
 * from it's wrapper and wraps it with a specific new one, according to the
 * image's Meta (which is unique per article), and adds a [`full-screen`](./#fullscreenmedia) option as
 * a default.
 */
class ArticleImage extends React.Component {
  componentDidMount() {
    const { title, addImageToSchema, } = this.props;
    addImageToSchema({
      variables: {
        image: {
          type: 'ImageObject',
          url: this.getImageUrl(),
          description: title,
          name: title,
          width: 640,
          height: 370,
          __typename: 'Image',
        },
      },
    }).then(() => {
      console.log('ADDED TO SCHEMA');
      return null;
    });
  }

  getImageUrl = () => {
    const { contentId, imgArray, aspects, } = this.props;
    return buildUrl(
      contentId,
      { ...imgArray[0], aspects, },
      {
        width: '1920',
        aspect: 'full',
        quality: 'auto',
      }
    );
  };

  render() {
    const { enableEnlarge, contentName, title, credit, } = this.props;

    const CaptionElement = () => (
      <FelaComponent
        style={{
          display: 'flex',
          marginBottom: '3rem',
          textAlign: 'start',
        }}
        render={({ className, theme, }) => (
          <div className={className}>
            <Caption
              caption={title}
              credit={credit}
              color={[ 'neutral', '-10', ]}
              typeStyles={-1}
            />
          </div>
        )}
      />
    );

    return enableEnlarge ? (
      <FullScreenMedia
        itemName={contentName}
        itemUrl={this.getImageUrl()}
        captionElement={<CaptionElement />}
        render={({ isFullScreen, }) => (
          <UnwrappedImage {...this.props} isFullScreen={isFullScreen} />
        )}
      />
    ) : (
      <UnwrappedImage {...this.props} />
    );
  }
}

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultProps;

export default props => (
  <Mutation mutation={ADD_IMAGE}>
    {addImageToSchema => (
      <ArticleImage {...props} addImageToSchema={addImageToSchema} />
    )}
  </Mutation>
);
