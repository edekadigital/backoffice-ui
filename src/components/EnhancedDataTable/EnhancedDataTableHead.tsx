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

  const createSortHandler = (property: keyof D, sortable: boolean) => () => {
    if (sortable) {
      onRequestSort(property);
    }
  };

  const renderHeadCells = columns.map(
    ({ accessor, label, sortable = true }, index) => (
      <TableCell
        key={accessor as React.Key}
        sortDirection={sortable && orderBy === accessor ? order : false}
        className={classes.tableCell}
        data-testid={`enhancedDataTable-head-column-${index}`}
      >
        <TableSortLabel
          disabled={!sortable}
          active={orderBy === accessor}
          direction={orderBy === accessor ? order : 'asc'}
          onClick={createSortHandler(accessor, sortable)}
          data-testid={`enhancedDataTable-head-column-sort-${index}`}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    )
  );

  const checkboxInputProps = {
    'data-testid': 'enhancedDataTable-head-selectAll',
  } as React.InputHTMLAttributes<HTMLInputElement>;

  const renderCheckbox = selectable ? (
    <TableCell padding="checkbox">
      <CheckboxDark
        onChange={onSelectAllClick}
        checked={isAllRowsSelected}
        inputProps={checkboxInputProps}
      />
    </TableCell>
  ) : (
    <></>
  );

  const renderEmptyCell = clickable ? (
    <TableCell
      padding="checkbox"
      data-testid={'enhancedDataTable-head-emptyColumn'}
    />
  ) : (
    <></>
  );

  return (
    <TableHead data-testid={'enhancedDataTable-head'}>
      <TableRow>
        {renderCheckbox}
        {renderHeadCells}
        {renderEmptyCell}
      </TableRow>
    </TableHead>
  );
}
