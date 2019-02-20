import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import HtzLink from '../../HtzLink/HtzLink';
import IconFaceBookLogo from '../../Icon/icons/IconFacebookLogo';
import IconHaaretzLogo from '../../Icon/icons/IconHaaretzLogo';
import IconTwitter from '../../Icon/icons/IconTwitter';
import IconGPlus from '../../Icon/icons/IconGPlus';
import IconRss from '../../Icon/icons/IconRss';
import IconMail from '../../Icon/icons/IconMail';
import IconApple from '../../Icon/icons/IconApple';
import IconAndroid from '../../Icon/icons/IconAndroid';
import VisuallyHidden from '../../VisuallyHidden/VisuallyHidden';

const IconMiscStyle = {
  marginTop: [ { until: 's', value: '1.5rem', }, ],
  fontSize: [ { until: 's', value: '3.5rem', }, ],
};

const desktopHeadStyle = ({
  theme: {
    color,
    mq,
    footerBorderStyle: { borderWidth, lines, borderStyle, },
  },
}) => ({
  ...mq(
    { from: 's', },
    {
      ...borderBottom(
        borderWidth,
        lines,
        borderStyle,
        color('footer', 'border')
      ),
      alignItems: 'baseline',
      display: 'flex',
    }
  ),
});

const LogoMiscStyle = {
  marginBottom: '-0.5rem',
  paddingTop: [
    {
      until: 's',
      value: '1.5rem',
    },
  ],
};

const LogoStyle = ({
  theme: {
    color,
    mq,
    footerBorderStyle: {
      footerMobileBorderStyle: { borderWidth, lines, borderStyle, },
    },
  },
}) => ({
  marginBottom: '-1rem',
  ...mq(
    {
      until: 's',
    },
    {
      display: 'block',
      textAlign: 'center',
      paddingTop: '1.5rem',
      ...borderBottom(
        borderWidth,
        lines,
        borderStyle,
        color('footer', 'border')
      ),
    }
  ),
});

const IconsUlStyle = ({ theme, }) => ({
  marginInlineStart: 'auto',
  fontSize: '4rem',
  ...theme.mq(
    {
      until: 's',
    },
    {
      display: 'block',
      textAlign: 'center',
      marginBottom: '4rem',
    }
  ),
});

const IconsListStyle = ({ theme, isHiddenOnMobile, isLast, }) => ({
  display: 'inline-block',
  ...(!isLast ? { marginInlineEnd: '3rem', } : {}),
  extend: [
    theme.mq(
      {
        until: 's',
      },
      {
        display: isHiddenOnMobile ? 'none' : 'inline-block',
        marginTop: '1.5rem',
        fontSize: '3rem',
        marginInlineStart: '2rem',
      }
    ),
  ],
});

export default function FooterHead() {
  return (
    <FelaComponent style={desktopHeadStyle}>{({ className, theme, }) => (
        <div className={className}>
          <FelaComponent style={LogoStyle}>{({ className, }) => (
              <div className={className}>
                <IconHaaretzLogo size={6} miscStyles={LogoMiscStyle} />
                <VisuallyHidden>הארץ</VisuallyHidden>
              </div>
            )}</FelaComponent>
          <FelaComponent style={IconsUlStyle}>{({ className, }) => (
              <ul className={className}>
                <FelaComponent style={IconsListStyle}>{({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={(
                          <Fragment>
                            <VisuallyHidden>
                              facebook
                            </VisuallyHidden>
                            <IconFaceBookLogo miscStyles={IconMiscStyle} />
                          </Fragment>
)}
                        href="https://www.facebook.com/haaretz"
                      />
                    </li>
                  )}</FelaComponent>
                <FelaComponent style={IconsListStyle}>{({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={(
                          <Fragment>
                            <VisuallyHidden>
                              Twitter
                            </VisuallyHidden>
                            <IconTwitter miscStyles={IconMiscStyle} />
                          </Fragment>
)}
                        href="https://twitter.com/haaretz"
                      />
                    </li>
                  )}</FelaComponent>
                <FelaComponent isHiddenOnMobile style={IconsListStyle}>{({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={(
                          <Fragment>
                            <VisuallyHidden>
                              Android
                            </VisuallyHidden>
                            <IconAndroid />
                          </Fragment>
)}
                        href="https://play.google.com/store/apps/details?id=com.haaretz"
                      />
                    </li>
                  )}</FelaComponent>
                <FelaComponent isHiddenOnMobile style={IconsListStyle}>{({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={(
                          <Fragment>
                            <VisuallyHidden>
                              Apple
                            </VisuallyHidden>
                            <IconApple />
                          </Fragment>
)}
                        href="https://itunes.apple.com/us/app/id521559643"
                      />
                    </li>
                  )}</FelaComponent>
                <FelaComponent style={IconsListStyle}>{({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={(
                          <Fragment>
                            <VisuallyHidden>
                              Google Plus
                            </VisuallyHidden>
                            <IconGPlus miscStyles={IconMiscStyle} />
                          </Fragment>
)}
                        href="https://plus.google.com/+haaretzcoil"
                      />
                    </li>
                  )}</FelaComponent>
                <FelaComponent isHiddenOnMobile style={IconsListStyle}>{({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={(
                          <Fragment>
                            <VisuallyHidden>
                              Email
                            </VisuallyHidden>
                            <IconMail />
                          </Fragment>
)}
                        href="https://www.haaretz.co.il/misc/redemail"
                      />
                    </li>
                  )}</FelaComponent>
                <FelaComponent isLast isHiddenOnMobile style={IconsListStyle}>{({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={(
                          <Fragment>
                            <VisuallyHidden>
                              RSS
                            </VisuallyHidden>
                            <IconRss />
                          </Fragment>
)}
                        href="https://www.haaretz.co.il/misc/rss"
                      />
                    </li>
                  )}</FelaComponent>
              </ul>
            )}</FelaComponent>
        </div>
      )}</FelaComponent>
  );
}
