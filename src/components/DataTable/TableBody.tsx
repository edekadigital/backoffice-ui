import * as React from 'react';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableBody from '@material-ui/core/TableBody';
import { Row, IdType, UseRowSelectRowProps } from 'react-table';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { blueGrey } from '@material-ui/core/colors';

export interface TableRowProps<D extends object> {
  page: Array<Row<D>>;
  prepareRow: (row: Row<D>) => void;
  selectedRowIds: false | Record<IdType<D>, boolean>;
}

const useStyles = makeStyles(theme => ({
  tableBody: {
    backgroundColor: theme.palette.background.paper,
  },
  selected: {
    backgroundColor: blueGrey[100],
  },
}));

export function TableBody<D extends object>(props: TableRowProps<D>) {
  const { page, prepareRow } = props;

  const classes = useStyles();

  const getCells = (row: Row<D>, iRow: number) =>
    row.cells.map((cell, i) => (
      <MuiTableCell key={`cell-${iRow}-${i}`} padding="none">
        {cell.render('Cell')}
      </MuiTableCell>
    ));

  const tableRows = page.map((row, i) => {
    const { isSelected } = (row as unknown) as UseRowSelectRowProps<D>;
    prepareRow(row);
    return (
      <MuiTableRow
        key={`row-${i}`}
        selected={isSelected}
        classes={{ selected: classes.selected }}
      >
        {getCells(row, i)}
      </MuiTableRow>
    );
  });

  return <MuiTableBody className={classes.tableBody}>{tableRows}</MuiTableBody>;
}
