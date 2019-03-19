// @flow
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import MastheadWrapper from './MastheadWrapper';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import HeaderSearch from './MastheadSearch/MastheadSearch';
import MastheadUserTools from './MastheadUserTools';
import type { ColorType, } from './Masthead';

type ArticlePageMastheadProps = {
  contentId: string,
  logo: React.ElementType,
  rowBgc: ?ColorType,
  shouldDisplay: boolean,
  mastheadFullWidth: boolean,
};

const mastheadWrapperMiscStyles = ({ theme, shouldDisplay, }) => ({
  transitionProperty: 'transform',
  ...theme.getDelay('transition', -1),
  ...theme.getDuration('transition', -1),
  ...theme.getTimingFunction('transition', 'linear'),
  transform: [
    { until: 's', value: shouldDisplay ? 'translateY(0)' : 'translateY(-115%)', },
  ],
  padding: [
    { until: 's', value: '2rem  0 1rem 0', },
    { from: 's', value: '2rem 0 0 0', },
  ],
  borderBottom: [ '1px', 1, 'solid', theme.color('primary'), ],
});

ArticlePageMasthead.defaultProps = { rowBgc: null, mastheadFullWidth: false, };
export default function ArticlePageMasthead({
  contentId,
  logo,
  rowBgc,
  shouldDisplay,
  mastheadFullWidth,
}: ArticlePageMastheadProps): React.Node {
  const MastheadContainer = mastheadFullWidth ? FelaComponent : LayoutContainer;
  return (
    <FelaTheme
      render={theme => (
        <LayoutRow
          namedBgc={
            rowBgc || [
              { until: 's', value: 'transparent', },
              { from: 's', value: [ 'bg', ], },
            ]
          }
          miscStyles={{
            position: [
              { until: 's', value: 'sticky', },
              { from: 's', value: 'relative', },
            ],
            top: [ { until: 's', value: 0, }, ],
            zIndex: theme.getZIndex('masthead'),
          }}
        >
          <MastheadContainer
            {...(mastheadFullWidth ? {
              style: { extend: parseStyleProps(mastheadWrapperMiscStyles({ theme, shouldDisplay, }), theme.mq, theme.type), },
            } : {
              miscStyles: mastheadWrapperMiscStyles({ theme, shouldDisplay, }),
            })}
          >
            <MastheadWrapper
              logo={logo}
              disableDatetime
              logoSize={3.5}
              logoMiscStyles={{
                display: 'block',
                transform: [ { from: 's', value: 'translateY(-0.5rem)', }, ],
              }}
              disablePanels="bottom"
              panelsResponsiveHiding={[ { until: 's', value: 'sides', }, ]}
              renderStartPanel={(toggleOther, toggleMe) => (
                <React.Fragment>
                  <NavigationMenu contentId={contentId} />
                  <HeaderSearch onClick={toggleOther} />
                </React.Fragment>
              )}
              renderEndPanel={(toggleOther, toggleMe) => (
                <React.Fragment>
                  <MastheadUserTools />
                </React.Fragment>
              )}
            />
          </MastheadContainer>
        </LayoutRow>
      )}
    />
  );
}
