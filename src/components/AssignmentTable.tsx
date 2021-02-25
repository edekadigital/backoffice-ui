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

interface ActionItem {
  label: string;
  icon?: React.ElementType<SvgIconProps>;
  handler: React.MouseEventHandler<HTMLElement>;
}

type Accessor<K extends string> = K;

interface Row<K extends string> {
  label: string;
  values: Record<Accessor<K>, boolean>;
}
interface Column<K extends string> {
  accessor: Accessor<K>;
  label?: string;
  abbreviation?: string;
}

type ChangeHandler<K extends string> = (
  rowIndex: number,
  accessor: Accessor<K>,
  value: boolean
) => unknown;

export interface AssignmentTableProps<K extends string = string> {
  /**
   * The core columns configuration object for the entire table.
   */
  columns: Column<K>[];
  /**
   * Set of rows.
   */
  rows: Row<K>[];
  /**
   * Callback fired when the state is changed.
   */
  onChange?: ChangeHandler<K>;
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

/**
 * | Test ID                                                 | Description                                     |
 * | ------------------------------------------------------- | ----------------------------------------------- |
 * | `assignmentTable-headline`                              | Table headline                                  |
 * | `assignmentTable-actions`                               | Additional actions displayed in table head      |
 * | `assignmentTable-actions-${index}`                      | Button inside addtional actions                 |
 * | `assignmentTable-container`                             | table container                                 |
 * | `assignmentTable-head`                                  | table head container                            |
 * | `assignmentTable-head-column-${index}`                  | table head column                               |
 * | `assignmentTable-row-${rowIndex}`                       | Row                                             |
 * | `assignmentTable-row-${rowIndex}-column-${columnIndex}` | Specific table cell                             |
 */
export const AssignmentTable = <K extends string>({
  columns,
  rows,
  onChange,
  headline,
  actions = [],
}: AssignmentTableProps<K>) => {
  const classes = useStyles();

  const createChangeHandler = React.useCallback(
    (rowIndex: number, accessor: Accessor<K>) =>
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
          <Heading variant="h6" data-testid="assignmentTable-headline">
            {headline}
          </Heading>
          <div
            className={classes.actions}
            data-testid="assignmentTable-actions"
          >
            {actions.map((action, index) => {
              const key = `assignmentTable-actions-${index}`;
              return (
                <Button
                  color="primary"
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
      <TableContainer data-testid="assignmentTable-container">
        <Table>
          <TableHead data-testid="assignmentTable-head">
            <TableRow>
              <TableCell>&#8203;</TableCell>
              {columns.map((column, columnIndex) => {
                const { label, accessor, abbreviation } = column;
                const key = `assignmentTable-head-column-${columnIndex}`;
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
            {rows.map((row, rowIndex) => {
              const rowKey = `assignmentTable-row-${rowIndex}`;
              return (
                <TableRow key={rowKey} data-testid={rowKey} hover>
                  <TableCell variant="head">{row.label}</TableCell>
                  {columns.map(({ accessor }, columnIndex) => {
                    const columnKey = `assignmentTable-row-${rowIndex}-column-${columnIndex}`;
                    return (
                      <TableCell
                        key={columnKey}
                        data-testid={columnKey}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
