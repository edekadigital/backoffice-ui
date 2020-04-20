import * as React from 'react';
import { Heading } from '../typography/Heading';
import { makeStyles, Box, SvgIconProps } from '@material-ui/core';
import { ButtonBar, ArrowForward, ArrowBack } from '..';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody, { TableBodyProps } from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiDrawer from '@material-ui/core/Drawer';
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
  usePagination,
  Column,
  UseRowSelectRowProps,
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
  page: Row[];
  prepareRow: (row: Row) => void;
}

export interface FetchProps {
  pageSize: number;
  pageIndex: number;
}

interface DataTableProps<D extends object> {
  actions?: TableBarAction[];
  headline?: string;
  showCheckbox?: boolean;
  fetchData: ({ pageSize, pageIndex }: FetchProps) => Promise<FetchResult<D>>;
  columns: Array<Column<D>>;
}

interface FetchResult<D extends object> {
  data: D[];
  pageCount: number;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const useStyles = makeStyles(theme => ({
  tableBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  paginationActions: {
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
  const { page, prepareRow } = props;

  const getCells = (row: Row, iRow: number) =>
    row.cells.map((cell: Cell, i: number) => {
      return (
        <MuiTableCell {...cell.getCellProps()} key={`cell-${iRow}-${i}`}>
          {cell.render('Cell')}
        </MuiTableCell>
      );
    });

  const tableRows = page.map((row, i) => {
    prepareRow(row);
    return (
      <MuiTableRow {...row.getRowProps()} key={`row-${i}`}>
        {getCells(row, i)}
      </MuiTableRow>
    );
  });

  return <MuiTableBody>{tableRows}</MuiTableBody>;
};

export function DataTable<D extends object>(props: DataTableProps<D>) {
  const [data, setData] = React.useState<D[]>([]);
  // count of pages
  const [pages, setPages] = React.useState(0);
  const { headline, actions, columns, showCheckbox, fetchData } = props;
  const checkboxes: Array<PluginHook<{}>> = showCheckbox
    ? [
        useRowSelect,
        hooks => {
          hooks.visibleColumns.push(columns => [
            {
              id: 'selection',
              Header: ({
                getToggleAllRowsSelectedProps,
              }: UseRowSelectInstanceProps<D>) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }: { row: UseRowSelectRowProps<D> }) => (
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
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
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

  const drawer = showCheckbox ? (
    <MuiDrawer anchor="bottom" variant="permanent">
      <div>Action</div>
      <div>Action</div>
      <div>Action</div>
    </MuiDrawer>
  ) : null;

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // TODO What todo??
  };
  // TODO Row counter from TablePagination component shows pages not rows?
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(Number(event.target.value));
  };

  const TablePaginationActions = () => {
    const classes = useStyles();

    return (
      <div className={classes.paginationActions}>
        <MuiIconButton
          onClick={previousPage}
          disabled={!canPreviousPage}
          aria-label="vorherige Seite"
        >
          <ArrowBack />
        </MuiIconButton>
        <MuiIconButton
          onClick={nextPage}
          disabled={!canNextPage}
          aria-label="nächste Seite"
        >
          <ArrowForward />
        </MuiIconButton>
      </div>
    );
  };

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

        <TablePagination
          component="div"
          count={pageOptions.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={handleChangePage}
          labelRowsPerPage="Zeilen pro Seite"
          ActionsComponent={TablePaginationActions}
          rowsPerPageOptions={[5, 10, 25]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      {drawer}
    </>
  );
}
