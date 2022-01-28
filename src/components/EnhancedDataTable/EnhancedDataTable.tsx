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
  SvgIconProps,
} from '@material-ui/core';
import {
  EnhancedDataTableToolbar,
  ToolbarActionItem,
  ToolbarActionListItem,
} from './EnhancedDataTableToolbar';
import { EnhancedDataTableHead } from './EnhancedDataTableHead';
import { EnhancedDataTableBody } from './EnhancedDataTableBody';
import {
  EnhancedDataTableSelectionMenu,
  EnhancedDataTableSelectionMenuActions,
} from './EnhancedDataTableSelectionMenu';
import { Subtitle } from '../../typography/Subtitle';
import { ButtonVariant } from '../Button';

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
  size?: number;
  page?: number;
  filters?: Array<ActiveFilter<D>>;
  order?: Order;
  orderBy?: keyof D;
}

export interface EnhancedDataTableFetchResult<D>
  extends Omit<PaginationState, 'size'> {
  data: D[];
}

interface PaginationState {
  size: number;
  page: number;
  totalCount: number;
}

export interface RowActionItem<D> {
  icon: React.ElementType<SvgIconProps>;
  handler: (clickedRow: D) => void;
}

export type RowClickCallback<D> = (clickedRow: D) => void;
export interface EnhancedDataTableProps<D extends object> {
  /**
   * If provided, this React element will be rendered instead of the table body.
   * Each child will be centered horizontally and rendered in a vertical row.
   */
  alternativeTableBody?: React.ReactElement;
  /**
   * The core columns configuration object for the entire table.
   */
  columns: Array<EnhancedDataTableColumn<D>>;
  /**
   * Initial count of rows per page.
   * @default 10
   */
  defaultPageSize?: number;
  /**
   * If provided, this element will be rendered instead of the default empty result display text.
   * Each child will be centered horizontally and rendered in a vertical row.
   */
  customNullResult?: React.ReactElement;
  /**
   * Function for fetching data and handling pagination, filtering and sorting.
   * The served function is being called by the table itself.
   */
  fetchData: EnhancedDataTableFetchData<D>;
  /**
   * If provided sets the default order for data fetching. Possible values include 'asc' and 'desc'.
   * It's default is 'asc'.
   */
  defaultOrder?: Order;
  /**
   * If provided sets the default order criterion for data fetching. Possibly includes all keys of D.
   */
  defaultOrderBy?: keyof D;
  /**
   * List of available (and initially active) filters.
   * You can activate a given filter initially by setting its value property.
   */
  filters?: Array<Filter<D>>;
  /**
   * Table headline
   */
  headline?: string;
  /**
   * Array of additional actions in the table toolbar, will be displayed as buttons
   */
  toolbarActions?: Array<ToolbarActionItem | ToolbarActionListItem>;
  /**
   * Variant of the toolbar buttons
   */
  toolbarButtonVariant?: ButtonVariant;
  /**
   * Style of the toolbar
   */
  toolbarBackgroundColor?: 'default' | 'primary';
  /**
   * Array of actions per row, each action returning an item (row). Rendered to the left of onRowClick icon if it is present.
   */
  rowActions?: Array<RowActionItem<D>>;
  /**
   * Custom icon which is rendered at the end of each row when onRowClick is being served. Default is ArrowForward.
   * @default ArrowForward
   */
  rowClickIcon?: React.ElementType<SvgIconProps>;
  /**
   * Callback function for clicking and returning an item (row).
   * If no callback function is being served, the table rows will not be clickable.
   */
  onRowClick?: RowClickCallback<D>;
  /**
   * Customizes the options of the rows per page select field.
   * If less than two options are available, no select field will be displayed.
   * @default [5, 10, 25]
   */
  rowsPerPageOptions?: number[];
  /**
   * List of available actions which are displayed in the selection menu, if more than one row is selected.
   * If there is less than one action served, the table rows will not be selectable.
   * @default []
   */
  selectionActions?: Array<EnhancedDataTableSelectionMenuActions<D>>;
  /**
   * Show reset filter button
   * @default false
   */
  showResetToolbarFilters?: boolean;
}

export interface Filter<D> {
  accessor: keyof D;
  label: string;
  selectorValues?: string[];
  initialValue?: string;
  multiple?: boolean;
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
      [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
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

/**
 * | Test ID                                                  | Description                                     |
 * | -------------------------------------------------------- | ----------------------------------------------- |
 * | `enhancedDataTable-filterBar-headline`                   | Table headline                                  |
 * | `enhancedDataTable-filterBar`                            | Filter bar container                            |
 * | `enhancedDataTable-filterBar-add`                        | Add filter button                               |
 * | `enhancedDataTable-filterBar-filterMenu`                 | Filter menu popover menu container              |
 * | `enhancedDataTable-filterBar-selectFilter-${index}`      | Filter selector                                 |
 * | `enhancedDataTable-filterBar-selectedFilter`             | Selected Filter as headline in popover menu     |
 * | `enhancedDataTable-filterBar-close`                      | Close button for filter menu                    |
 * | `enhancedDataTable-filterBar-input`                      | Filter value input field                        |
 * | `enhancedDataTable-filterBar-selectValue`                | Filter value select field                       |
 * | `enhancedDataTable-filterBar-selectValue-${index}`       | Selectable filter value item in select field    |
 * | `enhancedDataTable-filterBar-submit`                     | Filter submit button                            |
 * | `enhancedDataTable-filterBar-actions`                    | Additional actions displayed in table head      |
 * | `enhancedDataTable-filterBar-actions-${index}`           | Button inside addtional actions                 |
 * | `enhancedDataTable-activeFilter-${index}`                | Active filter chip                              |
 * | `enhancedDataTable-alternativeBody`                      | Alternative table body container                |
 * | `enhancedDataTable-loading`                              | Loading spinner                                 |
 * | `enhancedDataTable-container`                            | table container                                 |
 * | `enhancedDataTable-head`                                 | table head container                            |
 * | `enhancedDataTable-head-selectAll`                       | _Select all_ checkbox in table head             |
 * | `enhancedDataTable-head-column-${index}`                 | table head column                               |
 * | `enhancedDataTable-head-column-sort-${index}`            | table head sort button                          |
 * | `enhancedDataTable-head-emptyColumn`                     | Empty head column (if table items are clickable |
 * | `enhancedDataTable-body`                                 | Table body container                            |
 * | `enhancedDataTable-body-row-${index}`                    | Row                                             |
 * | `enhancedDataTable-body-row-select-${index}`             | Row select checkbox                             |
 * | `enhancedDataTable-body-row-click-${index}`              | Row click (on row itself)                       |
 * | `enhancedDataTable-body-row-clickArrow-${index}`         | Row click (on icon)                             |
 * | `enhancedDataTable-body-row-${rowIndex}-column-${index}` | Specific table cell                             |
 * | `enhancedDataTable-body-row-action-${index}`             | Row Action                                      |
 * | `enhancedDataTable-body-row-action-icon-${index}`        | Row action icon                                 |
 * | `enhancedDataTable-pagination`                           | Table Pagination container                      |
 * | `enhancedDataTable-emptyResult`                          | Null result container                           |
 * | `enhancedDataTable-selectionMenu`                        | Selection menu drawer container                 |
 * | `enhancedDataTable-selectionMenu-selectAll`              | _Select all_ checkbox in selection drawer       |
 * | `enhancedDataTable-selectionMenu-action-${index}`        | Action button in selection drawer               |
 */
export function EnhancedDataTable<D extends object>(
  props: EnhancedDataTableProps<D>
) {
  const {
    alternativeTableBody,
    customNullResult = <DefaultNullResult />,
    headline,
    toolbarActions,
    columns,
    filters,
    fetchData,
    defaultOrder = 'asc',
    defaultOrderBy,
    selectionActions = [],
    onRowClick,
    defaultPageSize = 10,
    rowsPerPageOptions = [5, 10, 25],
    rowActions = [],
    rowClickIcon,
    showResetToolbarFilters,
    toolbarButtonVariant,
    toolbarBackgroundColor,
  } = props;
  const [data, setData] = React.useState<D[]>();
  const [selectedRows, setSelectedRows] = React.useState<D[]>([]);
  const [activeFilters, setActiveFilters] = React.useState<
    Array<ActiveFilter<D>> | []
  >(
    filters
      ?.filter((filter) => filter.initialValue)
      .map((filter) => ({
        accessor: filter.accessor,
        label: filter.label,
        selectorValues: filter.selectorValues,
        initialValue: filter.initialValue,
        multiple: filter.multiple,
        value: filter.initialValue,
      })) as Array<ActiveFilter<D>>
  );
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      size: defaultPageSize,
      page: 0,
      totalCount: 0,
    }
  );
  const [order, setOrder] = React.useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = React.useState<keyof D | undefined>(
    defaultOrderBy
  );
  const tableRef = React.useRef<HTMLDivElement>(null);
  const isAllRowsSelected = !!data && selectedRows.length === data.length;
  const classes = useStyles();

  React.useEffect(() => {
    setData(undefined);
    setSelectedRows([]);
    let isActive = true;
    fetchData({
      size: paginationState.size,
      page: paginationState.page,
      filters: activeFilters,
      order,
      orderBy,
    })
      .then((res) => {
        if (isActive) {
          setPaginationState((prevPaginationState) => ({
            ...prevPaginationState,
            page: res.page,
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
    paginationState.size,
    paginationState.page,
    activeFilters,
    order,
    orderBy,
  ]);

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
    setPaginationState((prevPaginationState) => ({
      ...prevPaginationState,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPaginationState((prevPaginationState) => ({
      ...prevPaginationState,
      size: Number(event.target.value),
      page: 0,
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
    if (selectionActions.length > 0) {
      let drawerPosition: { left: number; width: number } | undefined;
      if (tableRef.current) {
        drawerPosition = {
          left: tableRef.current?.getBoundingClientRect().left,
          width: tableRef.current?.getBoundingClientRect().width,
        };
      }
      return (
        <EnhancedDataTableSelectionMenu
          actions={selectionActions}
          onSelectAllClick={handleSelectAllClick}
          selectedRows={selectedRows}
          isAllRowsSelected={isAllRowsSelected}
          drawerPosition={drawerPosition}
        />
      );
    } else return <></>;
  }, [selectionActions, selectedRows, isAllRowsSelected, tableRef]);

  const renderTable = React.useMemo(() => {
    if (alternativeTableBody) {
      return (
        <div
          className={classes.alternativeTableBodyWrapper}
          data-testid={'enhancedDataTable-alternativeBody'}
        >
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
                rowActions={rowActions}
                selectedRowsCount={selectedRows.length}
              />
              <EnhancedDataTableBody
                columns={columns}
                data={data}
                selectable={selectionActions.length > 0}
                selectedRows={selectedRows}
                onSelectRowClick={handleSelectRowClick}
                onRowClick={onRowClick}
                rowActions={rowActions}
                rowClickIcon={rowClickIcon}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={paginationState.totalCount}
            rowsPerPage={paginationState.size}
            page={paginationState.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Einträge pro Seite'}
            classes={{ toolbar: classes.paginationToolbar }}
            data-testid={'enhancedDataTable-pagination'}
            hidden={!data || !data.length}
          />
        </>
      );
    } else {
      return (
        <div
          className={classes.alternativeTableBodyWrapper}
          data-testid={'enhancedDataTable-emptyResult'}
        >
          {customNullResult}
        </div>
      );
    }
  }, [
    alternativeTableBody,
    rowsPerPageOptions,
    data,
    columns,
    paginationState,
    selectedRows,
    selectionActions,
    isAllRowsSelected,
    order,
    orderBy,
  ]);

  const renderToolbar = (
    <EnhancedDataTableToolbar
      buttonVariant={toolbarButtonVariant}
      filters={filters}
      setActiveFilters={handleActiveFilters}
      activeFilters={activeFilters}
      headline={headline}
      toolbarActions={toolbarActions}
      toolbarBackgroundColor={toolbarBackgroundColor ?? 'default'}
      showResetToolbarFilters={showResetToolbarFilters ?? false}
    />
  );

  return (
    <div className={classes.root} ref={tableRef}>
      <Paper className={classes.paper} variant={'outlined'}>
        {renderToolbar}
        {renderTable}
      </Paper>
      {selectionMenuDrawer}
    </div>
  );
}

const DefaultNullResult = () => (
  <Subtitle gutterBottom={true} color={'textSecondary'}>
    Keine Datensätze gefunden
  </Subtitle>
);
