import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Theme } from '@material-ui/core';

interface AssignmentTableColumn<D> {
  accessor: keyof D;
  label?: string;
}

export interface AssignmentTableProps<D = {}> {
  /**
   * The core columns configuration object for the entire table.
   */
  columns: AssignmentTableColumn<D>[];
  /**
   * Set of rows.
   */
  rows: D[];
  /**
   * Rotate column labels
   * @default false
   */
  rotatedHeaders?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export const AssignmentTable = <D extends {}>(
  props: AssignmentTableProps<D>
) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} variant="outlined">
          <TableContainer data-testid={'assignmentTable-container'}>
            <Table size="small">
              <TableHead data-testid={'assignmentTable-head'}>
                <TableRow>
                  <TableCell>&#32;</TableCell>
                  {props.columns.map((column, index) => {
                    const key = `assignmentTable-head-column-${index}`;
                    return (
                      <TableCell key={key} data-testid={key}>
                        {column.label ?? column.accessor}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
};
