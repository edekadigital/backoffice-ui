import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import MuiTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import { TableBar, TableBarAction } from './TableBar';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableDrawer } from './TableDrawer';
import Checkbox from '@material-ui/core/Checkbox';
import {
  useTable,
  useRowSelect,
  PluginHook,
  UseRowSelectInstanceProps,
  Column,
  UseRowSelectRowProps,
} from 'react-table';

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
  totalCount: number;
}

export function DataTable<D extends object>(props: DataTableProps<D>) {
  const [data, setData] = React.useState<D[]>([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const { headline, actions, columns, showCheckbox, fetchData } = props;
  const checkboxes: Array<PluginHook<D>> = showCheckbox
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
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    ...checkboxes
  );

  React.useEffect(() => {
    fetchData({ pageSize, pageIndex }).then(res => {
      setPageCount(res.pageCount);
      setTotalCount(res.totalCount);
      setData(res.data);
    });
  }, [fetchData, pageIndex, pageSize, pageCount, totalCount]);

  const rowsSelected = Object.keys(selectedRowIds).length > 0;

  const tableBar = React.useMemo(() => {
    if (headline || actions) {
      return <TableBar headline={headline} actions={actions} />;
    }
    return null;
  }, [headline, actions]);

  const drawer = React.useMemo(() => {
    return showCheckbox ? <TableDrawer indeterminate={rowsSelected} /> : null;
  }, [showCheckbox, rowsSelected]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(Number(event.target.value));
    setPageIndex(0);
  };

  return (
    <>
      {tableBar}
      <TableContainer>
        <MuiTable>
          <TableHead headerGroups={headerGroups} />
          <TableBody page={rows} prepareRow={prepareRow} />
        </MuiTable>

        <TablePagination
          component="div"
          count={totalCount}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={handleChangePage}
          labelRowsPerPage="Zeilen pro Seite"
          rowsPerPageOptions={[5, 10, 25]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      {drawer}
    </>
  );
}
