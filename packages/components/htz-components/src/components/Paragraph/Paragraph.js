import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import HtzLink from '../HtzLink/HtzLink';
import H from '../AutoLevels/H';
import FirstImpressionPlaceholder from './FirstImpressionPlaceholder';
import Zen from '../Zen/Zen';

/* Components styles */
const mainWrapperStyle = ({ marginBottom, }) => ({
  ...(marginBottom || []),
});

const MainWrapper = createComponent(mainWrapperStyle, 'div');

const inlineLinkStyle = ({ theme: { color, articleStyle, }, }) => ({
  color: color('link', 'base'),

  ':hover': {
    color: color('link', 'base'),
    borderBottomColor: color('link', 'base'),
    borderBottomWidth: articleStyle.paragraphLink.borderBottomWidth,
    borderBottomStyle: articleStyle.paragraphLink.borderBottomStyle,
  },
  ':focus': {
    color: color('link', 'base'),
    borderBottomColor: color('link', 'base'),
    borderBottomWidth: articleStyle.paragraphLink.borderBottomWidth,
    borderBottomStyle: articleStyle.paragraphLink.borderBottomStyle,
  },
  ':active': {
    color: color('link', 'base'),
    borderBottomColor: color('link', 'base'),
    borderBottomWidth: articleStyle.paragraphLink.borderBottomWidthActive,
    borderBottomStyle: articleStyle.paragraphLink.borderBottomStyle,
  },
  ':visited': {
    color: color('link', 'base'),
  },
});

const InlineLink = createComponent(inlineLinkStyle, HtzLink, props =>
  Object.keys(props)
);

const paragraphStyle = theme => {
  const { type, color, ...paragraphStyles } =
    theme.articleStyle.paragraphStyles || {};

  return {
    extend: [
      ...(theme.articleStyle.paragraphStyles
        ? [
          {
            ...(paragraphStyles || []),
            ...(type ? theme.type(...type) : []),
            ...(color ? { color: theme.color(...color), } : []),
          },
        ]
        : []),
    ],
  };
};

// eslint-disable-next-line react/prop-types
const P = ({ children, renderFirstImpression, ...props }) => (
  <FelaComponent
    style={paragraphStyle}
    render={({ className, }) => (
      <Fragment>
        <p className={className} {...props}>
          {children}
        </p>
        {renderFirstImpression && (
          <Zen>
            <FirstImpressionPlaceholder />
          </Zen>
        )}
      </Fragment>
    )}
  />
);

const strongStyle = () => ({
  fontWeight: '700',
});
const Strong = createComponent(strongStyle, 'strong', props =>
  Object.keys(props)
);

const emphasisStyle = () => ({
  fontStyle: 'italic',
});
const Em = createComponent(emphasisStyle, 'em');

const underLineStyle = () => ({
  textDecoration: 'underline',
  textDecorationSkip: 'ink',
});
const UnderLine = createComponent(underLineStyle, 'span');

const spanStyle = ({ theme, }) => ({
  backgroundColor: theme.color('primary', '-3'),
});
const Mark = createComponent(spanStyle, 'mark');

/* Util functions */
const extractAttributes = attrArray => {
  const whiteList = [ 'class', 'href', 'target', 'id', 'name', ]; // List of all the acceptable attributes.
  const attributes = {};
  if (attrArray && attrArray.length > 0) {
    // eslint-disable-line array-callback-return
    attrArray.forEach(attribute => {
      if (whiteList.includes(attribute.key)) {
        const key = attribute.key === 'class' ? 'hasClass' : attribute.key; // Switching 'class' to 'className'.
        attributes[key] = attribute.value;
      }
    });
  }
  return attributes;
};

/**
 * These type of paragraphs should ignore any MarginBottom received by the parents.
 */
const whoShouldNotMargin = [ 'question', 'h4', ];

const shouldMargin = content => {
  if (whoShouldNotMargin.includes(content.tag)) {
    return false;
  }
  else if (content.content) {
    for (const element of content.content) {
      if (!shouldMargin(element)) {
        return false;
      }
    }
  }
  return true;
};

const getTag = tag => {
  const tagsMap = new Map([
    [ 'p', P, ],
    [ 'a', InlineLink, ],
    [ 'strong', Strong, ],
    [ 'question', Strong, ],
    [ 'mark', Mark, ],
    [ 'u', UnderLine, ],
    [ 'em', Em, ],
    [ 'span', 'span', ],
    [ 'h4', H, ],
    [ 'br', () => <br />, ],
  ]);
  return tagsMap.get(tag);
};

/**
 * This paragraph component receives an object with it's attributes and children
 * (which comes with their own children and so on), and it builds itself recursively.
 *
 * @param {Object} props
 */
export default class Paragraph extends React.Component {
  state = { margin: true, };

  componentWillMount() {
    this.setState({ margin: shouldMargin(this.props), });
  }

  render() {
    const { renderFirstImpression, marginBottom, ...props } = this.props;
    return (
      <MainWrapper marginBottom={this.state.margin ? marginBottom : null}>
        <Content
          content={props}
          renderFirstImpression={renderFirstImpression}
        />
      </MainWrapper>
    );
  }
}

/* Recursive functions */
function Content({ content, renderFirstImpression, }) {
  const attributesObject = extractAttributes(content.attributes);
  return (
    <WrapperTag
      tag={content.tag}
      attributes={attributesObject}
      content={content.content}
      renderFirstImpression={renderFirstImpression}
    >
      {content.content.map((tag, index) => (
        <Content
          key={index} // eslint-disable-line react/no-array-index-key
          content={tag}
          renderFirstImpression={renderFirstImpression}
        />
      ))}
    </WrapperTag>
  );
}

function WrapperTag({
  tag: tagName,
  content: tagElements,
  attributes,
  renderFirstImpression,
}) {
  /**
   * Check if the Tag has a class names 'bg-brand--d'.
   * If so, it means that the Tag is actually `<mark />` (That's how the FCKEditor translates it).
   */
  if (attributes.hasClass && attributes.hasClass === 'bg-brand--d') {
    tagName = 'mark'; // eslint-disable-line no-param-reassign
  }
  else if (attributes.id) {
    /**
     * In case of an anchor inside the paragraph,
     * we don't need a new component but just a `<span />` with the anchors ID.
     */
    tagName = 'span'; // eslint-disable-line no-param-reassign
  }
  const Tag = getTag(tagName);
  if (tagName === 'a') {
    /**
     * In case that the paragraph tree continues inside the Link component,
     * we send it this component (the `<Paragraph />`) recursive function as the content,
     * so the Link component will continue the building of the paragraph.
     */
    attributes.content = genChildren(tagElements); // eslint-disable-line no-param-reassign
  }

  return (
    <Tag
      {...attributes}
      {...(tagName === 'p' ? { renderFirstImpression, } : {})}
    >
      {genChildren(tagElements)}
    </Tag>
  );
}

function genChildren(tagElements) {
  return tagElements.map(
    (tag, index) =>
      (tag.content ? (
        <Content key={index} content={tag} /> // eslint-disable-line react/no-array-index-key
      ) : (
        tag.attributes[0].value
      ))
  );
}

/** Components props */
Paragraph.propTypes = {
  /** The HTML tag name */
  // eslint-disable-next-line react/no-unused-prop-types
  tag: PropTypes.string.isRequired,
  /** The tag attributes (className, href, etc) */
  // eslint-disable-next-line react/forbid-prop-types
  attributes: PropTypes.array.isRequired, // eslint-disable-line react/no-unused-prop-types
  /** The paragraphs content.<br/>
   * If the value of content contains children, they must have this exact prop structure
   * {tag, attributes, content}.
   */
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.array.isRequired, // eslint-disable-line react/no-unused-prop-types
  /**
   * Should be passed if the paragraph should have a MarginBottom style
   * (some types of paragraphs would never have a MarginBottom and will override this prop).
   */
  marginBottom: PropTypes.oneOfType([
    /** simple fela style object */
    PropTypes.shape({
      marginBottom: PropTypes.string,
    }),
    /** multiple objects, each for a different break */
    PropTypes.shape({
      break: PropTypes.shape({
        marginBottom: PropTypes.string,
      }),
      break2: PropTypes.shape({
        marginBottom: PropTypes.string,
      }),
    }),
  ]),
  /** Should the Paragraph render a firstImpression placeholder after every p tag */
  renderFirstImpression: PropTypes.bool,
};

Paragraph.defaultProps = {
  marginBottom: null,
  renderFirstImpression: false,
};

Content.propTypes = {
  content: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    attributes: PropTypes.array.isRequired,
    content: PropTypes.array,
  }).isRequired,
  /** Should the Paragraph render a firstImpression placeholder after every p tag */
  renderFirstImpression: PropTypes.bool.isRequired,
};

WrapperTag.propTypes = {
  tag: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  content: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /** Should the Paragraph render a firstImpression placeholder after every p tag */
  renderFirstImpression: PropTypes.bool.isRequired,
};
