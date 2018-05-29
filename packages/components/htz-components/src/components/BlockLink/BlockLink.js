import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import Link from '../Link/Link';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { attrsPropType, } from '../../propTypes/attrsPropType';

BlockLink.propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * Nodes rendered inside `BlockLink`.
   * Passed to the underlying react element
   */
  children: PropTypes.node,
  /**
   * A url to be assigned to the DOM element, converts the button to an `'<a>'`
   * DOM element inside a Next JS `<Link />`
   */
  href: PropTypes.string.isRequired,
  /** The HTML tag to render the `<BlockLink />` as */
  tagName: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

BlockLink.defaultProps = {
  attrs: null,
  children: null,
  tagName: 'article',
  miscStyles: null,
};

const blockLinkStyle = ({ theme, miscStyles, }) => ({
  position: 'relative',

  extend: [
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

export default function BlockLink({
  attrs,
  children,
  href,
  tagName,
  miscStyles,
}) {
  return (
    <FelaComponent
      miscStyles={miscStyles}
      rule={blockLinkStyle}
      render={({ theme, className, }) => {
        const BlockLinkWrapper = tagName;

        return (
          <BlockLinkWrapper className={className} {...attrs}>
            {children}
            <FelaComponent
              style={{
                backgroundColor: 'transparent',
                bottom: '0',
                left: '0',
                position: 'absolute',
                right: '0',
                top: '0',
                zIndex: '0',
              }}
              render={({ className, }) => (
                <Link
                  className={className}
                  href={href}
                  attrs={{
                    tabIndex: '-1',
                    'aria-hidden': true,
                  }}
                />
              )}
            />
          </BlockLinkWrapper>
        );
      }}
    />
  );
}
