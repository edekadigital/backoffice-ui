import * as React from 'react';
import { Heading } from '../typography/Heading';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import { ButtonBar } from './ButtonBar';
import MuiTable, { Padding } from '@material-ui/core/Table';
import MuiTableBody, { TableBodyProps } from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import MuiTableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {
  useTable,
  Row,
  TableBodyPropGetter,
  useRowSelect,
  HeaderGroup,
  Cell,
  PluginHook,
  UseRowSelectInstanceProps,
  ColumnInstance,
  UseRowSelectHooks,
  TableOptions,
} from 'react-table';

export interface TableBarAction {
  // tslint:disable-next-line: no-any
  icon: React.ElementType<any>;
  handler: () => void;
}

interface DataTableProps extends TableOptions<{}> {
  actions?: React.ReactElement | React.ReactElement[];
  headline?: string;
  showCheckbox?: boolean;
}

interface TableBarProps {
  actions?: TableBarAction[];
  headline?: string;
}

interface TableHeadProps {
  headerGroups: HeaderGroup[];
}

interface TableRowProps {
  tableBodyProps: (propGetter?: TableBodyPropGetter<{}>) => TableBodyProps;
  rows: Row[];
  prepareRow: (row: Row) => void;
}

const useStyles = makeStyles(theme => ({
  tableBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const TableBar: React.FC<TableBarProps> = props => {
  const { headline, actions } = props;

  const classes = useStyles();

  const actionItems = actions?.map((action, index: number) => {
    const actionComponent = action;
    return <div key={`action-item-${index}`}>{actionComponent}</div>;
  });

  const heading = React.useMemo(
    () => (headline ? <Heading children={headline} variant="h4" /> : null),
    [headline]
  );

  const actionBar = React.useMemo(
    () => (actions ? <ButtonBar>{actionItems}</ButtonBar> : null),
    [actions, actionItems]
  );

  return (
    <Container className={classes.tableBarContainer}>
      {heading}
      {actionBar}
    </Container>
  );
};

const TableHead: React.FC<TableHeadProps> = props => {
  const { headerGroups } = props;

  const getCells = (headerGroup: HeaderGroup) =>
    headerGroup.headers.map((column: ColumnInstance, index: number) => (
      <MuiTableCell {...column.getHeaderProps()} key={index}>
        {column.render('Header')}
      </MuiTableCell>
    ));
  const getRows = () =>
    headerGroups.map((headerGroup, index) => (
      <MuiTableRow {...headerGroup.getHeaderGroupProps()} key={index}>
        {getCells(headerGroup)}
      </MuiTableRow>
    ));

  return <MuiTableHead>{getRows()}</MuiTableHead>;
};

const TableBody: React.FC<TableRowProps> = props => {
  const { tableBodyProps, rows, prepareRow } = props;

  const getCells = (row: Row) =>
    row.cells.map((cell: Cell, i: number) => {
      return (
        <MuiTableCell {...cell.getCellProps()} key={i}>
          {cell.render('Cell')}
        </MuiTableCell>
      );
    });

  const tableRows = rows.map((row, i) => {
    prepareRow(row);
    return (
      <MuiTableRow {...row.getRowProps()} key={i}>
        {getCells(row)}
      </MuiTableRow>
    );
  });

  return <MuiTableBody {...tableBodyProps}>{tableRows}</MuiTableBody>;
};

export const DataTable: React.FC<DataTableProps> = props => {
  const { headline, actions, columns, data, showCheckbox } = props;
  const checkboxes: Array<PluginHook<{}>> = showCheckbox
    ? [
        useRowSelect,
        hooks => {
          hooks.visibleColumns.push(columns => [
            {
              id: 'selection',
              Header: (props: UseRowSelectInstanceProps<{}>) => (
                <Checkbox {...props.getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }: UseRowSelectHooks<Row>) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              ),
            },
            ...columns,
          ]);
        },
      ]
    : [];
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    ...checkboxes
  );

  const tableBar = React.useMemo(() => {
    if (headline || actions) {
      return <TableBar headline={headline} actions={actions} />;
    }
    return null;
  }, [headline, actions]);

  return (
    <>
      {tableBar}
      <TableContainer>
        <MuiTable {...getTableProps}>
          <TableHead headerGroups={headerGroups} />
          <TableBody
            tableBodyProps={getTableBodyProps}
            rows={rows}
            prepareRow={prepareRow}
          />
        </MuiTable>
      </TableContainer>
    </>
  );
};
