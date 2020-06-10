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
  data?: D[];
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

  const renderColumns = (row: object) =>
    columns.map(column => {
      return (
        <TableCell
          key={column.accessor as React.Key}
          align="left"
          onClick={() => !!onRowClick && onRowClick(row as D)}
          style={{ cursor: !!onRowClick ? 'pointer' : 'default' }}
          className={classes.tableCell}
        >
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
          <TableCell
            padding="checkbox"
            onClick={() => !!onRowClick && onRowClick(row)}
          >
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
