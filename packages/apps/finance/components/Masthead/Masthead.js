// @flow
import React from 'react';
import Link from 'next/link';
import config from 'config';
import { FelaComponent, } from 'react-fela';
import { Masthead, IconMarkerLogo, } from '@haaretz/htz-components';

import type { StatelessFunctionalComponent, } from 'react';

const connectionPreset: string = config.get('connectionPreset');
const getMenuId = () => {
  switch (connectionPreset) {
    case 'dev':
      return '7.7528';
    case 'dev2prod':
      return '7.7539983';
    default:
      return null;
  }
};

const Logo: StatelessFunctionalComponent<void> = () => (
  <FelaComponent
    style={(
      {
        theme
      }
    ) => ({
      marginLeft: 'auto',
      marginRight: 'auto',

      extend: [
        theme.mq(
          { from: 's', },
          {
            backgroundColor: theme.color('neutral', '-10'),
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }
        ),
      ]
    })}>{({ className, }) => (
      <Link
        href={{
          pathname: '/index',
        }}
        as="/"
      >
        <a className={className}>
          <IconMarkerLogo size={4} />
        </a>
      </Link>
    )}</FelaComponent>
);

export default () => <Masthead contentId={getMenuId()} Logo={Logo} />;
