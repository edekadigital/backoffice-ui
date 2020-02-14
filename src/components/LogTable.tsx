import * as React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

/*
type HeadCellName<T> = keyof T;
type BodyCell<T> = { [K in keyof T]: HeadCellName<T[K]> };

export interface LogTableProps1<T> {
  headCells: Array<HeadCellName<T>>;
  bodyCells?: Array<string>;
}

const t: LogTableProps<string> = {
  headCells: ['test'],
  bodyCells: [{ test: 'a' }],
};

 */

export interface LogTableProps {
  cells: string[];
  rows: string[][];
}

export const LogTable: React.FC<LogTableProps> = props => {
  const { cells, rows } = props;

  const tableHead = cells.map((cell, index) => (
    <TableCell key={index}>{cell}</TableCell>
  ));

  const tableRowCell = (tableRow: string[]) =>
    tableRow.map((cell, index: number) => (
      <TableCell key={index} component="th" scope="row">
        {cell}
      </TableCell>
    ));

  const tableBody = rows.map((row, index) => (
    <TableRow key={index}>{tableRowCell(row)}</TableRow>
  ));

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>{tableHead}</TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
};
