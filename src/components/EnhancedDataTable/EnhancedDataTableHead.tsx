import * as React from 'react';
import { EnhancedDataTableColumn, Order } from './EnhancedDataTable';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import { CheckboxDark } from '../Checkbox';

export interface EnhancedDataTableHeadProps {
  columns: EnhancedDataTableColumn[];
  order: Order;
  orderBy?: string;
  onRequestSort: (property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EnhancedDataTableHead = (props: EnhancedDataTableHeadProps) => {
  const { columns, order, orderBy, onRequestSort, onSelectAllClick } = props;

  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  const renderHeadCells = columns.map(column => (
    <TableCell
      key={column.accessor}
      sortDirection={orderBy === column.accessor ? order : false}
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

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CheckboxDark
            inputProps={{ 'aria-label': 'select all desserts' }}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {renderHeadCells}
      </TableRow>
    </TableHead>
  );
};
