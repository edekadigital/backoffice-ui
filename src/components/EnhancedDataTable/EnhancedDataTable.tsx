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
import { Subtitle } from '../../typography/Subtitle';
import { Body } from '../../typography/Body';

export type EnhancedDataTableFetchData<D> = (
  fetchProps: EnhancedDataTableFetchProps<D>
) => Promise<EnhancedDataTableFetchResult<D>>;
export interface EnhancedDataTableColumn<D> {
  accessor: keyof D;
  label: string;
  sortable?: boolean;
  component?: React.ElementType;
}

interface EnhancedDataTableFetchProps<D> {
  pageSize?: number;
  pageIndex?: number;
  filters?: Array<ActiveFilter<D>>;
  order?: Order;
  orderBy?: keyof D;
}

interface EnhancedDataTableFetchResult<D>
  extends Omit<PaginationState, 'pageSize'> {
  data: D[];
}

interface PaginationState {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
}

export type RowClickCallback<D> = (clickedRow: D) => void;
export interface EnhancedDataTableProps<D extends object> {
  /**
   * If provided, this React element will be rendered instead of the table body
   */
  alternativeTableBody?: React.ReactElement;
  /**
   * The core columns configuration object for the entire table.
   */
  columns: Array<EnhancedDataTableColumn<D>>;
  /**
   * Initial count of rows per page. Default is 10
   */
  defaultPageSize?: number;
  /**
   * Function for fetching data and handling pagination, filtering and sorting.
   * The served function is being called by the table itself.
   */
  fetchData: EnhancedDataTableFetchData<D>;
  /**
   * List of available (and initially active) filters
   */
  filters?: Array<Filter<D>>;
  /**
   * Table headline
   */
  headline?: string;
  /**
   * Callback function for clicking and returning an item (row).
   * If no callback function is being served, the table rows will not be clickable.
   */
  onRowClick?: RowClickCallback<D>;
  /**
   * Customizes the options of the rows per page select field.
   * If less than two options are available, no select field will be displayed.
   */
  rowsPerPageOptions?: number[];
  /**
   * List of available actions which are displayed in the selection menu, if more than one row is selected.
   * If there is less than one action served, the table rows will not be selectable.
   */
  selectionActions?: Array<EnhancedDataTableSelectionMenuActions<D>>;
  /**
   * Width of the selection menu drawer (displayed if more than one row is selected)
   */
  selectionMenuDrawerWidth?: 'sm' | 'lg';
}

export interface Filter<D> {
  accessor: keyof D;
  label: string;
  selectorValues?: string[];
  value?: string;
}

export interface ActiveFilter<D> extends Filter<D> {
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
    paginationToolbar: {
      [theme.breakpoints.up(theme.breakpoints.width('sm'))]: {
        minHeight: theme.spacing(9),
      },
    },
    alternativeTableBodyWrapper: {
      padding: theme.spacing(7),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
);

EnhancedDataTable.defaultProps = {
  selectionActions: [],
  selectionMenuDrawerWidth: 'lg',
  defaultPageSize: 10,
  rowsPerPageOptions: [5, 10, 25],
};

export function EnhancedDataTable<D extends object>(
  props: EnhancedDataTableProps<D>
) {
  const {
    alternativeTableBody,
    headline,
    columns,
    filters,
    fetchData,
    selectionActions = [],
    selectionMenuDrawerWidth = 'lg',
    onRowClick,
    defaultPageSize = 10,
    rowsPerPageOptions = [5, 10, 25],
  } = props;
  const [data, setData] = React.useState<D[]>();
  const [selectedRows, setSelectedRows] = React.useState<D[]>([]);
  const [isAllRowsSelected, setIsAllRowsSelected] = React.useState<boolean>(
    false
  );
  const [activeFilters, setActiveFilters] = React.useState<
    Array<ActiveFilter<D>> | []
  >(filters?.filter(filter => filter.value) as Array<ActiveFilter<D>>);
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageSize: defaultPageSize,
      pageIndex: 0,
      totalCount: 0,
    }
  );
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof D>();

  const classes = useStyles();

  React.useEffect(() => {
    setData(undefined);
    setSelectedRows([]);
    let isActive = true;
    fetchData({
      pageSize: paginationState.pageSize,
      pageIndex: paginationState.pageIndex,
      filters: activeFilters,
      order,
      orderBy,
    })
      .then(res => {
        if (isActive) {
          setPaginationState(prevPaginationState => ({
            ...prevPaginationState,
            pageIndex: res.pageIndex,
            totalCount: res.totalCount,
          }));
          setData(res.data);
        }
      })
      .catch(() => {
        setData([]);
      });

    return () => {
      isActive = false;
    };
  }, [
    fetchData,
    paginationState.pageSize,
    paginationState.pageIndex,
    activeFilters,
    order,
    orderBy,
  ]);

  React.useEffect(
    () => setIsAllRowsSelected(!!data && selectedRows.length === data.length),
    [data, selectedRows]
  );

  const handleActiveFilters = (filters: Array<ActiveFilter<D>>) => {
    setActiveFilters(filters);
  };

  const handleRequestSort = (property: keyof D) => {
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

  const selectionMenuDrawer = React.useMemo(() => {
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

  const renderTable = React.useMemo(() => {
    if (alternativeTableBody) {
      return (
        <div className={classes.alternativeTableBodyWrapper}>
          {alternativeTableBody}
        </div>
      );
    }
    if (!data) {
      return (
        <div
          className={classes.loaderContainer}
          data-testid={'enhancedDataTable-loading'}
        >
          <CircularProgress />
        </div>
      );
    } else if (data && data.length > 0) {
      return (
        <>
          <TableContainer data-testid={'enhancedDataTable-container'}>
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
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={paginationState.totalCount}
            rowsPerPage={paginationState.pageSize}
            page={paginationState.pageIndex}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage={'Einträge pro Seite'}
            classes={{ toolbar: classes.paginationToolbar }}
            data-testid={'enhancedDataTable-pagination'}
            hidden={!data || !data.length}
          />
        </>
      );
    } else {
      return (
        <div className={classes.alternativeTableBodyWrapper}>
          <Subtitle gutterBottom={true} color={'textSecondary'}>
            Keine Datensätze gefunden
          </Subtitle>
          <Body align={'center'} variant={'body2'} color={'textSecondary'}>
            Korrigieren Sie die Filterung um passende Datensätze anzuzeigen.
          </Body>
        </div>
      );
    }
  }, [
    data,
    columns,
    paginationState,
    selectedRows,
    isAllRowsSelected,
    order,
    orderBy,
  ]);

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
      {selectionMenuDrawer}
    </div>
  );
}
