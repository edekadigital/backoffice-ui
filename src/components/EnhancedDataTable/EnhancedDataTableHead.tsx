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

export interface EnhancedDataTableHeadProps<D> {
  columns: Array<EnhancedDataTableColumn<D>>;
  order: Order;
  orderBy?: keyof D;
  selectable: boolean;
  isAllRowsSelected: boolean;
  onRequestSort: (property: keyof D) => void;
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

export function EnhancedDataTableHead<D>(props: EnhancedDataTableHeadProps<D>) {
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

  const createSortHandler = (property: keyof D) => () => {
    onRequestSort(property);
  };

  const renderHeadCells = columns.map(
    ({ accessor, label, sortable = true }) => (
      <TableCell
        key={accessor as React.Key}
        sortDirection={sortable && orderBy === accessor ? order : false}
        className={classes.tableCell}
      >
        <TableSortLabel
          disabled={!sortable}
          active={orderBy === accessor}
          direction={orderBy === accessor ? order : 'asc'}
          onClick={createSortHandler(accessor)}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    )
  );

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
}
