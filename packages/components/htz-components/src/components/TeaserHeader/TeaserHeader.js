// @flow

import {
  type ComponentPropResponsiveObject,
  type StyleProps,
  type TypographyPropType,
  parseComponentProp,
  parseTypographyProp,
} from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import * as React from 'react';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import AboveBlockLink from '../BlockLink/AboveBlockLink';
import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import Kicker from '../ArticleHeader/Kicker';
import TeaserResponsiveText from '../TeaserResponsiveText/TeaserResponsiveText';
import style from './teaserHeaderStyle';

type IsCenteredType = boolean | Array<ComponentPropResponsiveObject<boolean>>;

type TeaserHeaderProps = {
  /**
   * attributes to be passed to the DOM element
   */
  attrs: ?attrFlowType,
  /**
   * The offSet of the `h` element from the calculated heading level.
   * e.g: the calculated level is 3 and the offSet is 1, the heading level will be 4.
   * The offSet can be negative.
   * The final Heading level can be between 2 and 6,
   * e.g the calculated level is 10, the heading level will be 6.
   */
  offset: number,
  /** Forces the headline element to be an H1 */
  isH1: boolean,
  title: string,
  titleMobile: ?string,
  exclusive: ?string,
  exclusiveMobile: ?string,
  path: string,

  /**
   * The font-size and line height of the headline
   * Can be:
   *   - A `number` representing a step in the typographic scale.
   *   - an object of the following structure:
   *     ```ts
   *     {
   *       step: number, // A step in the typographic scale
   *       lines?: number, // overrides the default number of vertical rhythm
   *                       // lines each line of text occupies.
   *     }
   *     ```
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: number | the above object,
   *     }
   *     ```
   */
  typeScale: ?TypographyPropType,
  /**
   * The color of the headline
   * Can be:
   *   - A `string` representing a named color.
   *   - A `tuple` of two `string`s, the first representing.
   *     a named color, and the second representing a variant
   *     of that named color.
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: string or tuple, as mentioned above,
   *     }
   *     ```
   */
  color:
    | ?string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: ?StyleProps,

  /** Determines if the kicker element is set as a block element */
  kickerIsBlock: boolean,
  /**
   * The font-size and line height of the headline
   * Can be:
   *   - A `number` representing a step in the typographic scale.
   *   - an object of the following structure:
   *     ```ts
   *     {
   *       step: number, // A step in the typographic scale
   *       lines?: number, // overrides the default number of vertical rhythm
   *                       // lines each line of text occupies.
   *     }
   *     ```
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: number | the above object,
   *     }
   *     ```
   */
  kickerTypeScale: ?TypographyPropType,
  isCentered: IsCenteredType,
};

TeaserHeader.defaultProps = {
  attrs: null,
  offset: 0,
  isH1: false,
  // data props
  titleMobile: null,
  exclusive: null,
  exclusiveMobile: null,
  // style props
  typeScale: null,
  color: null,
  miscStyles: null,
  kickerIsBlock: false,
  kickerTypeScale: null,
  isCentered: false,
};

export default function TeaserHeader({
  attrs,
  offset,
  isH1,
  // data props
  title,
  titleMobile,
  exclusive,
  exclusiveMobile,
  path,
  // style props
  typeScale,
  color,
  miscStyles,
  kickerIsBlock,
  kickerTypeScale,
  isCentered,
}: TeaserHeaderProps): React.Node {
  return (
    <FelaComponent
      rule={({ theme, }) => ({
        extend: [
          ...[
            isCentered
              ? parseComponentProp<IsCenteredType>( // eslint-disable-line space-infix-ops, no-mixed-operators
                'textAlign',
                isCentered,
                theme.mq,
                centerText
              )
              : {},
          ],
          // Set font-size and line-height
          ...[ typeScale ? parseTypographyProp(typeScale, theme.type) : {}, ],
        ],
      })}
      render={({ className: wrapperClassName, }) => (
        <AboveBlockLink>
          {({ className: AboveBlockLinkClassName, }) => (
            <div className={`${AboveBlockLinkClassName} ${wrapperClassName}`}>
              <HtzLink href={path}>
                {(exclusive || exclusiveMobile) && (
                  <Kicker
                    {...(kickerIsBlock ? { isBlock: kickerIsBlock, } : {})}
                    {...(kickerTypeScale ? { fontSize: kickerTypeScale, } : {})}
                  >
                    <TeaserResponsiveText
                      text={exclusive}
                      mobileText={exclusiveMobile}
                    />
                  </Kicker>
                )}
                <FelaComponent
                  isBlock={kickerIsBlock}
                  color={color}
                  typeScale={typeScale}
                  miscStyles={miscStyles}
                  rule={style}
                  render={({ className, }) => (
                    <H
                      className={className}
                      isH1={isH1}
                      offset={offset}
                      {...attrs || {}}
                    >
                      <TeaserResponsiveText
                        text={title}
                        mobileText={titleMobile}
                      />
                    </H>
                  )}
                />
              </HtzLink>
            </div>
          )}
        </AboveBlockLink>
      )}
    />
  );
}

function centerText(prop: string, isCentered: boolean) {
  return isCentered ? { textAlign: 'center', } : {};
}
