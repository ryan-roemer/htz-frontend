// @flow
import React from 'react';
import type { ChildrenArray, Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import Link from 'next/link';
import { IconBack, } from '@haaretz/htz-components';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  href:
    | string
    | {
        pathname: string,
        query: Object,
      },
  as: string,
  children: ChildrenArray<Node> | Node,
  miscStyles?: ?Object,
};

const SectionLink = ({ href, as, children, miscStyles, }: Props): Node => (
  <FelaComponent
    style={(
      {
        theme
      }
    ) => ({
      ...theme.type(-2),
      backgroundColor: theme.color('neutral', '-5'),
      color: theme.color('neutral', '-1'),
      display: 'block',
      fontWeight: '700',
      paddingBottom: '1rem',
      paddingTop: '1rem',
      textAlign: 'center',

      extend: [
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ]
    })}>{({ className, }) => (
      <Link href={href} as={as}>
        <a className={className}>
          {children}
          <IconBack size={-1} />
        </a>
      </Link>
    )}</FelaComponent>
);

SectionLink.defaultProps = { miscStyles: null, };
export default SectionLink;
