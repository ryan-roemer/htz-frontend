// @flow
import * as React from 'react';
import type { Node, } from 'react';
import VisuallyHidden from '../../VisuallyHidden/VisuallyHidden';
import Header from './Header';
import Body from './Body';

type Props = {
  tableData: Array<Object>,
  tableType: "nba" | "soccer-champions" | "soccer-leagues",
  headers: Array<string>,
  isOpen: ?boolean,
  borders: ?Object,
}

Table.defaultProps = {
  isOpen: false,
  borders: null,
};


function Table(props: Props): Node {
  const { tableType, tableData, headers, isOpen, borders, } = props;

  return (
    <table aria-describedby={tableType} style={{ width: '100%', }} dir="rtl">

      <VisuallyHidden id={tableType}>
        <caption>{tableType}</caption>
      </VisuallyHidden>

      <Header headers={headers} />
      <Body tableData={tableData} isOpen={isOpen} borders={borders} />
    </table>
  );
}

export default Table;
