import * as React from 'react';
import { Heading } from '../typography/Heading';
import Container from '@material-ui/core/Container';
import { makeStyles, Box, SvgIconProps } from '@material-ui/core';
import { ButtonBar } from './ButtonBar';
import MuiTable, { Padding } from '@material-ui/core/Table';
import MuiTableBody, { TableBodyProps } from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiIconButton from '@material-ui/core/IconButton';
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
  usePagination,
  TableState,
  Column,
} from 'react-table';

export interface TableBarAction {
  icon: React.ElementType<SvgIconProps>;
  handler: () => void;
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

interface DataTableProps {
  actions?: TableBarAction[];
  headline?: string;
  showCheckbox?: boolean;
  // tslint:disable-next-line: no-any
  fetchData: () => any[];
  columns: Array<Column<{}>>;
}

interface StateProps extends TableState {
  pageIndex: number;
  pageSize: number;
}

const useStyles = makeStyles(theme => ({
  tableBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const TableBar: React.FC<TableBarProps> = props => {
  const { headline, actions = [] } = props;

  const classes = useStyles();

  const actionItems = actions.map(({ icon, handler }, index) => {
    const IconComponent = icon;
    const handleClick = () => handler();
    return (
      <div key={`action-item-${index}`}>
        <MuiIconButton color="default" onClick={handleClick}>
          <IconComponent fontSize="small" />
        </MuiIconButton>
      </div>
    );
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
    <Box className={classes.tableBarContainer}>
      {heading}
      {actionBar}
    </Box>
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
  // tslint:disable-next-line: no-any
  const [data, setData] = React.useState<any[]>([]);
  const { headline, actions, columns, showCheckbox, fetchData } = props;
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    ...checkboxes
  );

  React.useEffect(() => {
    const data = fetchData();
    setData(data);
  }, [fetchData, pageIndex, pageSize]);

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
