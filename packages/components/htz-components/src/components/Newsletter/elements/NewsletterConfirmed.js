import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import Button from '../../Button/Button'; // eslint-disable-line import/no-named-as-default
import { responsivePropBaseType, } from '../../../propTypes/responsivePropBaseType';
import { newsletterVariantType, } from './types/newsletterVariantType';
import IconClose from '../../Icon/icons/IconClose';

const NewsLetterConfirmedWrapperStyle = ({ theme, variant, }) => ({
  textAlign: 'center',
  extend: [
    parseComponentProp(
      undefined,
      variant,
      theme.mq,
      setWrapperVariant,
      theme.color,
      theme
    ),
  ],
});

function setWrapperVariant(prop, variant, getColor) {
  return {
    backgroundColor: getColor('newsletter', `${variant}Bg`),
    color: getColor('newsletter', `${variant}Text`),
  };
}

const inputUpperNoteStyle = ({ theme, variant, }) => ({
  paddingBottom: '1rem',
  extend: [
    theme.type(-1),
    parseComponentProp(undefined, variant, theme.mq, setVariant, theme.color),
  ],
});

function setVariant(prop, variant, getColor, isError) {
  return {
    color: getColor('newsletter', `${variant}TextTitle`),
  };
}
const closeButtonStyle = {
  display: 'inline-block',
  position: 'absolute',
  left: '0',
  top: '0.5rem',
  paddingTop: '0',
};

const ButtonStyle = {
  marginTop: '1rem',
  type: -1,
  marginBottom: '1rem',
};

NewsletterConfirmed.propTypes = {
  /**
   * Function that handle on close click.
   */
  closeConfirmation: PropTypes.func.isRequired,
  /** determine newsletter host if exists */
  host: PropTypes.oneOf([ 'tm', 'htz', ]),
  /** The Registration status to the newletter */
  signUpStatus: PropTypes.oneOf([ 'ok', 'alredyRegister', 'failed', ]).isRequired,
  /** The TextInput stylistic variant */
  // used for styling
  variant: PropTypes.oneOfType([
    newsletterVariantType,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: newsletterVariantType.isRequired,
      })
    ),
  ]),
};

NewsletterConfirmed.defaultProps = {
  host: null,
  variant: 'highlight',
};

export default function NewsletterConfirmed({
  closeConfirmation,
  variant,
  host,
  signUpStatus,
}) {
  return (
    <FelaComponent
      variant={variant}
      rule={NewsLetterConfirmedWrapperStyle}
      render={({ className, theme, }) => {
        const {
          buttons: { newsletterConfirmedButton, },
          texts: { newsletterConfirmedText, newsletterConfirmedTitleText, },
        } = theme.newsletterI18n;
        return (
          <div className={className}>
            <Button
              isFlat
              boxModel={{ hp: 1, vp: 1, }}
              onClick={closeConfirmation}
              variant={theme.newsletterStyle[variant].buttonVariant}
              miscStyles={closeButtonStyle}
            >
              <IconClose size={2} />
            </Button>
            <FelaComponent
              variant={variant}
              rule={inputUpperNoteStyle}
              render="p"
            >
              <strong>{newsletterConfirmedTitleText[signUpStatus]}</strong>
            </FelaComponent>
            <FelaComponent
              variant={variant}
              rule={inputUpperNoteStyle}
              render="p"
            >
              {newsletterConfirmedText[signUpStatus]}
            </FelaComponent>
            <Button
              boxModel={{ hp: 3, vp: 1, }}
              miscStyles={ButtonStyle}
              variant={theme.newsletterStyle[variant].buttonVariant}
              {...(signUpStatus === 'failed'
                ? { onClick: () => closeConfirmation(), }
                : {
                  href:
                      host === 'tm'
                        ? 'https://www.themarker.com/personal-area/newsletter'
                        : 'https://www.haaretz.co.il/personal-area/newsletter',
                })}
            >
              {newsletterConfirmedButton[signUpStatus]}
            </Button>
          </div>
        );
      }}
    />
  );
}
