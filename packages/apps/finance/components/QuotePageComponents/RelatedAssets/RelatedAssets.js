// @flow
import React from 'react';
import Link from 'next/link';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { Asset, } from '../../../types/asset';

type Props = {
  assets: Array<Asset>,
  miscStyles?: ?Object,
};

const RelatedAssets = ({ assets, miscStyles, }: Props): Node => (
  <FelaComponent
    style={theme => ({
      ...theme.type(-2),
      ':before': {
        content: '"ני"ע קשורים:"',
        marginEnd: '1rem',
        fontWeight: '700',
      },
      extend: [
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
    render="ul"
  >
    {assets.map(({ name, id, type, }: Asset) => (
      <FelaComponent
        key={id}
        style={{
          display: 'inline-block',
          marginEnd: '1rem',
          textDecoration: 'underline',
          ':not(:last-child)': {
            ':after': {
              content: '","',
            },
          },
        }}
        render="li"
      >
        <Link
          href={{
            pathname: `/asset/${type}`,
            query: {
              assetId: id,
              section: type,
            },
          }}
          as={`/${type}/${id}`}
        >
          <a>{name}</a>
        </Link>
      </FelaComponent>
    ))}
  </FelaComponent>
);

RelatedAssets.defaultProps = { miscStyles: null, };
export default RelatedAssets;
