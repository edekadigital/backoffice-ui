import * as React from 'react';
import { EnhancedDataTableColumn, Order } from './EnhancedDataTable';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { CheckboxDark } from '../Checkbox';

export interface EnhancedDataTableHeadProps {
  columns: EnhancedDataTableColumn[];
  order: Order;
  orderBy?: string;
  selectable: boolean;
  isAllRowsSelected: boolean;
  onRequestSort: (property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clickable?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: {
      paddingTop: theme.spacing(1.8),
      paddingBottom: theme.spacing(1.8),
    },
  })
);

export const EnhancedDataTableHead = (props: EnhancedDataTableHeadProps) => {
  const {
    columns,
    order,
    orderBy,
    selectable,
    isAllRowsSelected,
    onRequestSort,
    onSelectAllClick,
    clickable,
  } = props;

  const classes = useStyles();

  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  const renderHeadCells = columns.map(column => (
    <TableCell
      key={column.accessor}
      sortDirection={orderBy === column.accessor ? order : false}
      className={classes.tableCell}
    >
      <TableSortLabel
        active={orderBy === column.accessor}
        direction={orderBy === column.accessor ? order : 'asc'}
        onClick={createSortHandler(column.accessor)}
      >
        {column.label}
      </TableSortLabel>
    </TableCell>
  ));

  const renderCheckbox = selectable ? (
    <TableCell padding="checkbox">
      <CheckboxDark onChange={onSelectAllClick} checked={isAllRowsSelected} />
    </TableCell>
  ) : (
    <></>
  );

  const renderEmptyCell = clickable ? <TableCell padding="checkbox" /> : <></>;

  return (
    <TableHead>
      <TableRow>
        {renderCheckbox}
        {renderHeadCells}
        {renderEmptyCell}
      </TableRow>
    </TableHead>
  );
};
