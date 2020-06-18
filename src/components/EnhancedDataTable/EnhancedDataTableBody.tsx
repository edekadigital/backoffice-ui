import * as React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { CheckboxDark } from '../Checkbox';
import { EnhancedDataTableColumn, RowClickCallback } from './EnhancedDataTable';
import { IconButton } from '../IconButton';
import { ArrowForward } from '../../icons';

export interface EnhancedDataTableBodyProps<D> {
  data: D[];
  columns: Array<EnhancedDataTableColumn<D>>;
  selectable: boolean;
  selectedRows?: D[];
  onSelectRowClick: (row: D) => void;
  onRowClick?: RowClickCallback<D>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: {
      paddingTop: theme.spacing(1.8),
      paddingBottom: theme.spacing(1.8),
    },
  })
);

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

  const classes = useStyles();

  const renderColumns = (row: D, rowIndex: number) =>
    columns.map((column, index) => {
      const renderColumn = column.component ? (
        <column.component>
          {row[column.accessor as keyof typeof row]}
        </column.component>
      ) : (
        <>{row[column.accessor as keyof typeof row]}</>
      );
      return (
        <TableCell
          key={column.accessor as React.Key}
          align="left"
          onClick={() => !!onRowClick && onRowClick(row)}
          style={{ cursor: onRowClick ? 'pointer' : 'default' }}
          className={classes.tableCell}
          data-testid={`enhancedDataTable-body-row-${rowIndex}-column-${index}`}
        >
          {renderColumn}
        </TableCell>
      );
    });

  const renderRows = React.useMemo(() => {
    return data.map((row, index) => {
      const isSelected =
        selectable && selectedRows && selectedRows.indexOf(row) !== -1;

      const checkboxInputProps = {
        'data-testid': `enhancedDataTable-body-row-select-${index}`,
      } as React.InputHTMLAttributes<HTMLInputElement>;
      const renderCheckbox = selectable ? (
        <TableCell padding="checkbox">
          <CheckboxDark
            checked={isSelected}
            onChange={() => onSelectRowClick(row)}
            inputProps={checkboxInputProps}
          />
        </TableCell>
      ) : (
        <></>
      );

      const renderArrowRight = onRowClick ? (
        <TableCell
          padding="checkbox"
          onClick={() => !!onRowClick && onRowClick(row)}
          data-testid={`enhancedDataTable-body-row-click-${index}`}
        >
          <IconButton
            icon={ArrowForward}
            data-testid={`enhancedDataTable-body-row-clickArrow-${index}`}
          />
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
          data-testid={`enhancedDataTable-body-row-${index}`}
        >
          {renderCheckbox}
          {renderColumns(row, index)}
          {renderArrowRight}
        </TableRow>
      );
    });
  }, [data, selectedRows, selectable, onSelectRowClick, onRowClick, columns]);

  return (
    <TableBody data-testid={'enhancedDataTable-body'}>{renderRows}</TableBody>
  );
}
