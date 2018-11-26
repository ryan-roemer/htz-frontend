// @flow
import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';

export type cardStyleOptions = {
  /** A Fela theme object */
  theme: Object,
  backgroundColor:
    | ?string
    | [string]
    | [string, string]
    | ComponentPropResponsiveObject<string | [string] | [string, string]>[],
  isElevated: ?true,
  fillHeight: ?boolean | ComponentPropResponsiveObject<boolean>[],
  miscStyles: ?StyleProps
};

export default function cardStyleRule({
  theme,
  backgroundColor,
  isElevated,
  fillHeight,
  miscStyles,
}: cardStyleOptions): Object {
  const { cardStyle, } = theme;
  return {
    boxShadow: isElevated
      ? cardStyle.cardElevatedBoxShadow
      : cardStyle.cardBoxShadow,
    // Set the theme's default background-color with no media query,
    // in case a responsive one is set for only some media queries
    // (in the `extend` block)
    ...setColor('backgroundColor', cardStyle.cardBackgroundColor, theme.color),
    display: 'flex',
    flexDirection: 'column',
    // A card's content should always be contained inside it
    overflow: 'hidden',
    extend: [
      // Set background-color
      parseComponentProp(
        'backgroundColor',
        backgroundColor || cardStyle.cardBackgroundColor,
        theme.mq,
        setColor,
        theme.color
      ),
      // fill height of parent
      ...[
        fillHeight
          ? parseComponentProp(
            'fillHeight',
            fillHeight,
            theme.mq,
            setFillHeight
          )
          : {},
      ],
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}

function setFillHeight(prop: string, shouldFillHeight: boolean): Object {
  return shouldFillHeight ? { height: '100%', } : {};
}
