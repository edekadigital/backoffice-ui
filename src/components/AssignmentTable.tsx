import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, SvgIconProps } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import { Checkbox } from './Checkbox';
import { Button } from './Button';
import { Heading } from '../typography/Heading';

type Accessor = string;
interface ActionItem {
  label: string;
  icon?: React.ElementType<SvgIconProps>;
  handler: React.MouseEventHandler<HTMLElement>;
}
interface Row {
  label: string;
  values: Record<Accessor, boolean>;
}
interface Column {
  accessor: Accessor;
  label?: string;
  abbreviation?: string;
}

type ChangeHandler = (
  rowIndex: number,
  accessor: Accessor,
  value: boolean
) => unknown;
export interface AssignmentTableProps {
  /**
   * The core columns configuration object for the entire table.
   */
  columns: Column[];
  /**
   * Set of rows.
   */
  rows: Row[];
  /**
   * Callback fired when the state is changed.
   */
  onChange?: ChangeHandler;
  /**
   * Table headline
   */
  headline?: string;
  /**
   * Array of additional actions in the table toolbar, will be displayed as buttons
   * @default []
   */
  actions?: Array<ActionItem>;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    overflow: 'hidden',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  actions: {
    marginLeft: 'auto',
  },
}));

export const AssignmentTable = ({
  columns,
  rows,
  onChange,
  headline,
  actions = [],
}: AssignmentTableProps) => {
  const classes = useStyles();

  const createChangeHandler = React.useCallback(
    (rowIndex: number, accessor: Accessor) =>
      onChange
        ? (_: unknown, checked: boolean) => {
            onChange(rowIndex, accessor, checked);
          }
        : undefined,
    [onChange]
  );

  return (
    <Paper className={classes.paper} variant="outlined">
      {(headline || actions.length) && (
        <Toolbar className={classes.toolbar} disableGutters>
          <Heading variant={'h6'} data-testid={'assignmentTable-headline'}>
            {headline}
          </Heading>
          <div
            className={classes.actions}
            data-testid={'assignmentTable-actions'}
          >
            {actions.map((action, index) => {
              const key = `assignmentTable-actions-${index}`;
              return (
                <Button
                  color={'primary'}
                  icon={action.icon}
                  onClick={action.handler}
                  key={key}
                  data-testid={key}
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        </Toolbar>
      )}
      <TableContainer data-testid={'assignmentTable-container'}>
        <Table>
          <TableHead data-testid={'assignmentTable-head'}>
            <TableRow>
              <TableCell>&#8203;</TableCell>
              {columns.map((column, columnIndex) => {
                const { label, accessor, abbreviation } = column;
                const key = `assignmentTable-head-${columnIndex}`;
                return (
                  <TableCell
                    key={key}
                    data-testid={key}
                    align="center"
                    padding="checkbox"
                  >
                    {abbreviation && label ? (
                      <Tooltip title={label}>
                        <span>{abbreviation}</span>
                      </Tooltip>
                    ) : (
                      label || accessor
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={`assignmentTable-row-${rowIndex}`} hover>
                <TableCell variant="head">{row.label}</TableCell>
                {columns.map(({ accessor }, columnIndex) => {
                  const key = `assignmentTable-cell-${rowIndex}-${columnIndex}`;
                  return (
                    <TableCell
                      key={key}
                      data-testid={key}
                      align="center"
                      padding="checkbox"
                    >
                      <Checkbox
                        checked={row.values[accessor]}
                        onChange={createChangeHandler(rowIndex, accessor)}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
