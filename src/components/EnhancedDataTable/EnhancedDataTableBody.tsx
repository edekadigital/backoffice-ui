import * as React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Theme,
  createStyles,
  SvgIconProps,
} from '@material-ui/core';
import { Checkbox } from '../Checkbox';
import {
  EnhancedDataTableColumn,
  RowActionItem,
  RowClickCallback,
} from './EnhancedDataTable';
import { IconButton } from '../IconButton';
import { ArrowForward } from '@material-ui/icons';

export interface EnhancedDataTableBodyProps<D> {
  data: D[];
  columns: Array<EnhancedDataTableColumn<D>>;
  selectable: boolean;
  selectedRows?: D[];
  onSelectRowClick: (row: D) => void;
  onRowClick?: RowClickCallback<D>;
  rowActions?: Array<RowActionItem<D>>;
  rowClickIcon?: React.ElementType<SvgIconProps>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: {
      paddingTop: theme.spacing(1.75),
      paddingBottom: theme.spacing(1.75),
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
    rowActions,
    rowClickIcon = ArrowForward,
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
          <Checkbox
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
            icon={rowClickIcon}
            data-testid={`enhancedDataTable-body-row-clickArrow-${index}`}
          />
        </TableCell>
      ) : (
        <></>
      );

      const renderRowActions = rowActions ? (
        rowActions.map((action, index) => (
          <TableCell
            onClick={() => action.handler(row)}
            key={index}
            padding="checkbox"
            data-testid={`enhancedDataTable-body-row-action-${index}`}
          >
            <IconButton
              icon={action.icon}
              key={index}
              data-testid={`enhancedDataTable-body-row-action-icon-${index}`}
            />
          </TableCell>
        ))
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
          {renderRowActions}
          {renderArrowRight}
        </TableRow>
      );
    });
  }, [
    data,
    selectedRows,
    selectable,
    onSelectRowClick,
    onRowClick,
    columns,
    rowActions,
  ]);

  return (
    <TableBody data-testid={'enhancedDataTable-body'}>{renderRows}</TableBody>
  );
}
