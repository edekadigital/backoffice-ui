import * as React from 'react';
import { Heading } from '../typography/Heading';
import { makeStyles, Box, SvgIconProps } from '@material-ui/core';
import { ButtonBar, IconButton } from '..';
import MuiTable from '@material-ui/core/Table';
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
  usePagination,
  Column,
} from 'react-table';
import { ArrowForward, ArrowBack } from '..';

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
  page: Row[];
  prepareRow: (row: Row) => void;
}

export interface FetchDataProps {
  pageSize: number;
  pageIndex: number;
}

interface DataTableProps {
  actions?: TableBarAction[];
  headline?: string;
  showCheckbox?: boolean;
  fetchData: ({
    pageSize,
    pageIndex,
  }: // tslint:disable-next-line: no-any
  FetchDataProps) => Promise<{ data: any[]; pageCount: number }>;
  columns: Array<Column<{}>>;
}

interface PaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageIndex: number;
  pageOptions: number[];
  pageCount: number;
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
  const { tableBodyProps, page, prepareRow } = props;

  const getCells = (row: Row) =>
    row.cells.map((cell: Cell, i: number) => {
      return (
        <MuiTableCell {...cell.getCellProps()} key={i}>
          {cell.render('Cell')}
        </MuiTableCell>
      );
    });

  // tslint:disable-next-line: no-any
  const tableRows = page.map((row: any, i: number) => {
    prepareRow(row);
    return (
      <MuiTableRow {...row.getRowProps()} key={i}>
        {getCells(row)}
      </MuiTableRow>
    );
  });

  return <MuiTableBody>{tableRows}</MuiTableBody>;
};

const Pagination: React.FC<PaginationProps> = props => {
  const {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageIndex,
    pageOptions,
    pageSize,
    pageCount,
  } = props;

  const forward = React.useMemo(
    () => (
      <IconButton
        icon={ArrowForward}
        disabled={!canNextPage}
        onClick={nextPage}
      />
    ),
    [nextPage, canNextPage]
  );
  const backward = React.useMemo(
    () => (
      <IconButton
        icon={ArrowBack}
        disabled={!canPreviousPage}
        onClick={previousPage}
      />
    ),
    [previousPage, canPreviousPage]
  );

  return (
    <Box>
      {backward}
      {forward}
      <span>
        Seite {pageIndex + 1} von {pageOptions.length}
      </span>
      <TablePagination
        component="div"
        count={pageOptions.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={nextPage}
      />
    </Box>
  );
};

export const DataTable: React.FC<DataTableProps> = props => {
  // tslint:disable-next-line: no-any
  const [data, setData] = React.useState<any[]>([]);
  const [pages, setPages] = React.useState(0);
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
    headerGroups,
    getTableBodyProps,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10, pageIndex: 0 },
      pageCount: pages,
      manualPagination: true,
    },
    usePagination,
    ...checkboxes
  );

  React.useEffect(() => {
    fetchData({ pageSize, pageIndex }).then(res => {
      setPages(res.pageCount);
      setData(res.data);
    });
  }, [fetchData, pageIndex, pageSize, pageCount]);

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
        <MuiTable>
          <TableHead headerGroups={headerGroups} />
          <TableBody
            tableBodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
          />
        </MuiTable>
        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          pageCount={pageCount}
          page={page}
        />
      </TableContainer>
    </>
  );
};
