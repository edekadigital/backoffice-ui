import * as React from 'react';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { CheckboxDark } from '../Checkbox';
import { EnhancedDataTableColumn } from './EnhancedDataTable';

export interface EnhancedDataTableBodyProps<D> {
  data?: D[];
  columns: EnhancedDataTableColumn[];
  selectable: boolean;
  selectedRows?: D[];
  onSelectRowClick: (row: D) => void;
}

export function EnhancedDataTableBody<D extends object>(
  props: EnhancedDataTableBodyProps<D>
) {
  const { data, columns, selectable, selectedRows, onSelectRowClick } = props;

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

        return (
          <TableRow
            hover={selectable}
            role="checkbox"
            tabIndex={-1}
            key={index}
            selected={isSelected}
          >
            {renderCheckbox}
            {renderColumns(row)}
          </TableRow>
        );
      });
    } else return <>No data</>;
  }, [data, selectedRows, selectable]);

  return <TableBody>{renderRows}</TableBody>;
}
