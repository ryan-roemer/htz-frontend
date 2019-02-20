import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';
import H from '../AutoLevels/H';

const SectionTitleA = ({ title, isInMargin, id, }) => (
  <FelaComponent
    style={({ theme, }) => ({
      color: theme.color('primary'),
      fontWeight: 'bold',
      position: 'relative',
      paddingInlineStart: `${theme.layoutStyle.startColumnPadding}rem`,
      extend: [
        theme.mq({ until: 's', }, { paddingInlineStart: `${theme.layoutStyle.contPaddingS}rem`, }),
        theme.mq(
          { from: 'xl', },
          { paddingInlineStart: `${theme.layoutStyle.startColumnPaddingXL}rem`, }
        ),
        theme.type(3, { fromBp: 'l', }),
        theme.type(1, { untilBp: 'l', }),
        borderTop('2px', 2, 'solid', theme.color('primary')),
      ],
    })}
  >
    {({ className, }) => (
      <H className={className} id={id}>
        {isInMargin ? (
          <FelaComponent
            style={({ theme, }) => {
              const layoutStyle = theme.layoutStyle;
              return {
                extend: [
                  theme.mq(
                    { from: 'l', },
                    {
                      position: 'absolute',
                      overflow: 'hidden',
                    }
                  ),
                  theme.mq(
                    { from: 'l', until: 'xl', },
                    {
                      insetInlineStart: `${layoutStyle.startColumnPadding}rem`,
                      maxWidth: `${layoutStyle.startColumnWidthL
                        - layoutStyle.startColumnPadding}rem`,
                    }
                  ),
                  theme.mq(
                    { from: 'xl', },
                    {
                      insetInlineStart: `${layoutStyle.startColumnPaddingXL}rem`,
                      maxWidth: `${layoutStyle.startColumnWidthXL
                        - layoutStyle.startColumnPaddingXL}rem`,
                    }
                  ),
                ],
              };
            }}
          >
            <span>{title}</span>
          </FelaComponent>
        ) : (
          title
        )}
      </H>
    )}
  </FelaComponent>
);

SectionTitleA.propTypes = {
  title: PropTypes.string.isRequired,
  isInMargin: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

SectionTitleA.defaultProps = {};

export default SectionTitleA;
