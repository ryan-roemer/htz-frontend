// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderVertical, } from '@haaretz/htz-css-tools';

import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import Section from '../AutoLevels/Section';

type Props = {
  newsItems: [
    {
      href: string,
      toolTip: string,
      inputTemplate: string,
      contentId: string,
      contentName: string,
    },
  ],
  contentName: string,
};

function TopNews({ newsItems, contentName, }: Props): React.Node {
  return (
    <LayoutRow>
      <LayoutContainer
        tagname="section"
        namedBgc="white"
        miscStyles={{
          paddingBottom: '4rem',
          display: [ { until: 'l', value: 'none', }, ],
        }}
      >
        <FelaComponent
          style={theme => ({
            paddingInlineEnd: '4rem',
            paddingInlineStart: '4rem',
            extend: [
              theme.mq({ until: 'l', }, { display: 'none', }),
              theme.type(-1, { untilBp: 'xl', lines: 4, }),
              theme.type(-2, { fromBp: 'xl', }),
              borderVertical('2px', 1, 'solid', theme.color('bg')),
            ],
          })}
          render={({ theme, className, }) => (
            <Section tagName="div" className={className}>
              <FelaComponent
                style={{
                  color: theme.color('tertiary'),
                  display: 'inline',
                  fontWeight: '700',
                  paddingInlineEnd: '1rem',
                }}
                render={({ className: headerClassName, }) => (
                  <H className={headerClassName} offset={2}>
                    {contentName}
                  </H>
                )}
              />
              <FelaComponent style={{ display: 'inline-block', }} render="ul">
                {newsItems
                  && newsItems.map((link, idx) => {
                    const isLast = idx === newsItems.length - 1;
                    const hoverFocusStyle = {
                      textDecoration: 'underline',
                      textDecorationColor: theme.color('primary', '-2'),
                    };
                    return (
                      <FelaComponent
                        key={link.contentName}
                        style={{ display: 'inline-block', }}
                        render="li"
                      >
                        <FelaComponent
                          style={{
                            fontWeight: '700',
                            color: theme.color(
                              ...(isLast ? [ 'primary', '+1', ] : [ 'neutral', ])
                            ),
                            '&:hover': hoverFocusStyle,
                            '&:focus': hoverFocusStyle,
                          }}
                          render={({ className: linkClassName, }) => (
                            <HtzLink href={link.href} className={linkClassName}>
                              {link.contentName}
                            </HtzLink>
                          )}
                        />
                        {isLast ? null : ' | '}
                      </FelaComponent>
                    );
                  })}
              </FelaComponent>
            </Section>
          )}
        />
      </LayoutContainer>
    </LayoutRow>
  );
}

export default TopNews;
