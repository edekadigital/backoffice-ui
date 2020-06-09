import * as React from 'react';
import {
  Paper,
  createStyles,
  makeStyles,
  Theme,
  TableContainer,
  Table,
  TablePagination,
  CircularProgress,
} from '@material-ui/core';
import { EnhancedDataTableToolbar } from './EnhancedDataTableToolbar';
import { EnhancedDataTableHead } from './EnhancedDataTableHead';
import { EnhancedDataTableBody } from './EnhancedDataTableBody';
import {
  EnhancedDataTableSelectionMenu,
  EnhancedDataTableSelectionMenuActions,
} from './EnhancedDataTableSelectionMenu';

export interface EnhancedDataTableColumn {
  accessor: string;
  label: string;
  sortable?: boolean;
}

export interface FetchProps {
  pageSize?: number;
  pageIndex?: number;
}

export interface FetchResult<D> extends Omit<PaginationState, 'pageSize'> {
  data: D[];
}

interface PaginationState {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
}

export type RowClickCallback<D> = (clickedRow: D) => void;
export interface EnhancedDataTableProps<D extends object> {
  fetchData: (fetchProps: FetchProps) => Promise<FetchResult<D>>;
  headline?: string;
  columns: EnhancedDataTableColumn[];
  filters?: Filter[];
  selectionActions?: Array<EnhancedDataTableSelectionMenuActions<D>>;
  selectionMenuDrawerWidth?: 'sm' | 'lg';
  onRowClick?: RowClickCallback<D>;
}

export interface Filter
  extends Pick<EnhancedDataTableColumn, 'accessor' | 'label'> {
  selectorValues?: string[];
  value?: string;
}

export interface ActiveFilter extends Filter {
  value: string;
}

export type Order = 'asc' | 'desc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    loaderContainer: {
      minHeight: '700px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
  const {
    headline,
    columns,
    filters,
    fetchData,
    selectionActions = [],
    selectionMenuDrawerWidth = 'lg',
    onRowClick,
  } = props;
  const [data, setData] = React.useState<D[]>();
  const [selectedRows, setSelectedRows] = React.useState<D[]>([]);
  const [isAllRowsSelected, setIsAllRowsSelected] = React.useState<boolean>(
    false
  );
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[] | []>(
    filters?.filter(filter => filter.value) as ActiveFilter[]
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

  React.useEffect(
    () => setIsAllRowsSelected(!!data && selectedRows.length === data.length),
    [data, selectedRows]
  );

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
    if (event.target.checked && data) {
      setSelectedRows(data);
      return;
    }
    setSelectedRows([]);
  };

  const handleSelectRowClick = (row: D) => {
    const index = selectedRows.indexOf(row);
    if (index !== -1) {
      setSelectedRows(selectedRows.filter((_, i) => index !== i));
    } else {
      setSelectedRows(selectedRows.concat(row));
    }
  };

  const drawer = React.useMemo(() => {
    return selectionActions.length > 0 ? (
      <EnhancedDataTableSelectionMenu
        actions={selectionActions}
        onSelectAllClick={handleSelectAllClick}
        selectedRows={selectedRows}
        maxWidth={selectionMenuDrawerWidth}
        isAllRowsSelected={isAllRowsSelected}
      />
    ) : null;
  }, [
    selectionActions,
    selectedRows,
    selectionMenuDrawerWidth,
    isAllRowsSelected,
  ]);

  const renderTable = React.useMemo(
    () =>
      data ? (
        <>
          <TableContainer>
            <Table>
              <EnhancedDataTableHead
                columns={columns}
                order={order}
                orderBy={orderBy}
                selectable={selectionActions.length > 0}
                isAllRowsSelected={isAllRowsSelected}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
                clickable={!!onRowClick}
              />
              <EnhancedDataTableBody
                columns={columns}
                data={data}
                selectable={selectionActions.length > 0}
                selectedRows={selectedRows}
                onSelectRowClick={handleSelectRowClick}
                onRowClick={onRowClick}
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
        </>
      ) : (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ),
    [
      data,
      columns,
      paginationState,
      selectedRows,
      isAllRowsSelected,
      order,
      orderBy,
    ]
  );

  const renderToolbar = React.useMemo(
    () => (
      <EnhancedDataTableToolbar
        filters={filters}
        setActiveFilters={handleActiveFilters}
        activeFilters={activeFilters}
        headline={headline}
      />
    ),
    [filters, handleActiveFilters, activeFilters, headline]
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {renderToolbar}
        {renderTable}
      </Paper>
      {drawer}
    </div>
  );
}
