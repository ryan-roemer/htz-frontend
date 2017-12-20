import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

/**
 * Properties of a `<GridItem />`
 */
const StyledGridItemPropTypes = {
  // Underlying component props //
  /**
   * An object of attributes to set on the DOM element.
   */
  attrs: attrsPropType,
  /**
   * Nodes rendered inside `<GridItem />`.
   */
  children: PropTypes.node,
  /**
   * The `<GridItem />`s `id` attribute.
   */
  id: PropTypes.string,
  /** The HTML tag to render the `<GridItem />` as */
  tagName: PropTypes.string,

  // Styling props //
  /**
   * The width (in `rem`) of the gutter between `<GridItem />`s in a `<Grid />`.
   * The parent `<Grid />` component will automatically augment its children
   * with this prop, so it should never be set directly on the component itself.
   */
  gutter: PropTypes.number,
  /**
   * The amount a `<GridItem />` is offs by.
   * The number passed should be (`offset` / 'columns').
   * Can be set responsively.
   *
   * @example
   * // Offset <GridItem /> by 25% (3 of 12 columns)
   * <GridItem offset={3 / 12} />
   */
  offset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.number.isRequired,
      })
    ),
  ]),
  /**
   * The color and width (in pixels) of a vertical devider rule placed at the end of
   * the `<GridItem />`'s gutter.
   * Can be set responsively.
   */
  rule: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]).isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.shape({
            width: PropTypes.number.isRequired,
            color: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.arrayOf(PropTypes.string),
            ]).isRequired,
          }),
        ]).isRequired,
      })
    ),
  ]),
  /**
   * The width of a `<gridItem />`.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <GridItem /> spans 25% (3 of 12 columns)
   * <GridItem width={3 / 12} />
   */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.number.isRequired,
      })
    ),
  ]),
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

/** The default values of a `<GridItem>`'s props */
const StyledGridItemDefaultProps = {
  attrs: null,
  children: null,
  id: null,
  gutter: null,
  offset: null,
  rule: null,
  tagName: 'div',
  width: null,
  miscStyles: null,
};

const gridItemStyles = ({
  gutter,
  offset,
  rule,
  width,
  miscStyles,
  theme,
  ...props
}) => ({
  // Include gutter width (padding) in total width calculation
  boxSizing: 'border-box',
  // Allow `<GridItem>`s without a set width to auto-fill the row they are in
  flexBasis: 'auto',
  flexGrow: 1,
  flexShrink: 1,
  listStyle: 'none',
  paddingLeft: `${gutter / 2}rem`,
  paddingRight: `${gutter / 2}rem`,

  extend: [
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

function setOffset(prop, offset) {
  const offsetInPercent = `${offset * 100}%`;
  return {
    marginInlineStart: offsetInPercent,
  };
}

function setWidth(prop, width) {
  const widthInRem = `${width}rem`;
  const widthInPercent = `${width * 100}%`;
  return {
    // Keep `<GridItem>`s at their prescribed size
    flexGrow: 0,
    flexShrink: 0,
    flexBasis:
      width > 1
        ? // fixed width in rems
        widthInRem
        : // relative width in percentage
        widthInPercent,
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

GridItem.propTypes = StyledGridItemPropTypes;
GridItem.defaultProps = StyledGridItemDefaultProps;

/**
 * A generic, stylable GridItem component
 * @param {Object} props
 */
export function GridItem({
  attrs,
  className, // eslint-disable-line react/prop-types
  children,
  id,
  tagName,
  ...props
}) {
  const GridItemElement = tagName;
  return (
    <GridItemElement id={id} className={className} {...attrs}>
      {children}
    </GridItemElement>
  );
}

const StyledGridItem = createComponent(gridItemStyles, GridItem, [
  'attrs',
  'tagName',
]);

StyledGridItem.propTypes = StyledGridItemPropTypes;
StyledGridItem.defaultProps = StyledGridItemDefaultProps;

export default StyledGridItem;
