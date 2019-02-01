// @flow
import React, { Fragment, } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { IconBack, Query, Debug, } from '@haaretz/htz-components';

import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, } from '../../types/asset';

import { TdComponent, } from '../AssetsTable/AssetsTable';
import SectionLink from '../SectionLink/SectionLink';

type FieldType = {
  name: string,
  display: string,
  sortingOrder: "asc" | "desc",
  style?: (any => StyleProps) | null,
  value: Object => string,
};

type Props = {
  queryPrefix: ?string,
  miscStyles: ?StyleProps,
  headerMiscStyles: ?StyleProps,
  initialSort: string, // eslint-disable-line react/no-unused-prop-types
  fields: Array<FieldType>,
  fragment: string,
  section: ?string,
  subSection: ?string,
  assetsId: ?Array<string>,
  type: ?string,
  assetSubSection: ?string,
  linkText: ?string,
  addLink: ?boolean,
  count: number,
  loadMore: ?boolean,
  expirationBenchmarkDate: ?string,
  mtfCategory: ?string,
  mtfCategoryExposure: ?string,
  etfCategory: ?string,
  etfCategoryPosition: ?string,
  extractData: ?(any) => Array<Asset>,
  client: Object,
  fetchMore: any => Promise<any>,
  assetsList: Array<Asset>,
};

type State = {
  assetsList: Array<Asset>,
  sortBy?: ?string,
  sortOrder: ?("asc" | "desc"),
  subSection: ?string,
  expirationBenchmarkDate: ?string,
  mtfCategory: ?string,
  mtfCategoryExposure: ?string,
  etfCategory: ?string,
  etfCategoryPosition: ?string,
};

type SortIconsProps = {
  active: boolean,
  sortOrder: "asc" | "desc",
};

type TableLinkProps = {
  content: string,
  assetId: string,
  type: string,
  allowTab: ?boolean,
};

type GetQueryParams = {
  queryPrefix: ?string,
  fragment: string,
  subSection?: ?string,
  section?: ?string,
  assetsId?: ?Array<string>,
  count?: number,
  sortBy: ?string,
  sortOrder: ?("asc" | "desc"),
}

const TableQuery: GetQueryParams => {
  query: DocumentNode,
  variables: Object,
} = ({
  queryPrefix,
  fragment,
  subSection,
  section,
  assetsId,
  count,
  sortBy,
  sortOrder,
}) => ({
  query: assetsId
    ? gql`
      query ${queryPrefix || ''}SortableTable($ids: [String!]!) {
        assets(ids: $ids) {
          id
          type
          ${fragment}
        }
      }
    `
    : gql`
      query ${queryPrefix || ''}SortableTable(
        $filters: [AssetGroupFilter!],
        $count: Float!,
        $sortBy: AssetColumn,
        $sortOrder: OrderType,
        $offset: Float
      ) {
        assetsList(
          filters: $filters
          count: $count,
          sortBy: $sortBy,
          sortOrder: $sortOrder,
          offset: $offset
        ) {
          id
          type
          ${fragment}
        }
      }
    `,
  variables: assetsId
    ? { ids: assetsId, }
    : {
      filters: [ { section, subSection, }, ],
      count: assetsId ? assetsId.length : count,
      sortBy,
      sortOrder,
      offset: 0,
    },
});

// eslint-disable-next-line react/prop-types
export const SortIcons: SortIconsProps => Node = ({ active, sortOrder, }) => (
  <FelaComponent
    style={{
      transform: 'translateY(-50%)',
      fontSize: '1.5rem',
      marginEnd: '1rem',
    }}
    render={({ theme, className, }) => {
      const ascendFill: string = active && sortOrder === 'asc'
        ? theme.color('neutral', '-2')
        : theme.color('neutral', '-4');
      const descendFill: string = active && sortOrder === 'desc'
        ? theme.color('neutral', '-2')
        : theme.color('neutral', '-4');
      return (
        <svg
          className={className}
          viewBox="0 0 20 40"
          width="0.5em"
          height="1em"
        >
          <polygon fill={ascendFill} points="0,15 10,0 20,15" />
          <polygon fill={descendFill} points="0,25 10,40 20,25" />
        </svg>
      );
    }}
  />
);

export function TableLink({
  content,
  assetId,
  type,
  allowTab,
}: TableLinkProps): Node {
  return (
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
          <a {...(!allowTab ? { tabIndex: -1, } : {})} className={className}>
            {content}
          </a>
        </Link>
      )}
    />
  );
}

const tdHeaderStyle: (Object, ?StyleProps) => Object = (theme, miscStyles) => ({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'start',
  backgroundColor: theme.color('neutral', '-6'),
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

/* eslint-disable react/prop-types */
const Table = ({
  miscStyles,
  headerMiscStyles,
  type,
  linkText,
  addLink,
  loadMore,
  fields,
  sortOrder,
  assets,
  subSection,
  section,
  fetchData,
  fetchAll,
  client,
  count,
  sortBy,
}) => (
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
              key={field.name}
              miscStyles={{
                whiteSpace: 'pre-wrap',
                verticalAlign: 'bottom',
                paddingTop: '0',
                paddingBottom: '0',
              }}
            >
              <FelaComponent
                style={{ width: '100%', }}
                render={({ className, }) => (
                  <button
                    type="button"
                    className={className}
                    onClick={() => fetchData({ client, field, })}
                  >
                    <FelaComponent
                      style={theme => ({
                        ...tdHeaderStyle(theme, headerMiscStyles),
                        display: 'flex',
                        alignItems: 'flex-end',
                        paddingEnd: '2rem',
                        fontWeight: sortBy === field.name ? '700' : '300',
                      })}
                    >
                      <SortIcons
                        active={sortBy === field.name}
                        sortOrder={sortOrder}
                      />
                      <span>{field.display}</span>
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
            key={asset.id}
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
                key={`${field.name}-${asset.id}`}
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
    {addLink ? (
      <SectionLink
        href={{
          pathname: `/${type || subSection || ''}`,
          query: {
            subSection,
          },
        }}
        as={type ? `/${type || ''}/${subSection || ''}` : `/${subSection || ''}`}
      >
        <span>{linkText || ''}</span>
      </SectionLink>
    ) : null}
    {loadMore && assets.length <= count ? (
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
        })}
        render={({ className, }) => (
          <button
            type="button"
            className={className}
            onClick={() => fetchAll(count || assets.length)}
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
    ) : null}
  </Fragment>
);

class SortableTable extends React.Component<Props, State> {
  static defaultProps = {
    queryPrefix: null,
    miscStyles: null,
    headerMiscStyles: null,
    assetsId: null,
    subSection: null,
    section: null,
    type: null,
    assetSubSection: null,
    count: 5,
    expirationBenchmarkDate: null,
    mtfCategory: null,
    mtfCategoryExposure: null,
    etfCategory: null,
    etfCategoryPosition: null,
    linkText: null,
    addLink: null,
    loadMore: null,
    extractData: null,
  };

  state = {
    assetsList: this.props.assetsList,
    sortBy: null,
    sortOrder: null,
    subSection: null,
    expirationBenchmarkDate: null,
    mtfCategory: null,
    mtfCategoryExposure: null,
    etfCategory: null,
    etfCategoryPosition: null,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const getSortOrder: () => ?("asc" | "desc") = () => {
      const selectedField: ?FieldType = nextProps.fields.find(
        (field: FieldType) => field.name === nextProps.initialSort,
      );
      return selectedField ? selectedField.sortingOrder : prevState.sortOrder;
    };
    return {
      sortBy: prevState.sortBy || nextProps.initialSort,
      sortOrder: prevState.sortOrder || getSortOrder(),
      subSection: nextProps.subSection || prevState.subSection || null,
      expirationBenchmarkDate:
        nextProps.expirationBenchmarkDate
        || prevState.expirationBenchmarkDate
        || null,
      mtfCategory:
        nextProps.mtfCategory
        || prevState.mtfCategory
        || null,
      mtfCategoryExposure:
        nextProps.mtfCategoryExposure
        || prevState.mtfCategoryExposure
        || null,
      etfCategory:
        nextProps.etfCategory
        || prevState.etfCategory
        || null,
      etfCategoryPosition:
        nextProps.etfCategoryPosition
        || prevState.etfCategoryPosition
        || null,
    };
  }

  fetchData: ({
      client: Object,
      field?: FieldType,
      props?: Props,
    }) => Promise<any> = async ({ client, field = null, props = null, }) => {
      const {
        subSection,
        section,
        assetsId,
        count,
        fragment,
        queryPrefix,
      } = props || this.props;
      this.setState(prevState => {
        const sortBy = field ? field.name : prevState.sortBy;
        const sortOrder = field
          ? prevState.sortBy !== field.name
            ? field.sortingOrder
            : prevState.sortOrder === 'desc'
              ? 'asc'
              : 'desc'
          : prevState.sortOrder;
        const {
          query, variables, } = TableQuery({
          queryPrefix,
          fragment,
          subSection,
          section,
          assetsId,
          count,
          sortBy,
          sortOrder,
        });
        client
          .query({
            query,
            variables,
          })
          .then(({ data: { assetsList, }, }) => this.setState({ assetsList, sortBy, sortOrder, }));
      });
    };

  render(): Node {
    const {
      fields,
      subSection,
      section,
      count,
      fragment,
      fetchMore,
      client,
      extractData,
      queryPrefix,
      ...props
    } = this.props;

    const { sortBy, sortOrder, assetsList, } = this.state;

    const fetchAll = (offset: number) => fetchMore({
      variables: {
        offset,
      },
      updateQuery: (prev, { fetchMoreResult, }) => (fetchMoreResult
        ? Object.assign({}, prev, {
          assetsList: fetchMoreResult.assetsList,
        })
        : prev
      ),
    })
      .then(({ data, }) => this.setState(prevState => {
        const assetsList = data
          ? [ ...prevState.assetsList, ...data.assetsList, ].sort(
            (itemA, itemB) => {
              const valueA = typeof itemA[sortBy] === 'string'
                ? itemA[sortBy].toUpperCase()
                : itemA[sortBy]; // ignore upper and lowercase
              const valueB = typeof itemB[sortBy] === 'string'
                ? itemB[sortBy].toUpperCase()
                : itemB[sortBy]; // ignore upper and lowercase
              if (valueA < valueB) {
                return sortOrder === 'asc' ? -1 : 1;
              }
              if (valueA > valueB) {
                return sortOrder === 'asc' ? 1 : -1;
              }

              // values must be equal
              return 0;
            },
          )
          : prevState.assetsList;
        return ({
          assetsList,
        });
      }));

    const assets: Array<Asset> = extractData
      ? extractData(assetsList)
      : assetsList;
    return (
      <Table
        assets={assets}
        fetchData={this.fetchData}
        {...{
          sortOrder,
          subSection,
          section,
          fetchMore,
          fields,
          client,
          count,
          sortBy,
          fetchAll,
        }}
        {...props}
      />
    );
  }
}

export default (props: any) => {
  const {
    subSection,
    section,
    assetsId,
    count,
    assetSubSection,
    fragment,
    expirationBenchmarkDate,
    mtfCategory,
    mtfCategoryExposure,
    etfCategory,
    etfCategoryPosition,
  } = props;

  const getSortOrder: () => ?('asc' | 'desc') = () => {
    const selectedField: ?FieldType = props.fields.find(
      (field: FieldType) => field.name === props.initialSort,
    );
    return selectedField ? selectedField.sortingOrder : null;
  };

  const sortBy: string = props.initialSort;
  const sortOrder = getSortOrder();

  if (!sortOrder) {
    return (
      <Debug>
        {'you must provide initial sort order'}
      </Debug>
    );
  }

  return (
    <Query
      query={TableQuery(fragment)}
      variables={{
        subSection,
        section,
        assetsId,
        count: assetsId ? assetsId.length : (count || 5),
        sortBy,
        sortOrder,
        assetSubSection,
        offset: 0,
        expirationBenchmarkDate,
        mtfCategory,
        mtfCategoryExposure,
        etfCategory,
        etfCategoryPosition,
      }}
    >
      {({ loading, error, data, fetchMore, client, }) => {
        if (error) return null;
        if (loading) return null;
        return (
          <SortableTable
            assetsList={data.assetsList}
            fetchMore={fetchMore}
            client={client}
            {...props}
          />
        );
      }}
    </Query>
  );
};
