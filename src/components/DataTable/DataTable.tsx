import * as React from 'react';
import MuiTable from '@material-ui/core/Table';
import MuiTableContainer from '@material-ui/core/TableContainer';
import MuiTablePagination from '@material-ui/core/TablePagination';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import {
  useTable,
  useRowSelect,
  PluginHook,
  UseRowSelectInstanceProps,
  Column,
  UseRowSelectRowProps,
  UseRowSelectState,
  TableInstance,
  CellValue,
} from 'react-table';
import { makeStyles } from '@material-ui/core/styles';
import { TableSelectionActions, TableDrawer } from './TableDrawer';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { CheckboxDark } from '../Checkbox';
import { grey } from '@material-ui/core/colors';

export interface FetchProps {
  pageSize: number;
  pageIndex: number;
}

export interface FetchResult<D extends object>
  extends Omit<PaginationState, 'pageSize'> {
  data: D[];
}

interface PaginationState {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
}

interface DataTableProps<D extends object> {
  fetchData: (fetchProps: FetchProps) => Promise<FetchResult<D>>;
  columns: Array<Column<D>>;
  selectionActions?: TableSelectionActions[];
  pagination: { labelRowsPerPage: string; rowsPerPageOptions: number[] };
  drawerWidth?: 'sm' | 'lg';
}

const useStyles = makeStyles(() => ({
  tableContainer: {
    borderColor: grey[300],
    borderWidth: 1,
    borderStyle: 'solid',
  },
  loaderContainer: {
    minHeight: '700px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export function DataTable<D extends object>(props: DataTableProps<D>) {
  const [data, setData] = React.useState<D[]>([]);
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageSize: 10,
      pageIndex: 0,
      totalCount: 0,
    }
  );
  const [selectedRows, setSelectedRows] = React.useState<CellValue[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    columns,
    fetchData,
    selectionActions = [],
    pagination,
    drawerWidth = 'lg',
  } = props;

  const useSelection: Array<PluginHook<D>> = React.useMemo(
    () =>
      selectionActions.length > 0
        ? [
            useRowSelect,
            hooks => {
              hooks.visibleColumns.push(columns => [
                {
                  id: 'selection',
                  Header: ({
                    getToggleAllRowsSelectedProps,
                  }: UseRowSelectInstanceProps<D>) => (
                    <CheckboxDark {...getToggleAllRowsSelectedProps()} />
                  ),
                  Cell: ({ row }: { row: UseRowSelectRowProps<D> }) => (
                    <CheckboxDark {...row.getToggleRowSelectedProps()} />
                  ),
                },
                ...columns,
              ]);
            },
          ]
        : [],
    [selectionActions]
  );

  const plugins: Array<PluginHook<D>> = [...useSelection];

  const {
    headerGroups,
    rows,
    prepareRow,
    state,
    toggleAllRowsSelected,
    isAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
    },
    ...plugins
  ) as UseRowSelectInstanceProps<D> & TableInstance<D>;
  const { selectedRowIds = false } = state as UseRowSelectState<D>;

  React.useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    fetchData({
      pageSize: paginationState.pageSize,
      pageIndex: paginationState.pageIndex,
    }).then(res => {
      if (isActive) {
        setPaginationState(prevPaginationState => ({
          ...prevPaginationState,
          pageIndex: res.pageIndex,
          totalCount: res.totalCount,
        }));
        setData(res.data);
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, [fetchData, paginationState.pageSize, paginationState.pageIndex]);

  React.useEffect(() => {
    const selectRows = rows
      .filter(row => selectedRowIds && selectedRowIds[`${row.id}`] === true)
      .map(row => row.values);

    setSelectedRows(selectRows);
  }, [selectedRowIds, rows]);

  const classes = useStyles();

  const rowsSelected = React.useMemo(
    () => Object.keys(selectedRowIds).length > 0 && !isAllRowsSelected,
    [selectedRowIds, isAllRowsSelected]
  );

  const drawer = React.useMemo(() => {
    return selectionActions.length > 0 ? (
      <TableDrawer
        indeterminate={rowsSelected}
        actions={selectionActions}
        onSelectAll={toggleAllRowsSelected}
        isAllRowsSelected={isAllRowsSelected}
        selectedRows={selectedRows}
        maxWidth={drawerWidth}
      />
    ) : null;
  }, [
    selectionActions,
    rowsSelected,
    isAllRowsSelected,
    toggleAllRowsSelected,
    selectedRows,
    drawerWidth,
  ]);

  const table = React.useMemo(() => {
    return !isLoading ? (
      <MuiTable>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          page={rows}
          prepareRow={prepareRow}
          selectedRowIds={selectedRowIds}
        />
      </MuiTable>
    ) : (
      <div className={classes.loaderContainer}>
        <MuiCircularProgress />
      </div>
    );
  }, [
    headerGroups,
    rows,
    prepareRow,
    selectedRowIds,
    isLoading,
    toggleAllRowsSelected,
  ]);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPaginationState(prevPaginationState => ({
      ...prevPaginationState,
      pageIndex: newPage,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPaginationState(prevPaginationState => ({
      ...prevPaginationState,
      pageSize: Number(event.target.value),
      pageIndex: 0,
    }));
  };

  return (
    <div className={classes.tableContainer}>
      {table}
      <MuiTableContainer>
        <MuiTablePagination
          component="div"
          count={paginationState.totalCount}
          rowsPerPage={paginationState.pageSize}
          page={paginationState.pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          {...pagination}
        />
      </MuiTableContainer>
      {drawer}
    </div>
  );
}
