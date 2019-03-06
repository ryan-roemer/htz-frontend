/* global window */
// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import ReactGA from 'react-ga';
import Section from '../AutoLevels/Section';
import Button from '../Button/Button';
import IconAlefLogoTransparent from '../Icon/icons/IconAlefLogoTransparent';
import H from '../AutoLevels/H';
import type { ListMarketingTeaserType, } from '../../flowTypes/ListMarketingTeaserType';

type MarketingTeaserViewPropTypes = {
  /** A marketing tool, title and subTitle. */
  marketingTeaser: ListMarketingTeaserType,
};

function MarketingTeaserView({ marketingTeaser, }: MarketingTeaserViewPropTypes): React.Node {
  const marketingTeaserGaHandler = React.useCallback(
    () => {
      ReactGA.ga('ec:addPromo', {
        name: 'Homepage-Promo-Tools-Section',
        id: 'Homepage-Promo-Tools-Section',
        position: 'HomePage',
        creative: marketingTeaser.subtitle,
      });
    },
    [ marketingTeaser.subtitle, ]
  );
  React.useEffect(
    () => {
      window.addEventListener('load', marketingTeaserGaHandler);
      return () => {
        window.removeEventListener('load', marketingTeaserGaHandler);
      };
    },
    [ marketingTeaserGaHandler, ]
  );

  return (
    <Section>
      <IconAlefLogoTransparent color="secondary" size={3} />
      <FelaComponent
        style={theme => ({ color: theme.color('secondary'), })}
        render={({ className: marketingHeaderClassName, }) => (
          <H className={marketingHeaderClassName}>{marketingTeaser.title}</H>
        )}
      />

      <FelaComponent
        style={theme => ({
          color: theme.color('secondary'),
          extend: [ theme.type(-1), ],
        })}
      >
        {marketingTeaser.subtitle}
      </FelaComponent>
      <Button
        variant="salesOpaque"
        boxModel={{ hp: 4, vp: 0.5, }}
        miscStyles={{ marginTop: '2rem', type: -1, }}
        href={marketingTeaser.href}
        onClick={() => {
          ReactGA.ga('ec:setAction', 'promo_click');
          ReactGA.ga(
            'send',
            'event',
            'Internal Promotions',
            'click',
            'Homepage-Promo-Tools-Section'
          );
        }}
      >
        {marketingTeaser.cta}
      </Button>
    </Section>
  );
}

export default MarketingTeaserView;
