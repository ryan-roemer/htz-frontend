// @flow

import { type ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import * as React from 'react';

import useScrollYPosition from '../../hooks/useScrollYPosition';
import ArticlePageMasthead from './ArticlePageMasthead';
import HomePageMasthead from './HomePageMasthead';
import MobileNavigation from '../MobileNavigationMenu/MobileNavigationMain';

type ColorBaseType = string | [string, ] | [string, string, ];
export type ColorType = ColorBaseType | ComponentPropResponsiveObject<ColorBaseType>[];

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
  const isScrolled=false;
  const shouldDisplay=false;
  // console.log(
  //   [
  //     '!!!!\n\n\n',
  //     `y: ${y}`,
  //     `velocity: ${velocity}`,
  //     `shouldDisplay: ${shouldDisplay}`,
  //     `isScrolled: ${isScrolled}`,
  //   ].join('\n')
  // );analyzeOriginalValue

  return (
    <React.Fragment>
      <MastheadComponent isScrolled={isScrolled} shouldDisplay={shouldDisplay} {...props} />
      <BottomMobileNav shouldDisplay={shouldDisplay} contentId={contentId} />
    </React.Fragment>
  );
}

const MastheadComponent = React.memo(({ pageType, ...props }) => (pageType === 'homepage' ? <HomePageMasthead {...props} /> : <ArticlePageMasthead {...props} />)
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
        // TODO: This is wrong, it means that modals will be covered
        //       which they never should.
        zIndex: theme.getZIndex('modal', 1),
        extend: [
          theme.getDelay('transition', -1),
          theme.getDuration('transition', -1),
          theme.getTimingFunction('transition', 'linear'),
          theme.mq({ until: 's', misc: 'vertical', }, { display: 'initial', }),
          theme.mq({ until: 'm', misc: 'vertical', }, { display: 'initial', }),
        ],
      })}
    >
      <MobileNavigation contentId={contentId} shouldDisplay={shouldDisplay} />
    </FelaComponent>
  )
);
