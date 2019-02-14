// @flow

import * as React from 'react';

import type { ComponentPropResponsiveObject, StyleProps, } from '@haaretz/htz-css-tools';

import AboveBlockLink from '../BlockLink/AboveBlockLink';
import GridItem from '../Grid/GridItem';
import HtzLink from '../HtzLink/HtzLink';

import type { ClickTrackerBannerType, } from '../../flowTypes/ClickTrackerBannerType';
import type { IsStackedType, } from '../Teaser/Teaser';
import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';

type TeaserMediaPropsType = {
  data: TeaserDataType | ClickTrackerBannerType,
  /**
   * Should not be passed manually. Handled by the parent `<Grid>` component
   */
  gutter: number,
  /**
   * The width of the underlying `<TeaserMedia />`.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <TeaserMedia /> spans 25% (3 of 12 columns)
   * <TeaserMedia width={3 / 12} />
   *
   * // responsive settings:
   * <TeaserMedia
   *   width={[
   *     { from: 's', until: 'm', misc: 'landscape', value: 3 / 12 },
   *     { from: 'xl', value: 6 / 12 },
   *   ]}
   * />
   */
  width: ?number | ComponentPropResponsiveObject<number>[],
  /**
   * Don't wrap the media element with an `<a>` element.
   * Useful for interactive  content.
   */
  disableAnchor: boolean,
  isStacked: IsStackedType,
  /**
   * pass an `onClick` event to the blockLink.
   * Useful for bi actions and events
   *
   * Should also be passed to underlying links, e.g.,
   * around the title and image
   */
  onClick: ?(evt: SyntheticMouseEvent<HTMLElement>) => void,
  children: React.Node,
  /**
   * miscellaneous styles on the wrapper `<GridItem />`
   */
  miscStyles: ?StyleProps,
};

TeaserMedia.defaultProps = {
  gutter: 0,
  children: null,
  disableAnchor: false,
  isStacked: false,
  width: null,
  onClick: null,
  miscStyles: null,
};

export default function TeaserMedia({
  data,
  gutter,
  width,
  children,
  disableAnchor,
  isStacked,
  onClick,
  miscStyles,
}: TeaserMediaPropsType): React.Node {
  return (
    <GridItem
      width={width}
      gutter={gutter}
      miscStyles={{
        ...setStacking(isStacked),
        ...(miscStyles || {}),
      }}
    >
      <AboveBlockLink>
        {({ className, }) => (
          <div className={className}>
            {disableAnchor ? (
              children
            ) : (
              <HtzLink
                onClick={onClick}
                href={
                  data.inputTemplate === 'com.polobase.ClickTrackerBannerElement'
                    ? data.link
                    : data.path
                }
                target={data.linkTarget}
                attrs={{ tabIndex: -1, }}
              >
                {children}
              </HtzLink>
            )}
          </div>
        )}
      </AboveBlockLink>
    </GridItem>
  );
}

// /////////////////////////////////////////////////////////////////////
//                               UTILS                                //
// /////////////////////////////////////////////////////////////////////

type BpOptions = Array<{ from: ?string, until: ?string, value: ?string, }>;

type StackingSettings = {
  flexBasis?: ?string | BpOptions,
  flexGrow?: ?string | BpOptions,
  flexShrink?: ?string | BpOptions,
};

function setStacking(options: IsStackedType): StackingSettings {
  if (isBoolean(options)) {
    return options
      ? {
        flexBasis: 'auto',
        flexGrow: '0',
        flexShrink: '0',
      }
      : {};
  }

  const shrinkGrow = setValue(options, '0');
  return {
    flexBasis: setValue(options, 'auto'),
    flexGrow: shrinkGrow,
    flexShrink: shrinkGrow,
  };
}

function setValue(options: IsStackedType, valueToSet: string): ?BpOptions {
  if (isBoolean(options)) return undefined;
  return options.map(({ from, until, value, }) => ({
    from,
    until,
    value: value ? valueToSet : undefined,
  }));
}

function isBoolean(candidate): boolean %checks {
  return typeof candidate === 'boolean';
}
