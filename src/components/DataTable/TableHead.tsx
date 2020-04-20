import * as React from 'react';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import { HeaderGroup, ColumnInstance } from 'react-table';

export interface TableHeadProps {
  headerGroups: HeaderGroup[];
}

export const TableHead: React.FC<TableHeadProps> = props => {
  const { headerGroups } = props;

  const getCells = (headerGroup: HeaderGroup) =>
    headerGroup.headers.map((column: ColumnInstance, index: number) => (
      <MuiTableCell {...column.getHeaderProps()} key={index}>
        {column.render('Header')}
      </MuiTableCell>
    ));
  const getRows = () =>
    headerGroups.map((headerGroup, index) => (
      <MuiTableRow {...headerGroup.getHeaderGroupProps()} key={index}>
        {getCells(headerGroup)}
      </MuiTableRow>
    ));

  return <MuiTableHead>{getRows()}</MuiTableHead>;
};
