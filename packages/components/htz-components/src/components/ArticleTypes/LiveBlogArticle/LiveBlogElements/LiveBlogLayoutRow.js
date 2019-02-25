import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import SectionTitleA from '../../../SectionTitleA/SectionTitleA';
import Section from '../../../AutoLevels/Section';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';

const margineliaStyle = ({ theme, hideUnderLargeBreakPoint, }) => ({
  extend: [
    ...(hideUnderLargeBreakPoint ? [ theme.mq({ until: 'l', }, { display: 'none', }), ] : []),
    theme.mq(
      { from: 'l', },
      {
        position: 'absolute',
        height: '100%',
      }
    ),
    theme.mq(
      { from: 'l', until: 'xl', },
      {
        start: `${theme.layoutStyle.startColumnPadding}rem`,
        maxWidth: `${theme.layoutStyle.startColumnWidthL - theme.layoutStyle.startColumnPadding}rem`,
      }
    ),
    theme.mq(
      { from: 'xl', },
      {
        start: `${theme.layoutStyle.startColumnPaddingXL}rem`,
        maxWidth: `${theme.layoutStyle.startColumnWidthXL - theme.layoutStyle.startColumnPaddingXL}rem`,
      }
    ),
  ],
});

const wrapperStyle = ({ miscStyles, theme, }) => ({
  ...theme.mq({ from: 'l', }, { marginTop: '4rem', }),
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});

const LiveBlogLayoutRow = ({
  children,
  id,
  isArticleBody,
  title,
  margineliaComponent,
  hideMargineliaComponentUnderLBp,
  isCommentsSection,
  miscStyles,
}) => (
  <FelaComponent miscStyles={miscStyles} style={wrapperStyle}>
    {({ className, theme, }) => (
      <Section className={className}>
        {title ? (
          <SectionTitleA isInMargin={!!(id === 'commentsSection')} title={title} id={id || null} />
        ) : null}
        <FelaComponent
          style={({ theme, }) => ({
            position: 'relative',
            ...(!title ? { backgroundColor: theme.color('primary', '-6'), } : {}),
            extend: [
              theme.mq(
                { from: 'l', until: 'xl', },
                { paddingInlineStart: `${theme.layoutStyle.startColumnWidthL}rem`, }
              ),
              theme.mq({ from: 'xl', }, { paddingInlineStart: `${theme.layoutStyle.startColumnWidthXL}rem`, }),
            ],
          })}
        >
          <FelaComponent
            style={margineliaStyle}
            hideUnderLargeBreakPoint={hideMargineliaComponentUnderLBp}
          >
            {margineliaComponent || null}
          </FelaComponent>

          <FelaComponent
            style={(
              {
                theme,
              }
            ) => ({
              ...(isCommentsSection
                ? {
                  ...theme.mq(
                    { until: 's', },
                    { paddingInlineStart: '3rem', paddingInlineEnd: '3rem', }
                  ),
                  ...theme.mq(
                    { from: 's', until: 'l', },
                    { paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }
                  ),
                }
                : {}),

              extend: [
                theme.mq({ from: 'l', }, { marginInlineStart: '8rem', }),
              ],
            })}
          >
            {children}
          </FelaComponent>
        </FelaComponent>
      </Section>
    )}
  </FelaComponent>
);

LiveBlogLayoutRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  id: PropTypes.string,
  isArticleBody: PropTypes.bool,
  isCommentsSection: PropTypes.bool,
  title: PropTypes.string,
  margineliaComponent: PropTypes.arrayOf(PropTypes.element),
  hideMargineliaComponentUnderLBp: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

LiveBlogLayoutRow.defaultProps = {
  children: null,
  id: null,
  isArticleBody: false,
  isCommentsSection: false,
  title: null,
  margineliaComponent: null,
  hideMargineliaComponentUnderLBp: true,
  miscStyles: null,
};

export default LiveBlogLayoutRow;
