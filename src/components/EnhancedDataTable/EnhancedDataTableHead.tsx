import * as React from 'react';
import {
  EnhancedDataTableColumn,
  Order,
  RowActionItem,
} from './EnhancedDataTable';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { Checkbox } from '../Checkbox';

export interface EnhancedDataTableHeadProps<D> {
  columns: Array<EnhancedDataTableColumn<D>>;
  order: Order;
  orderBy?: keyof D;
  selectable: boolean;
  isAllRowsSelected: boolean;
  onRequestSort: (property: keyof D) => void;
  onSelectAllClick: React.ChangeEventHandler<HTMLInputElement>;
  clickable?: boolean;
  selectedRowsCount?: number;
  rowActions?: RowActionItem<D>[];
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
    selectedRowsCount = 0,
    rowActions,
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
      <Checkbox
        indeterminate={!isAllRowsSelected && selectedRowsCount > 0}
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
  const renderEmptyCellRowActions = rowActions ? (
    rowActions.map((item, index) => (
      <TableCell
        key={index}
        padding="checkbox"
        data-testid={`enhancedDataTable-head-emptyColumn-${index}`}
      />
    ))
  ) : (
    <></>
  );

  return (
    <TableHead data-testid={'enhancedDataTable-head'}>
      <TableRow>
        {renderCheckbox}
        {renderHeadCells}
        {renderEmptyCellRowActions}
        {renderEmptyCell}
      </TableRow>
    </TableHead>
  );
}
