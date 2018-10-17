import React, { Fragment, } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { IconBack, } from '@haaretz/htz-components';

import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, } from '../../types/asset';

import { TdComponent, } from '../AssetsTable/AssetsTable';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import SectionLink from '../SectionLink/SectionLink';

const TableQuery: (Array<string>) => DocumentNode = fields => gql`
  query Table(
    $parentId: String,
    $assetSubSection: String,
    $assetsId: [String],
    $count: Int!,
    $sortBy: String!,
    $sortOrder: String!,
    $offset: Int!
  ) {
    financeTable(
      parentId: $parentId,
      assetSubSection: $assetSubSection,
      assetsId: $assetsId,
      count: $count,
      sortBy: $sortBy,
      sortOrder: $sortOrder,
      offset: $offset
    ) {
      id
      type
      ${fields.map(field => `${field.name}\n`)}
    }
  }
`;

type FieldType = {
  name: string,
  display: string,
  sortingOrder: 'ascend' | 'descend',
  style?: Object => StyleProps,
  value: Object => string,
}

type Props = {
  miscStyles?: StyleProps,
  headerMiscStyles?: StyleProps,
  initialSort: string, // eslint-disable-line react/no-unused-prop-types
  fields: Array<FieldType>,
  parentId?: string,
  assetsId?: Array<string>,
  type?: string,
  assetSubSection?: string,
  linkText: ?string,
  addLink: ?boolean,
  count?: number,
  loadMore: ?boolean,
};

type State = {
  loadMore: boolean,
  sortBy?: string,
  sortOrder: string,
};

type SortIconsProps = {
  active: boolean,
  direction: string,
};

type TableLinkProps = {
  content: string,
  assetId: string,
  type: string,
  allowTab?: boolean,
};

// eslint-disable-next-line react/prop-types
const SortIcons: SortIconsProps => Node = ({ active, sortOrder, }) => (
  <FelaComponent
    style={{
      fontSize: '1.5rem',
      marginEnd: '1rem',
    }}
    render={({ theme, className, }) => {
      const ascendFill: string =
        active && sortOrder === 'ascend'
          ? theme.color('neutral', '-2')
          : theme.color('neutral', '-4');
      const descendFill: string =
        active && sortOrder === 'descend'
          ? theme.color('neutral', '-2')
          : theme.color('neutral', '-4');
      return (
        <svg className={className} viewBox="0 0 20 40" width="0.5em" height="1em">
          <polygon fill={ascendFill} points="0,15 10,0 20,15" />
          <polygon fill={descendFill} points="0,25 10,40 20,25" />
        </svg>
      );
    }}
  />
);

// eslint-disable-next-line react/prop-types
export const TableLink: TableLinkProps => Node = ({ content, assetId, type, allowTab, }) => (
  <FelaComponent
    style={{
      display: 'inline-block',
      width: '100%',
    }}
    render={({ className, }) => (
      <Link
        href={{
          pathname: `/asset/${type}`,
          query: {
            assetId,
            section: type,
          },
        }}
        as={`/${type}/${assetId}`}
      >
        <a
          {...!allowTab ? { tabIndex: -1, } : {}}
          className={className}
        >
          {content}
        </a>
      </Link>
    )}
  />
);

const tdHeaderStyle: (Object, StyleProps) => Object = (theme, miscStyles) => ({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'start',
  backgroundColor: theme.color('neutral', '-6'),
  extend: [
    ...(miscStyles
      ? parseStyleProps(miscStyles, theme.mq, theme.type)
      : []),
  ],
});

class SortableTable extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
    headerMiscStyles: null,
    assetsId: null,
    parentId: null,
    type: null,
    assetSubSection: null,
    count: 5,
  };

  state = {
    sortBy: null,
    sortOrder: null,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      sortBy: prevState.sortBy || nextProps.initialSort,
      sortOrder: prevState.sortOrder ||
        nextProps.fields.find((field: FieldType) => (
          field.name === nextProps.initialSort
        )).sortingOrder,
    };
  }

  reSort: FieldType => void = field => {
    const { sortBy, sortOrder, } = this.state;
    this.setState({
      sortBy: field.name,
      sortOrder:
        sortBy !== field.name ? field.sortingOrder :
          sortOrder === 'descend' ? 'ascend' : 'descend',
    });
  };

  render(): Node {
    const {
      miscStyles,
      headerMiscStyles,
      fields,
      parentId,
      type,
      linkText,
      assetsId,
      addLink,
      count,
      loadMore,
      assetSubSection,
    } = this.props;
    const { sortBy, sortOrder, } = this.state;
    return (
      <Query
        query={TableQuery(fields)}
        variables={{
          parentId,
          assetsId,
          count: assetsId ? assetsId.length : count,
          sortBy,
          sortOrder,
          assetSubSection,
          offset: 0,
        }}
      >
        {({ loading, error, data, fetchMore, }) => {
          if (error) return null;
          if (loading) return null;
          const { financeTable: assets, }: Array<Asset> = data;
          return (
            <Fragment>
              <FelaComponent
                style={(theme: Object) => ({
                  ...theme.type(-2),
                  tableLayout: 'fixed',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  extend: [
                    ...(miscStyles
                      ? parseStyleProps(miscStyles, theme.mq, theme.type)
                      : []),
                  ],
                })}
                render="table"
              >
                <thead>
                  <tr>
                    {fields.map((field: FieldType) => (
                      <TdComponent
                        miscStyles={{
                        paddingTop: '0',
                        paddingBottom: '0',
                      }}
                      >
                        <FelaComponent
                          style={{ width: '100%', }}
                          render={({ className, }) => (
                            <button
                              className={className}
                              onClick={() => this.reSort(field)}
                            >
                              <FelaComponent
                                style={theme => ({
                                  ...tdHeaderStyle(theme, headerMiscStyles),
                                  paddingEnd: '2rem',
                                  fontWeight: sortBy === field.name ? '700' : '300',
                                })}
                              >
                                <SortIcons
                                  active={sortBy === field.name}
                                  sortOrder={sortOrder}
                                />
                                {field.display}
                              </FelaComponent>
                            </button>
                          )}
                        />
                      </TdComponent>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset: Asset) => (
                    <FelaComponent
                      style={theme => ({
                        backgroundColor: theme.color('neutral', '-10'),
                        extend: [
                          borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
                        ],
                      })}
                      render="tr"
                    >
                      {fields.map((field: FieldType, index: number) => (
                        <TdComponent
                          miscStyles={{
                            ...(field.style ? field.style(asset) : {}),
                            paddingStart: '2rem',
                          }}
                        >
                          <TableLink
                            allowTab={index === 0}
                            content={field.value(asset)}
                            assetId={asset.id}
                            type={asset.type}
                          />
                        </TdComponent>
                      ))}
                    </FelaComponent>
                  ))}
                </tbody>
              </FelaComponent>
              {
                addLink && type ?
                  <SectionLink
                    href={{
                      pathname: `/${type || ''}`,
                      query: {
                        parentId,
                      },
                    }}
                    as={`/${type || ''}/${parentId || ''}`}
                  >
                    <span>{linkText || ''}</span>
                  </SectionLink>
                  : null
              }
              {
                loadMore && assets.length <= count ?
                  <FelaComponent
                    style={theme => ({
                      ...theme.type(-2),
                      backgroundColor: theme.color('neutral', '-5'),
                      color: theme.color('neutral', '-1'),
                      display: 'block',
                      fontWeight: '700',
                      paddingBottom: '1rem',
                      paddingTop: '1rem',
                      textAlign: 'center',
                      width: '100%',
                      extend: [
                        ...(miscStyles
                          ? parseStyleProps(miscStyles, theme.mq, theme.type)
                          : []),
                      ],
                    })}
                    render={({ className, }) => (
                      <button
                        className={className}
                        onClick={() => (
                          fetchMore(
                            {
                              variables: {
                                offset: count || assets.length,
                              },
                              updateQuery: (prev, { fetchMoreResult, }) => {
                                const assets = fetchMoreResult
                                  ? [
                                    ...prev.financeTable.assets,
                                    ...fetchMoreResult.financeTable.assets,
                                  ].sort((itemA, itemB) => {
                                    const valueA = typeof itemA[sortBy] === 'string' ? itemA[sortBy].toUpperCase() : itemA[sortBy]; // ignore upper and lowercase
                                    const valueB = typeof itemB[sortBy] === 'string' ? itemB[sortBy].toUpperCase() : itemB[sortBy]; // ignore upper and lowercase
                                    if (valueA < valueB) {
                                      return sortOrder === 'ascend' ? -1 : 1;
                                    }
                                    if (valueA > valueB) {
                                      return sortOrder === 'ascend' ? 1 : -1;
                                    }

                                    // values must be equal
                                    return 0;
                                  })
                                  : null;
                                return (
                                  fetchMoreResult
                                    ? Object.assign({}, prev, {
                                      financeTable: {
                                        assets,
                                        __typename: 'FinanceTable',
                                      },
                                    })
                                    : prev
                                );
                              },
                            }
                          )
                        )}
                      >
                        טען עוד
                        <IconBack
                          size={-1}
                          miscStyles={{
                            marginStart: '1rem',
                            transform: 'rotate(270deg)',
                          }}
                        />
                      </button>
                    )}
                  />
                  : null
              }
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default SortableTable;

