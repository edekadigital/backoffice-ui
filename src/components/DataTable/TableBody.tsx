import * as React from 'react';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableBody, { TableBodyProps } from '@material-ui/core/TableBody';
import { TableBodyPropGetter, Row, Cell } from 'react-table';

export interface TableRowProps<D extends object> {
  page: Array<Row<D>>;
  prepareRow: (row: Row<D>) => void;
}

export const TableBody: React.FC<TableRowProps<{}>> = props => {
  const { page, prepareRow } = props;

  const getCells = (row: Row, iRow: number) =>
    row.cells.map((cell: Cell, i: number) => {
      return (
        <MuiTableCell key={`cell-${iRow}-${i}`} padding="none">
          {cell.render('Cell')}
        </MuiTableCell>
      );
    });

  const tableRows = page.map((row, i) => {
    prepareRow(row);
    return <MuiTableRow key={`row-${i}`}>{getCells(row, i)}</MuiTableRow>;
  });

  return <MuiTableBody>{tableRows}</MuiTableBody>;
};
