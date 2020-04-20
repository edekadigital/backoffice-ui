import * as React from 'react';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableBody from '@material-ui/core/TableBody';
import { Row } from 'react-table';

export interface TableRowProps<D extends object> {
  page: Array<Row<D>>;
  prepareRow: (row: Row<D>) => void;
}

export function TableBody<D extends object>(props: TableRowProps<D>) {
  const { page, prepareRow } = props;

  const getCells = (row: Row<D>, iRow: number) =>
    row.cells.map((cell, i) => (
      <MuiTableCell key={`cell-${iRow}-${i}`} padding="none">
        {cell.render('Cell')}
      </MuiTableCell>
    ));

  const tableRows = page.map((row, i) => {
    prepareRow(row);
    return <MuiTableRow key={`row-${i}`}>{getCells(row, i)}</MuiTableRow>;
  });

  return <MuiTableBody>{tableRows}</MuiTableBody>;
}
