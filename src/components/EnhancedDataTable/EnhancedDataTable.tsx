import * as React from 'react';
import {
  Paper,
  createStyles,
  makeStyles,
  Theme,
  TableContainer,
  Table,
  TablePagination,
} from '@material-ui/core';
import { EnhancedDataTableToolbar } from './EnhancedDataTableToolbar';
import { EnhancedDataTableHead } from './EnhancedDataTableHead';
import { EnhancedDataTableBody } from './EnhancedDataTableBody';

export interface EnhancedDataTableColumn {
  accessor: string;
  label: string;
  sortable?: boolean;
}

export interface FetchProps {
  pageSize?: number;
  pageIndex?: number;
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
export interface EnhancedDataTableProps<D extends object> {
  fetchData: (fetchProps: FetchProps) => Promise<FetchResult<D>>;
  headline?: string;
  columns: EnhancedDataTableColumn[];
  filters?: Filter[];
}

export interface Filter
  extends Pick<EnhancedDataTableColumn, 'accessor' | 'label'> {
  selectorValues?: string[];
}

export interface ActiveFilter extends Filter {
  value?: string;
}

export type Order = 'asc' | 'desc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  })
);

export function EnhancedDataTable<D extends object>(
  props: EnhancedDataTableProps<D>
) {
  const { headline, columns, filters, fetchData } = props;
  const [data, setData] = React.useState<D[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<D[]>([]);
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[] | []>(
    []
  );
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageSize: 10,
      pageIndex: 0,
      totalCount: 0,
    }
  );
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>();
  const classes = useStyles();

  React.useEffect(() => {
    let isActive = true;
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
      }
    });

    return () => {
      isActive = false;
    };
  }, [fetchData, paginationState.pageSize, paginationState.pageIndex]);

  const handleActiveFilters = (filters: ActiveFilter[]) => {
    setActiveFilters(filters);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(data);
      return;
    }
    setSelectedRows([]);
  };

  const handleSelectRowClick = (row: D) => {
    const index = selectedRows.indexOf(row);
    if (index !== -1) {
      // todo
    } else {
      setSelectedRows(selectedRows.concat(row));
    }
    //setSelectedRows(data);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedDataTableToolbar
          filters={filters}
          setActiveFilters={handleActiveFilters}
          activeFilters={activeFilters}
          headline={headline}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedDataTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <EnhancedDataTableBody
              columns={columns}
              data={data}
              selectedRows={selectedRows}
              onSelectRowClick={handleSelectRowClick}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={paginationState.totalCount}
          rowsPerPage={paginationState.pageSize}
          page={paginationState.pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={'Einträge pro Seite'}
        />
      </Paper>
    </div>
  );
}
