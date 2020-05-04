import * as React from 'react';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import { HeaderGroup } from 'react-table';

export interface TableHeadProps<D extends object> {
  headerGroups: Array<HeaderGroup<D>>;
}

export function TableHead<D extends object>(props: TableHeadProps<D>) {
  const { headerGroups } = props;

  const getCells = (headerGroup: HeaderGroup<D>) =>
    headerGroup.headers.map((column, index) => (
      <MuiTableCell key={index} padding="none">
        {column.render('Header')}
      </MuiTableCell>
    ));

  const getRows = React.useCallback(
    () =>
      headerGroups.map((headerGroup, index) => (
        <MuiTableRow key={index}>{getCells(headerGroup)}</MuiTableRow>
      )),
    [headerGroups]
  );

  return <MuiTableHead>{getRows()}</MuiTableHead>;
}