import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { attrsPropType, } from '../../../propTypes/attrsPropType';

const propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * Specifies a text for describing the image.
   * Used as a textual alternative when the image
   * fails to load and is used by assitive tech
   */
  alt: PropTypes.string,
  /**
   * Class(es) to be added to the DOM element.
   * Automatically generated by Fela, do not enter manually.
   */
  className: PropTypes.string,
  /** An array of strings describing a media query */
  media: PropTypes.arrayOf(PropTypes.string),
  /**
   * A sting describing the media query (optional) and
   * the rendered width of the image (not the file!).
   */
  sizes: PropTypes.string,
  /** The src attribute specifies the URL of the image. */
  src: PropTypes.string,
  /** Specifies the URL of the image to use in different situations. */
  srcSet: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  /** The HTML tag used to render the element */
  tagName: PropTypes.oneOf([ 'img', 'source', ]),
  /** The tooltip that pops up when the image is hovered */
  title: PropTypes.string,
  /** The image's mimetype */
  type: PropTypes.string,
};

const defaultProps = {
  attrs: null,
  alt: null,
  className: null,
  media: null,
  sizes: null,
  src: null,
  srcSet: null,
  tagName: 'img',
  title: null,
  type: null,
};

// Styles that cause the image to occupy its wrapper's dimensions
const styles = ({ theme, }) => ({
  height: '100%',
  left: '0',
  position: 'absolute',
  top: '0',
  width: '100%',
});

function ImgSource({
  attrs,
  alt,
  className,
  media,
  sizes,
  src,
  srcSet,
  tagName,
  title,
  type,
}) {
  const ImgSourceElement = tagName;
  return (
    <ImgSourceElement
      {...alt && { alt, }}
      {...(tagName === 'img'
        ? {
          src,
          ...(title ? { title, } : {}),
          ...(className ? { className, } : {}),
        }
        : {})}
      {...(tagName === 'source'
        ? {
          srcSet: !srcSet || srcSet.length === 0 ? src : srcSet,
          ...(media ? { media, } : {}),
          ...(type ? { type, } : {}),
        }
        : {})}
      {...(sizes ? { sizes, } : {})}
      {...(srcSet ? { srcSet, } : {})}
      {...attrs}
    />
  );
}

ImgSource.propTypes = propTypes;
ImgSource.defaultProps = defaultProps;

const StyledImgSource = createComponent(styles, ImgSource, [
  'alt',
  'attrs',
  'media',
  'sizes',
  'src',
  'srcSet',
  'tagName',
  'title',
  'type',
]);

export default StyledImgSource;
