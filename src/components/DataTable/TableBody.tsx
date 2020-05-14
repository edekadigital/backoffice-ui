import * as React from 'react';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableBody from '@material-ui/core/TableBody';
import { Row, IdType, UseRowSelectRowProps } from 'react-table';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { grey } from '@material-ui/core/colors';

export interface TableRowProps<D extends object> {
  page: Array<Row<D>>;
  prepareRow: (row: Row<D>) => void;
  selectedRowIds: false | Record<IdType<D>, boolean>;
}

const useBodyStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const useRowStyles = makeStyles(theme => ({
  root: {
    ['&.Mui-selected, &.Mui-selected:hover']: {
      backgroundColor: lighten(theme.palette.primary.light, 0.85),
    },
  },
}));

const useCellStyles = makeStyles({
  root: { padding: 0, borderBottom: `1px solid ${grey[300]}` },
});

export function TableBody<D extends object>(props: TableRowProps<D>) {
  const { page, prepareRow } = props;

  const bodyClasses = useBodyStyles();
  const rowClasses = useRowStyles();
  const cellClasses = useCellStyles();

  const getCells = (row: Row<D>, iRow: number) =>
    row.cells.map((cell, i) => (
      <MuiTableCell key={`cell-${iRow}-${i}`} classes={cellClasses}>
        {cell.render('Cell')}
      </MuiTableCell>
    ));

  const tableRows = page.map((row, i) => {
    const { isSelected } = (row as unknown) as UseRowSelectRowProps<D>;

    prepareRow(row);

    return (
      <MuiTableRow key={`row-${i}`} selected={isSelected} classes={rowClasses}>
        {getCells(row, i)}
      </MuiTableRow>
    );
  });

  return <MuiTableBody classes={bodyClasses}>{tableRows}</MuiTableBody>;
}
