import * as React from 'react';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { CheckboxDark } from '../Checkbox';
import { EnhancedDataTableColumn } from './EnhancedDataTable';

export interface EnhancedDataTableBodyProps<D extends object> {
  data?: D[];
  columns: EnhancedDataTableColumn[];
  selectedRows?: D[];
  onSelectRowClick: (row: D) => void;
}

export function EnhancedDataTableBody<D extends object>(
  props: EnhancedDataTableBodyProps<D>
) {
  const { data, columns, selectedRows, onSelectRowClick } = props;

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
        const isSelected = selectedRows && selectedRows.indexOf(row) !== -1;
        return (
          <TableRow
            hover={true}
            role="checkbox"
            tabIndex={-1}
            key={index}
            selected={isSelected}
          >
            <TableCell padding="checkbox">
              <CheckboxDark
                checked={isSelected}
                onChange={() => onSelectRowClick(row)}
              />
            </TableCell>
            {renderColumns(row)}
          </TableRow>
        );
      });
    } else return <>No data</>;
  }, [data, selectedRows]);

  return <TableBody>{renderRows}</TableBody>;
}
