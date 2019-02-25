// @flow
import React from 'react';
import gql from 'graphql-tag';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { H, Grid, GridItem, Query, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, AssetType, } from '../../types/asset';

import SectionLink from '../SectionLink/SectionLink';

const MarketSummaryQuery: DocumentNode = gql`
  query MarketSummary($assetsId: [String]!) {
    assetsList(assetsId: $assetsId) {
      name
      value
      changePercentage
      id
      type
    }
  }
`;

type AssetData = {
  name: string,
  value: number,
  changePercentage: number,
  id: string,
  type: AssetType,
};

type Props = {
  asset: AssetData,
  miscStyles: ?Object,
};

const numToString: number => string = num => num.toLocaleString('he', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type ItemProps = {
  children: (className: string) => Node,
  title: ?string,
  miscStyles: ?Object,
};

const Item = ({ children, title, miscStyles, }: ItemProps): Node => (
  <FelaComponent
    style={({ theme, }) => ({
      alignItems: 'center',
      display: 'flex',
      flexBasis: '100%',
      flexDirection: 'column',
      flexGrow: '1',
      flexShrink: '1',
      justifyContent: 'center',
      position: 'relative',

      ':not(:last-child)': {
        ':after': {
          backgroundColor: theme.color('neutral', '-4'),
          content: '""',
          end: '0',
          height: '80%',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
        },
      },
    })}
  >
    <FelaComponent
      style={({ theme, }) => ({
        fontWeight: '700',
        ...theme.type(-1),
      })}
      as="span"
    >
      {title}
    </FelaComponent>
    <FelaComponent
      style={({ theme, }) => ({
        flexGrow: '1',
        ...theme.type(2),

        extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
      })}
    >
      {({ className, }) => children(className)}
    </FelaComponent>
  </FelaComponent>
);

Item.defaultProps = {
  title: null,
  miscStyles: null,
};

const MarketSummary = ({ asset, miscStyles, }: Props): Node => {
  const { name, value, changePercentage, id, type, } = asset;
  return (
    <FelaTheme>
      {theme => (
        <FelaComponent
          style={{
            extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
          }}
        >
          <FelaComponent
            style={{
              backgroundColor: theme.color('neutral', '-10'),
              marginBottom: '1px',
              paddingTop: '1rem',
              textAlign: 'center',
            }}
          >
            <FelaComponent
              style={{
                ...theme.type(1),
                marginBottom: '1rem',
              }}
            >
              {({ className, }) => <H className={className}>{name}</H>}
            </FelaComponent>
            <FelaComponent
              style={{
                display: 'flex',
              }}
            >
              <Item title="שער">
                {className => <span className={className}>{numToString(value)}</span>}
              </Item>
              <Item
                title="% שינוי"
                miscStyles={{
                  color:
                    Number(changePercentage) < 0
                      ? theme.color('negative')
                      : theme.color('positive'),
                  direction: 'ltr',
                  ':before': {
                    content:
                      Number(changePercentage) > 0
                        ? '"+"'
                        : Number(changePercentage) < 0
                          ? '"-"'
                          : '""',
                  },
                  ':after': {
                    content: '"%"',
                  },
                }}
              >
                {className => (
                  <span className={className}>
                    {numToString(Math.abs(Number(changePercentage)))}
                  </span>
                )}
              </Item>
            </FelaComponent>
          </FelaComponent>
          <SectionLink
            href={{
              pathname: type ? `/asset/${type}` : '/',
              query: {
                assetId: id,
                section: type,
              },
            }}
            as={`/${type || ''}/${id || ''}`}
            miscStyles={{
              backgroundColor: theme.color('neutral', '-10'),
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            <span>
              לבורסת
              {name}
            </span>
          </SectionLink>
        </FelaComponent>
      )}
    </FelaTheme>
  );
};

export default ({ miscStyles, }: { miscStyles: ?Object, }): Node => (
  <Query
    query={MarketSummaryQuery}
    variables={{
      assetsId: [ '2', '142', '137', ],
    }}
  >
    {({ loading, error, data: { assetsList: assets, }, }) => {
      if (error) return null;
      if (loading) return null;
      return (
        <Grid>
          {assets.map((asset: Asset) => (
            <GridItem key={asset.id} width={1 / 3}>
              <MarketSummary key={asset.id} miscStyles={miscStyles} asset={asset} />
            </GridItem>
          ))}
        </Grid>
      );
    }}
  </Query>
);
