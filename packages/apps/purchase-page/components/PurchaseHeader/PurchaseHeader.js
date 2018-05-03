import React from 'react';
import PropTypes from 'prop-types';
import { borderBottom, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import Router, { withRouter, } from 'next/router';
import { rgba, } from 'polished';
import {
  IconBack,
  IconMarkerLogo,
  IconHaaretzLogo,
  IconLock,
} from '@haaretz/htz-components';

const propTypes = {
  /** passed as a a prop by fela's withTheme func before default export */
  host: PropTypes.string.isRequired,
  router: PropTypes.shape().isRequired,
};

// const defaultProps = {};

const contStyle = theme => ({
  display: 'flex',
  justifyContent: 'space-around',
  extend: [
    borderBottom(
      theme.headerStyle.borderWidth,
      theme.headerStyle.lines,
      theme.headerStyle.borderStyle,
      theme.color('header', 'border')
    ),
  ],
});

const backLinkStyle = theme => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.color('header', 'backLinkText'),
});

const backLinkTextStyle = theme => ({
  extend: [ theme.mq({ until: 's', }, { display: 'none', }), ],
});

const logoContStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
};

const underLogoStyle = theme => ({
  letterSpacing: '0.5rem',
  color: theme.color('header', 'underLogoText'),
  extend: [ theme.type(1), ],
});

const trustedBadgeContStyle = theme => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-end',
  transform: 'translateY(50%)',
  backgroundColor: 'white',
  borderRadius: '50%',
});

const trustedBadgeCircleStyle = theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '10rem',
  height: '10rem',
  marginRight: '0.75rem',
  marginLeft: '0.75rem',
  marginTop: '0.75rem',
  marginBottom: '0.75rem',
  backgroundColor: theme.color('header', 'badgeBg'),
  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: '50%',
  borderColor: rgba(theme.color('header', 'badgeBorder'), 0.3),
  extend: [ theme.mq({ until: 's', }, { width: '8rem', height: '8rem', }), ],
});

const trustedBadgeContentStyle = theme => ({
  textAlign: 'center',
  color: theme.color('header', 'badgeText'),
  extend: [
    theme.type(-3, { lines: 2, fromBp: 's', }),
    theme.type(-5, { lines: 1.25, untilBp: 's', }),
  ],
});

function PurchaseHeader({ host, router, }) {
  return (
    <FelaComponent
      style={contStyle}
      render={({
        theme: { header: { backLinkText, underLogoText, trustedBadgeText, }, },
        className,
      }) => (
        <div className={className}>
          <FelaComponent
            style={backLinkStyle}
            render={({ className, }) => (
              <button
                className={className}
                onClick={() => {
                  /* TEMPORARY until we fix the routing */
                  // Router.back();
                  Router.push('/promotions-page/stage1', router.asPath);
                }}
              >
                <IconBack
                  miscStyles={{
                    transform: 'rotate(180deg)',
                    marginInlineEnd: '1.5rem',
                  }}
                />
                <FelaComponent style={backLinkTextStyle}>
                  {backLinkText}
                </FelaComponent>
              </button>
            )}
          />

          <FelaComponent style={logoContStyle}>
            {host === 'themarker.com' ? (
              <IconMarkerLogo
                size={4.5}
                color="primary"
                miscStyles={{ marginTop: '3rem', }}
              />
            ) : (
              <IconHaaretzLogo
                size={4.5}
                color="black"
                miscStyles={{ marginTop: '3rem', }}
              />
            )}
            <FelaComponent style={underLogoStyle}>
              {underLogoText[host]}
            </FelaComponent>
          </FelaComponent>
          <FelaComponent style={trustedBadgeContStyle}>
            <FelaComponent style={trustedBadgeCircleStyle}>
              <FelaComponent style={trustedBadgeContentStyle}>
                <IconLock
                  size={3}
                  miscStyles={{
                    display: 'block',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                  }}
                />
                <div>{trustedBadgeText}</div>
              </FelaComponent>
            </FelaComponent>
          </FelaComponent>
        </div>
      )}
    />
  );
}

PurchaseHeader.propTypes = propTypes;

// PurchaseHeader.defaultProps = defaultProps;

export default withRouter(PurchaseHeader);
