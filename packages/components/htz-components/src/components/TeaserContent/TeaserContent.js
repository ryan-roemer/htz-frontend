// @flow

import * as React from 'react';
import { FelaTheme, } from 'react-fela';
import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';

import { BlockLinkInner, } from '../BlockLink/BlockLink';
import { isClickTracker, } from '../../utils/validateType';

import CardContent from '../CardContent/CardContent';
import CardFooter from '../CardFooter/CardFooter';
import GridItem from '../Grid/GridItem';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import type { IsStackedType, } from '../Teaser/Teaser';
import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';
import type {
  ColorType,
  PaddingType,
  CardContentSeperator,
} from '../CardContent/cardContentStyle';
import type { ClickTrackerBannerType, } from '../../flowTypes/ClickTrackerBannerType';

type TeaserContentType = {
  data: TeaserDataType | ClickTrackerBannerType,
  isStacked: IsStackedType,
  /**
   * Should not be passed manually. Handled by the parent `<Grid>` component
   */
  gutter: number,
  gridItemMiscStyles: ?StyleProps,
  /**
   * pass an `onClick` event to the blockLink.
   * Useful for bi actions and events
   *
   * Should also be passed to underlying links, e.g.,
   * around the title and image
   */
  onClick: ?(evt: SyntheticMouseEvent<HTMLElement>) => void,

  // main content block props
  attrs: ?attrFlowType,
  backgroundColor: ?ColorType,
  color: ?ColorType,
  padding: ?PaddingType,
  /**
   * The width of the underlying `<TeaserContent />`.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <TeaserContent /> spans 25% (3 of 12 columns)
   * <TeaserContent width={3 / 12} />
   *
   * // responsive settings:
   * <TeaserContent
   *   width={[
   *     { from: 's', until: 'm', misc: 'landscape', value: 3 / 12 },
   *     { from: 'xl', value: 6 / 12 },
   *   ]}
   * />
   */
  width: ?number | ComponentPropResponsiveObject<number>[],
  miscStyles: ?StyleProps,

  // footer block props
  footerAttrs: ?attrFlowType,
  footerBackgroundColor: ?ColorType,
  footerColor: ?ColorType,
  footerPadding: ?PaddingType,
  footerSeperator: ?CardContentSeperator,
  footerMiscStyles: ?StyleProps,

  // render props
  renderContent: <T: TeaserDataType | ClickTrackerBannerType>(
    data: T
  ) => React.Node,
  renderFooter: ?<T: TeaserDataType | ClickTrackerBannerType>(
    data: T
  ) => React.Node,
};

TeaserContent.defaultProps = {
  isStacked: false,
  gutter: 0,
  gridItemMiscStyles: null,
  onClick: null,

  attrs: null,
  backgroundColor: null,
  color: null,
  padding: null,
  width: null,
  miscStyles: null,

  // footer block props
  footerAttrs: null,
  footerBackgroundColor: null,
  footerColor: null,
  footerPadding: null,
  footerSeperator: null,
  footerMiscStyles: null,

  // render props
  renderFooter: null,
};

export default () => null;
function TeaserContent({
  data,
  isStacked,
  gutter,
  gridItemMiscStyles,
  onClick,

  // main content block props
  attrs,
  backgroundColor,
  color,
  padding,
  width,
  miscStyles,

  // footer block props
  footerAttrs,
  footerBackgroundColor,
  footerColor,
  footerPadding,
  footerSeperator,
  footerMiscStyles,

  // render props
  renderContent,
  renderFooter,
}: TeaserContentType): React.Node {
  if (renderContent || renderFooter) {
    return (
      <GridItem
        width={width}
        gutter={gutter}
        stretchContent
        miscStyles={{
          position: 'relative',
          ...setStacking(isStacked),
          ...(gridItemMiscStyles || {}),
        }}
      >
        <BlockLinkInner
          href={isClickTracker(data) ? data.link : data.path}
          target={data.linkTarget}
          onClick={onClick}
        />
        <CardContent
          {...{ attrs, backgroundColor, color, padding, miscStyles, }}
        >
          {renderContent && renderContent(data)}
        </CardContent>

        {renderFooter && (
          <FelaTheme
            render={theme => (
              <CardFooter
                tagName="footer"
                attrs={footerAttrs}
                backgroundColor={footerBackgroundColor}
                color={footerColor}
                padding={footerPadding}
                seperator={footerSeperator}
                miscStyles={footerMiscStyles}
              >
                {renderFooter(data)}
              </CardFooter>
            )}
          />
        )}
      </GridItem>
    );
  }

  return null;
}

// /////////////////////////////////////////////////////////////////////
//                               Utils                                //
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
        flexGrow: '1',
        flexShrink: '0',
      }
      : {};
  }
  return {
    flexBasis: setValue(options, 'auto'),
    flexGrow: setValue(options, '1'),
    flexShrink: setValue(options, '0'),
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
