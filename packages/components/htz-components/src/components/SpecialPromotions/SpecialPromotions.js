import React from 'react';
import PropTypes, { oneOf, } from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, parseComponentProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Button from '../Button/Button';
import IconAlefLogo from '../Icon/icons/IconAlefLogo';
import IconTheMarker from '../Icon/icons/IconTheMarker';
import Title from '../ArticleHeader/Title';
import BlockLink from '../BlockLink/BlockLink';
import AboveBlockLink from '../BlockLink/AboveBlockLink';

const selectVariants = oneOf([ 'primary', 'primaryInverse', ]);

const SpecialPromotionsStyle = ({ theme, miscStyles, variant, }) => ({
  // backgroundColor: theme.color('specialPromotions', `${variant}Bg`),
  // backgroundColor: theme.color('quaternary'),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  extend: [
    // Trump all other styles with those defined in `miscStyles`
    parseComponentProp(undefined, variant, theme.mq, setVariant, theme.color),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

function setVariant(prop, variant, getColor) {
  return {
    backgroundColor: getColor('specialPromotions', `${variant}Bg`),
  };
}

const textStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignSelf: 'center',
  padding: '1rem',
  fontWeight: 'bold',
};
const IconStyle = {
  alignSelf: 'center',
  flexShrink: '0',
};
SpecialPromotions.propTypes = {
  /**
   * An object comes from polopoly for each special promotion.
   */
  data: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    urlText: PropTypes.string,
  }).isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /** The `<SpecialPromotions />`'s stylistic variant */
  variant: PropTypes.oneOfType([
    selectVariants,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: selectVariants.isRequired,
      })
    ),
  ]),
};
SpecialPromotions.defaultProps = {
  miscStyles: null,
  variant: 'primary',
};

function SpecialPromotions({
  data: { url, title, urlText, },
  miscStyles,
  variant,
}) {
  return (
    <BlockLink href={url}>
      <FelaComponent
        miscStyles={miscStyles}
        variant={variant}
        rule={SpecialPromotionsStyle}
        render={({ className, theme, }) => (
          <div className={className}>
            <FelaComponent
              style={textStyle}
              render={({ className, }) => {
                const LogoName =
                  variant === 'primary' ? IconAlefLogo : IconTheMarker;
                return (
                  <div className={className}>
                    <LogoName
                      fill={theme.specialPromotionStyle[variant].icon}
                      size={3}
                      miscStyles={IconStyle}
                    />
                    <Title
                      text={title}
                      level={2}
                      fontSize={-1}
                      miscStyles={{ padding: '1rem', }}
                    />
                  </div>
                );
              }}
            />
            <AboveBlockLink>
              {({ className, }) => (
                <div className={className} style={{ display: 'flex', }}>
                  <Button
                    variant={theme.specialPromotionStyle[variant].button}
                    href={url}
                  >
                    {urlText}
                  </Button>
                </div>
              )}
            </AboveBlockLink>
          </div>
        )}
      />
    </BlockLink>
  );
}

export default SpecialPromotions;
