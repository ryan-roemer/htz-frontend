import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';

// ////////////////////////////////////////////////////////////////// //
//                             PROP-TYPES                             //
// ////////////////////////////////////////////////////////////////// //

// ////////////////////////////////////////////////////////////////// //
//                               STYLES                               //
// ////////////////////////////////////////////////////////////////// //
const gridItemStyles = ({
                          gutter,
                          offset,
                          gridRule: rule,
                          stretchContent,
                          width,
                          miscStyles,
                          theme,
                        }) => ({
  // Include gutter width (padding) in total width calculation
  boxSizing: 'border-box',
  // Allow `<GridItem>`s without a set width to auto-fill the row they are in
  // eslint-disable-next-line eqeqeq
  flexBasis: width == null ? 0 : 'auto',
  flexGrow: 1,
  flexShrink: 1,
  listStyle: 'none',
  paddingInlineEnd: `${gutter / 2}rem`,
  paddingInlineStart: `${gutter / 2}rem`,

  extend: [
    ...(stretchContent
      ? [
        parseComponentProp(
          'stretchContent',
          stretchContent,
          theme.mq,
          contentStretcher
        ),
      ]
      : []),
    // Offset an item from the previous item (or the begining of the grid)
    ...(offset
      ? [ parseComponentProp('offset', offset, theme.mq, setOffset), ]
      : []),
    // Set the vertical rule at the end of the `<GridItem />`
    ...(rule
      ? [ parseComponentProp('rule', rule, theme.mq, setRule, theme), ]
      : []),
    // Set the width of an item
    ...(width ? [ parseComponentProp('width', width, theme.mq, setWidth), ] : []),
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

// ///////////////// //
//  Styling Helpers  //
// ///////////////// //
function contentStretcher(prop, stretchContent) {
  return stretchContent
    ? {
      display: 'flex',
      flexDirection: 'column',
    }
    : {};
}

function setOffset(prop, offset) {
  const offsetInPercent = `${offset * 100}%`;
  return {
    marginInlineStart: offsetInPercent,
  };
}

function setWidth(prop, width) {
  const widthInRem = `${width}rem`;
  const widthInPercent = `${width * 100}%`;
  const widthToUse = width > 1
    ? widthInRem // fixed width in rems
    : widthInPercent; // relative width in percentage
  return {
    // Keep `<GridItem>`s at their prescribed size
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: widthToUse,
    maxWidth: widthToUse,
  };
}

function setRule(prop, ruleOptions, theme) {
  const ruleWidth = ruleOptions.width || theme.gridStyle.ruleWidth;
  const ruleColor = ruleOptions.color || theme.gridStyle.ruleColor;
  const ruleColorAsArray = Array.isArray(ruleColor) ? ruleColor : [ ruleColor, ];
  return {
    position: 'relative',

    ':after': {
      backgroundColor: theme.color(...ruleColorAsArray),
      content: '""',
      height: '100%',
      // This depends on `fela-plugin-bidi`
      insetInlineEnd: '0',
      position: 'absolute',
      top: '0',
      // This depends on `fela-plugin-bidi`
      // We set the rule at the half its width past the gutter's end,
      // so it is placed exactly between two `<GridItem>`s. However, we
      // round floats into integers to avoid fuzzy rendering of subpixels.
      transform: `logical translateX(${Math.floor(ruleWidth / 2)}px)`,
      width: `${ruleWidth}px`,
    },
  };
}

GridItem.defaultProps = {
  attrs: null,
  children: null,
  id: null,
  gutter: null,
  offset: null,
  rule: null,
  stretchContent: false,
  tagName: 'div',
  width: null,
  miscStyles: null,
};

// ////////////////////////////////////////////////////////////////// //
//                             COMPONENT                              //
// ////////////////////////////////////////////////////////////////// //
export default function GridItem({
  children,
  gutter,
  id,
  offset,
  rule,
  stretchContent,
  tagName,
  width,
  attrs,
  miscStyles,
}) {
  return (
    <FelaComponent
      {...{
        gutter,
        offset,
        gridRule: rule,
        stretchContent,
        width,
        miscStyles,
      }}
      rule={gridItemStyles}
      render={({ className, }) => {
        const GridItemElement = tagName;
        return (
          <GridItemElement id={id} className={className} {...attrs}>
            {children}
          </GridItemElement>
        );
      }}
    />
  );
}
