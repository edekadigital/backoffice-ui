import * as React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

export interface LogTableProps {
  /**
   * The column names to show
   */
  columns: string[];
  /**
   * The rows to show in the table body.
   */
  rows: string[][];
}

/**
 * | Test ID                           | Description          |
 * | --------------------------------- | -------------------- |
 * | `logTable-row-${index}`           | Table row            |
 * | `logTable-th-${index}`            | Table head column    |
 * | `logTable-td-${rowIndex}-${index}`| Table body cell      |
 */
export const LogTable: React.FC<LogTableProps> = (props) => {
  const { columns, rows } = props;

  const tableHead = columns.map((column, index) => (
    <TableCell key={index} data-testid={`logTable-th-${index}`}>
      {column}
    </TableCell>
  ));

  const tableRowCell = (tableRow: string[], rowIndex: number) =>
    tableRow.map((cell, index: number) => (
      <TableCell
        key={index}
        component="th"
        scope="row"
        data-testid={`logTable-td-${rowIndex}-${index}`}
      >
        {cell}
      </TableCell>
    ));

  const tableBody = rows.map((row, index) => (
    <TableRow key={index} data-testid={`logTable-row-${index}`}>
      {tableRowCell(row, index)}
    </TableRow>
  ));

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>{tableHead}</TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
};