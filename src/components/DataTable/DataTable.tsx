import * as React from 'react';
import MuiTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import { TableBar, TableBarAction } from './TableBar';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableDrawer, TableSelectionActions } from './TableDrawer';
import { CheckboxDark } from '../..';
import {
  useTable,
  useRowSelect,
  PluginHook,
  UseRowSelectInstanceProps,
  Column,
  UseRowSelectRowProps,
  UseRowSelectState,
  TableInstance,
  IdType,
  CellValue,
} from 'react-table';
import { makeStyles, Theme } from '@material-ui/core';

export interface FetchProps {
  pageSize: number | undefined;
  pageIndex: number | undefined;
}

interface DataTableProps<D extends object> {
  actions?: TableBarAction[];
  headline?: string;
  fetchData: ({ pageSize, pageIndex }: FetchProps) => Promise<FetchResult<D>>;
  columns: Array<Column<D>>;
  tableSelectionActions?: TableSelectionActions[];
  pagination: { labelRowsPerPage: string; rowsPerPageOptions: number[] };
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

const useStyles = makeStyles<Theme>(theme => ({
  tableContainer: {
    borderColor: theme.palette.background.default,
    borderWidth: '1px',
    borderStyle: 'solid',
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

  const {
    headline,
    actions,
    columns,
    fetchData,
    tableSelectionActions = [],
    pagination,
  } = props;

  const useSelection: Array<PluginHook<D>> = React.useMemo(
    () =>
      tableSelectionActions.length > 0
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
    [tableSelectionActions]
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
    fetchData({
      pageSize: paginationState.pageSize,
      pageIndex: paginationState.pageIndex,
    }).then(res => {
      setPaginationState({
        ...paginationState,
        pageIndex: res.pageIndex,
        totalCount: res.totalCount,
      });
      setData(res.data);
    });
  }, [fetchData, paginationState.pageSize, paginationState.pageIndex]);

  React.useEffect(() => {
    const selectRows = rows
      .filter(row => selectedRowIds && selectedRowIds[`${row.id}`] === true)
      .map(row => row.values);

    setSelectedRows(selectRows);
  }, [selectedRowIds]);

  const classes = useStyles();

  const rowsSelected = React.useMemo(
    () => Object.keys(selectedRowIds).length > 0 && !isAllRowsSelected,
    [selectedRowIds, isAllRowsSelected]
  );

  const tableBar = React.useMemo(() => {
    if (headline || actions) {
      return <TableBar headline={headline} actions={actions} />;
    }
    return null;
  }, [headline, actions]);

  const drawer = React.useMemo(() => {
    return tableSelectionActions.length > 0 ? (
      <TableDrawer
        indeterminate={rowsSelected}
        actions={tableSelectionActions}
        onSelectAll={toggleAllRowsSelected}
        isAllRowsSelected={isAllRowsSelected}
        selectedRows={selectedRows}
      />
    ) : null;
  }, [
    tableSelectionActions,
    rowsSelected,
    isAllRowsSelected,
    toggleAllRowsSelected,
    selectedRows,
  ]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPaginationState({ ...paginationState, pageIndex: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPaginationState({
      ...paginationState,
      pageSize: Number(event.target.value),
      pageIndex: 0,
    });
  };

  return (
    <div className={classes.tableContainer}>
      {tableBar}
      <TableContainer>
        <MuiTable>
          <TableHead headerGroups={headerGroups} />
          <TableBody
            page={rows}
            prepareRow={prepareRow}
            selectedRowIds={selectedRowIds}
          />
        </MuiTable>

        <TablePagination
          component="div"
          count={paginationState.totalCount}
          rowsPerPage={paginationState.pageSize}
          page={paginationState.pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          {...pagination}
        />
      </TableContainer>
      {drawer}
    </div>
  );
}
