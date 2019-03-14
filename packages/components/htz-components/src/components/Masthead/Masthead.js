// @flow

import { type ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import * as React from 'react';
import { dispatchEvent, } from '@haaretz/app-utils';

import useScrollYPosition from '../../hooks/useScrollYPosition';
import ArticlePageMasthead from './ArticlePageMasthead';
import HomePageMasthead from './HomePageMasthead';
import MobileNavigation from '../MobileNavigationMenu/MobileNavigationMain';

type ColorBaseType = string | [string, ] | [string, string, ];
export type ColorType =
  | ColorBaseType
  | ComponentPropResponsiveObject<ColorBaseType>[];

type MastheadProps = {
  pageType: string,
  contentId: string,
  logo: React.ElementType,
  rowBgc: ?ColorType,
  containerBgc: ?ColorType,
};
type State = {
  isScrolled: boolean,
  shouldDisplay: boolean,
};

Masthead.defaultProps = { rowBgc: null, containerBgc: null, };
export default function Masthead(props: MastheadProps): React.Node {
  const { contentId, } = props;
  const { y, velocity, } = useScrollYPosition({ throttle: 100, });
  const velocityThreshold = 0;
  const initialState: State = {
    isScrolled: y > 250,
    shouldDisplay: y < 200 || velocity < velocityThreshold,
  };
  const [ { isScrolled, shouldDisplay, }, setState, ] = React.useState(
    initialState
  );

  React.useEffect(
    () => {
      // only relevant on mobile
      // eslint-disable-next-line no-undef
      if (matchMedia('(max-width: 37.5em)').matches) {
        // $FlowFixMe
        setState({
          isScrolled: y > 250,
          shouldDisplay:
            (shouldDisplay && velocity <= 0)
            || y < 200
            || velocity < velocityThreshold,
        });
      }
    },
    [ y, velocity, ]
  );

  React.useEffect(
    () => {
      // eslint-disable-next-line no-undef
      dispatchEvent(document, 'mastheadVisibility', {
        isVisible: shouldDisplay,
      });
    },
    [ shouldDisplay, ]
  );

  return (
    <React.Fragment>
      <MastheadComponent
        isScrolled={isScrolled}
        shouldDisplay={shouldDisplay}
        {...props}
      />
      <BottomMobileNav shouldDisplay={shouldDisplay} contentId={contentId} />
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          bottom: '100px',
          left: 0,
          padding: 12,
          position: 'fixed',
          textAlign: 'center',
          width: '100%',
          zIndex: 100,
        }}
      >
        <strong>{`y: ${y.toFixed(3)} velocity: ${velocity.toFixed(3)}`}</strong>
        <br />
        {`shouldDisplay: ${shouldDisplay ? 'true' : 'false'} isScrolled: ${
          isScrolled ? 'true' : 'false'
        }`}
      </div>
    </React.Fragment>
  );
}

const MastheadComponent = React.memo(({ pageType, ...props }) => (pageType === 'homepage' ? (
  <HomePageMasthead {...props} />
) : (
  <ArticlePageMasthead {...props} />
))
);
const BottomMobileNav = React.memo(
  ({ shouldDisplay, contentId, }): React.Node => (
    <FelaComponent
      style={theme => ({
        backgroundColor: 'transparent',
        display: 'none',
        transform: `translate(50%, ${shouldDisplay ? '0' : '110'}%)`,
        transitionProperty: 'transform',
        position: 'fixed',
        start: '50%',
        bottom: '0',
        width: '100%',
        zIndex: theme.getZIndex('masthead', 1),
        extend: [
          theme.getDelay('transition', -1),
          theme.getDuration('transition', -1),
          theme.getTimingFunction('transition', 'linear'),
          theme.mq({ until: 's', }, { display: 'initial', }),
          theme.mq({ until: 'm', misc: 'landscape', }, { display: 'initial', }),
        ],
      })}
    >
      <MobileNavigation contentId={contentId} shouldDisplay={shouldDisplay} />
    </FelaComponent>
  )
);
