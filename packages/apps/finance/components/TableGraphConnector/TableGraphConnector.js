// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { Asset, } from '../../types/asset';

import AssetsTable from '../AssetsTable/AssetsTable';
import GraphController from '../GraphController/GraphController';
import SectionLink from '../SectionLink/SectionLink';

type Props = {
  assetId?: number | string | null,
  assetsId: ?Array<string>,
  isExchange?: boolean,
  sortBy: ?string,
  sortOrder: ?"ascend" | ?"descend",
};

type State = Asset;

class TableGraphConnector extends React.Component<Props, State> {
  static defaultProps = {
    assetId: null,
    assetsId: null,
    isExchange: false,
    sortBy: null,
    sortOrder: null,
  };

  state: State;

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !this.state
      || (nextProps !== this.props || nextState.id !== this.state.id)
    );
  }

  changeAsset: Asset => void = stockData => this.setState(stockData);

  render(): Node {
    const { id, name, type, } = this.state || {};
    const { assetId, assetsId, isExchange, sortBy, sortOrder, } = this.props;
    return (
      <FelaTheme>{theme => (
          <Grid
            gutter={2}
            miscStyles={{
              backgroundColor: theme.color('neutral', '-10'),
              marginStart: '0rem',
              marginEnd: '0rem',
              paddingTop: '2rem',
            }}
          >
            <GridItem
              width={1 / 3}
              miscStyles={{
                direction: 'ltr',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              <AssetsTable
                changeAsset={this.changeAsset}
                sortBy={sortBy}
                sortOrder={sortOrder}
                assetId={assetId}
                assetsId={assetsId}
                isExchange={isExchange}
                headers={[
                  {
                    display: 'שם אפיק',
                    value: 'name',
                    style: {
                      paddingStart: '1rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      paddingEnd: '2rem',
                      marginBottom: '1rem',
                      backgroundColor: theme.color('neutral', '-6'),
                    },
                  },
                  {
                    display: 'שער אחרון',
                    value: 'value',
                    style: {
                      paddingEnd: '5rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem',
                      backgroundColor: theme.color('neutral', '-6'),
                    },
                  },
                  {
                    display: '% שינוי',
                    percentage: true,
                    value: 'changePercentage',
                    style: {
                      paddingEnd: '5rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem',
                      backgroundColor: theme.color('neutral', '-6'),
                    },
                  },
                ]}
                miscStyles={{
                  direction: 'rtl',
                  position: 'absolute',
                }}
              />
            </GridItem>
            <GridItem width={2 / 3}>
              <GraphController selectedStockId={id} />
              <SectionLink
                href={{
                  pathname: `/asset/${type || ''}`,
                  query: {
                    assetId: id,
                    section: type,
                  },
                }}
                as={`/${type || ''}/${id || ''}`}
              >
                <span>
                  למידע נוסף על
                  {name}
                </span>
              </SectionLink>
            </GridItem>
          </Grid>
        )}</FelaTheme>
    );
  }
}

export default TableGraphConnector;
