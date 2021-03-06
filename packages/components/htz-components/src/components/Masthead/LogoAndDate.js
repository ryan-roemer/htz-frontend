// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import {
  type StyleProps,
  type ComponentPropResponsiveObject,
} from '@haaretz/htz-css-tools';
import PageDateTime from './PageDateTime';
import HtzLink from '../HtzLink/HtzLink';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';

type LogoAndDateProps = {
  logoMiscStyles: ?StyleProps,
  logoComponent: React.ElementType,
  disableDatetime: ?boolean,
  logoSize: ?number | ComponentPropResponsiveObject<number>[],
  datetimeMiscStyles: ?StyleProps,
  tabIndex: ?number,
};

export default function LogoAndDate({
  logoComponent,
  disableDatetime,
  logoSize,
  logoMiscStyles,
  datetimeMiscStyles,
  tabIndex,
}: LogoAndDateProps) {
  const Logo = logoComponent;

  return (
    <FelaComponent
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      render={({ className, theme: { homepageLogoLink, }, }) => (
        <div className={className}>
          {Logo ? (
            <HtzLink href="/" attrs={{ tabIndex, }}>
              <Logo size={logoSize} miscStyles={logoMiscStyles} />
              <VisuallyHidden>{homepageLogoLink.a11yText}</VisuallyHidden>
            </HtzLink>
          ) : null}
          {disableDatetime ? null : (
            <PageDateTime miscStyles={datetimeMiscStyles} />
          )}
        </div>
      )}
    />
  );
}

LogoAndDate.defaultProps = {
  logoMiscStyles: null,
  datetimeMiscStyles: null,
  disableDatetime: false,
  logoSize: 4,
  tabIndex: 0,
};
