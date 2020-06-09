import * as React from 'react';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { CheckboxDark } from '../Checkbox';
import { EnhancedDataTableColumn, RowClickCallback } from './EnhancedDataTable';
import { IconButton } from '../IconButton';
import { ArrowForward } from '../../icons';

export interface EnhancedDataTableBodyProps<D> {
  data?: D[];
  columns: EnhancedDataTableColumn[];
  selectable: boolean;
  selectedRows?: D[];
  onSelectRowClick: (row: D) => void;
  onRowClick?: RowClickCallback<D>;
}

export function EnhancedDataTableBody<D extends object>(
  props: EnhancedDataTableBodyProps<D>
) {
  const {
    data,
    columns,
    selectable,
    selectedRows,
    onSelectRowClick,
    onRowClick,
  } = props;

  const renderColumns = (row: object) =>
    columns.map(column => {
      return (
        <TableCell key={column.accessor} align="left">
          {row[column.accessor as keyof typeof row]}
        </TableCell>
      );
    });

  const renderRows = React.useMemo(() => {
    if (data) {
      return data.map((row, index) => {
        const isSelected =
          selectable && selectedRows && selectedRows.indexOf(row) !== -1;

        const renderCheckbox = selectable ? (
          <TableCell padding="checkbox">
            <CheckboxDark
              checked={isSelected}
              onChange={() => onSelectRowClick(row)}
            />
          </TableCell>
        ) : (
          <></>
        );

        const renderArrowRight = !!onRowClick ? (
          <TableCell padding="checkbox">
            <IconButton icon={ArrowForward} />
          </TableCell>
        ) : (
          <></>
        );

        return (
          <TableRow
            hover={selectable || !!onRowClick}
            role="checkbox"
            tabIndex={-1}
            key={index}
            selected={isSelected}
            onClick={() => !!onRowClick && onRowClick(row)}
          >
            {renderCheckbox}
            {renderColumns(row)}
            {renderArrowRight}
          </TableRow>
        );
      });
    } else return <>No data</>;
  }, [data, selectedRows, selectable, onSelectRowClick, onRowClick, columns]);

  return <TableBody>{renderRows}</TableBody>;
}
