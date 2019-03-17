// @flow

import { FelaComponent, } from 'react-fela';
import * as React from 'react';

import {
  type ComponentPropResponsiveObject,
  type StyleProps,
  type TypographyPropType,
  parseComponentProp,
  parseTypographyProp,
} from '@haaretz/htz-css-tools';
import type { attrFlowType, } from '../../flowTypes/attrTypes';
import type { CountdownType, } from '../../flowTypes/CountdownType';

import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import Kicker from '../ArticleHeader/Kicker';
import TeaserResponsiveText from '../TeaserResponsiveText/TeaserResponsiveText';
import style from './teaserHeaderStyle';
import Countdown from '../Countdown/Countdown';

type IsCenteredType = boolean | Array<ComponentPropResponsiveObject<boolean>>;

type TeaserHeaderProps = {
  /** attributes to be passed to the DOM element */
  attrs: ?attrFlowType,
  /**
   * The offset of the `h` element from the calculated heading level.
   * e.g: the calculated level is 3 and the offset is 1, the heading level will be 4.
   * The offset can be negative.
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
  linkTarget: ?string,

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
  /** make the entire teaser area linkable */
  hasBlockLink: boolean,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: ?StyleProps,
  /**
   * A special property holding miscellaneous CSS values for the kicker that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  kickerMiscStyles: ?StyleProps,
  kickerInnerMiscStyles: ?StyleProps,

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
  /**
   * pass an `onClick` event to the blockLink.
   * Useful for bi actions and events
   *
   * Should also be passed to underlying links, e.g.,
   * around the title and image
   */
  onClick: ?(evt: SyntheticMouseEvent<HTMLElement>) => void,
  showKicker: boolean,
  countdownObj: ?CountdownType,
};

TeaserHeader.defaultProps = {
  attrs: null,
  countdownObj: null,
  isH1: false,
  offset: 0,
  onClick: null,
  // data props
  exclusive: null,
  exclusiveMobile: null,
  linkTarget: null,
  titleMobile: null,
  // style props
  color: null,
  hasBlockLink: true,
  isCentered: false,
  kickerInnerMiscStyles: null,
  kickerIsBlock: false,
  kickerMiscStyles: null,
  kickerTypeScale: null,
  miscStyles: null,
  showKicker: true,
  typeScale: null,
};

export default function TeaserHeader({
  attrs,
  countdownObj,
  isH1,
  offset,
  onClick,
  // data props
  exclusive,
  exclusiveMobile,
  linkTarget,
  path,
  title,
  titleMobile,
  // style props
  color,
  hasBlockLink,
  isCentered,
  kickerInnerMiscStyles,
  kickerIsBlock,
  kickerMiscStyles,
  kickerTypeScale,
  miscStyles,
  showKicker,
  typeScale,
}: TeaserHeaderProps): React.Node {
  return (
    <FelaComponent
      rule={({ theme, }) => ({
        extend: [
          ...[
            isCentered
              ? parseComponentProp<IsCenteredType>(
                'textAlign',
                isCentered,
                theme.mq,
                centerText
              ) // eslint-disable-line space-infix-ops, no-mixed-operators
              : {},
          ],
          // Set font-size and line-height
          ...[ typeScale ? parseTypographyProp(typeScale, theme.type) : {}, ],
        ],
      })}
      render={({ className: wrapperClassName, }) => (
        <div className={`${wrapperClassName}`}>
          <HtzLink href={path} onClick={onClick} target={linkTarget}>
            {showKicker && (exclusive || exclusiveMobile) && (
              <Kicker
                {...(kickerIsBlock ? { isBlock: kickerIsBlock, } : {})}
                {...(kickerTypeScale ? { fontSize: kickerTypeScale, } : {})}
                {...(kickerMiscStyles ? { miscStyles: kickerMiscStyles, } : {})}
                {...(kickerInnerMiscStyles
                  ? { innerMiscStyles: kickerInnerMiscStyles, }
                  : {})}
              >
                <TeaserResponsiveText
                  text={exclusive}
                  mobileText={exclusiveMobile}
                />
              </Kicker>
            )}
            {countdownObj ? (
              <Countdown
                {...countdownObj}
                miscStyles={{ marginBottom: '2rem', }}
              />
            ) : null}
            <FelaComponent
              isBlock={kickerIsBlock}
              hasBlockLink={hasBlockLink}
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
                  <TeaserResponsiveText text={title} mobileText={titleMobile} />
                </H>
              )}
            />
          </HtzLink>
        </div>
      )}
    />
  );
}

function centerText(prop: string, isCentered: boolean) {
  return isCentered ? { textAlign: 'center', } : {};
}
