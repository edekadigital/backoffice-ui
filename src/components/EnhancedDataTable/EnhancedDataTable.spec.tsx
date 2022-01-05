import * as React from 'react';
import { act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import {
  EnhancedDataTable,
  EnhancedDataTableFetchData,
  EnhancedDataTableColumn,
  EnhancedDataTableFetchResult,
  Filter,
} from './EnhancedDataTable';
import { paginateTable } from '../../utils/tableUtils';
import { Edit, GetApp } from '../../icons';
import { EnhancedDataTableSelectionMenuActions } from './EnhancedDataTableSelectionMenu';
import {
  ToolbarActionItem,
  ToolbarActionListItem,
} from './EnhancedDataTableToolbar';

interface TestData {
  city: string;
  age?: number;
  name: string;
}

const columns: Array<EnhancedDataTableColumn<TestData>> = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'city', label: 'City', sortable: false },
  { accessor: 'age', label: 'Age' },
];

const testData = [
  {
    name: 'Cain Ward',
    city: 'Stockholm',
    age: 32,
  },
  {
    name: 'Mullins Clemons',
    city: 'Göteborg',
    age: 23,
  },
];

let fetchDataFn: jest.Mock<Promise<EnhancedDataTableFetchResult<TestData>>>;

const fetchData: EnhancedDataTableFetchData<TestData> = ({
  size = 10,
  page = 0,
}) => {
  return new Promise((resolve) => {
    resolve(paginateTable(size, page, testData));
  });
};

describe('<EnhancedDataTable />', () => {
  beforeEach(() => {
    fetchDataFn = jest.fn(fetchData);
  });

  afterEach(cleanup);

  it('should render a loading indicator if data is undefined', async () => {
    const fetchUndefined: EnhancedDataTableFetchData<TestData> = () =>
      Promise.resolve({
        totalCount: 0,
        page: 0,
      } as EnhancedDataTableFetchResult<TestData>);
    const { container, queryByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchUndefined} />
    );
    await waitFor(() => expect(container).toBeTruthy());
    expect(queryByTestId('enhancedDataTable-loading')).toBeTruthy();
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
  });

  it('should render a loading indicator if data is being loaded', async () => {
    const { queryByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchDataFn} />
    );
    expect(queryByTestId('enhancedDataTable-loading')).toBeTruthy();
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
    await waitFor(() => {});
  });

  it('should render the enhanced table component if data is provided', async () => {
    const { container, getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        headline={'Headline'}
      />
    );
    await waitFor(() => expect(container).toBeTruthy());
    expect(fetchDataFn).toBeCalledTimes(1);
    expect(fetchDataFn).toHaveBeenCalledWith({
      filters: undefined,
      order: 'asc',
      orderBy: undefined,
      page: 0,
      size: 10,
    });
    expect(getByTestId('enhancedDataTable-container')).toBeTruthy();
    expect(getByTestId('enhancedDataTable-filterBar-headline').innerHTML).toBe(
      'Headline'
    );
    expect(queryByTestId('enhancedDataTable-filterBar')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-selectionMenu')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-head-selectAll')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-head-emptyColumn')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-head')).toBeTruthy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeTruthy();

    columns.forEach((columnn, index) => {
      expect(
        getByTestId(`enhancedDataTable-head-column-${index}`).firstChild!
          .textContent
      ).toBe(columnn.label);
    });
    testData.forEach((entry, rowIndex) => {
      expect(
        queryByTestId(`enhancedDataTable-body-row-select-${rowIndex}`)
      ).toBeFalsy();
      expect(
        queryByTestId(`enhancedDataTable-body-row-clickArrow-${rowIndex}`)
      ).toBeFalsy();
      columns.forEach((column, index) => {
        expect(
          getByTestId(`enhancedDataTable-body-row-${rowIndex}-column-${index}`)
            .innerHTML
        ).toBe(entry[column.accessor].toString());
      });
    });
  });

  it('should render a null result info if data is empty', async () => {
    const fetchEmpty: EnhancedDataTableFetchData<TestData> = () => {
      return new Promise((resolve) => {
        resolve({ data: [], totalCount: 0, page: 0 });
      });
    };
    const { queryByTestId, getByText } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchEmpty} />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-emptyResult')).toBeTruthy();
    expect(getByText('Keine Datensätze gefunden')).toBeTruthy();
  });

  it('should render a custom null result info if data is empty', async () => {
    const fetchEmpty: EnhancedDataTableFetchData<TestData> = () => {
      return new Promise((resolve) => {
        resolve({ data: [], totalCount: 0, page: 0 });
      });
    };

    const customNullResult = <span data-testid="nullResult">Empty</span>;

    const { queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchEmpty}
        customNullResult={customNullResult}
      />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-emptyResult')).toBeTruthy();
    expect(queryByTestId('nullResult')).toBeTruthy();
    expect(queryByTestId('nullResult')!.textContent).toBe('Empty');
  });

  it('should render a null result info if fetch data function promise is being rejected', async () => {
    const fetchRejected: EnhancedDataTableFetchData<TestData> = () => {
      return Promise.reject();
    };
    const { queryByTestId, getByText } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchRejected} />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-emptyResult')).toBeTruthy();
    expect(getByText('Keine Datensätze gefunden')).toBeTruthy();
  });

  it('should render an alternative table body component if provided', async () => {
    const alternativeBody = (
      <div data-testid="alternativeBodyContent">alternativeBodyContent</div>
    );
    const { queryByTestId, getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        alternativeTableBody={alternativeBody}
      />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-alternativeBody')).toBeTruthy();
    expect(getByTestId('alternativeBodyContent').innerHTML).toBe(
      'alternativeBodyContent'
    );
  });

  it('should be possible to set rows per page initially', async () => {
    const { container } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        rowsPerPageOptions={[1, 2]}
        defaultPageSize={1}
      />
    );
    await waitFor(() => {});
    expect(
      container.querySelector('.MuiTablePagination-select')?.firstChild
        ?.textContent
    ).toBe('1');
    expect(fetchDataFn.mock.calls[0][0].size).toBe(1);
  });

  it('should be possible to change rows per page manually', async () => {
    const { baseElement, container } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        rowsPerPageOptions={[1, 2]}
        defaultPageSize={1}
      />
    );
    await waitFor(() => {});
    expect(fetchDataFn.mock.calls[0][0].size).toBe(1);
    userEvent.click(container.querySelector('.MuiTablePagination-select')!);
    const paginationSelectItems = baseElement.querySelectorAll(
      '.MuiTablePagination-menuItem'
    );
    expect(paginationSelectItems.length).toBe(2);
    expect(paginationSelectItems[0].textContent).toBe('1');
    expect(paginationSelectItems[1].textContent).toBe('2');
    userEvent.click(paginationSelectItems[1]);
    await waitFor(() => {});
    expect(fetchDataFn).toHaveBeenCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].size).toBe(2);
  });

  it('should be possible to paginate', async () => {
    const { container } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        rowsPerPageOptions={[1, 2]}
        defaultPageSize={1}
      />
    );
    await waitFor(() => {});
    expect(fetchDataFn.mock.calls[0][0].page).toBe(0);
    userEvent.click(
      container.querySelectorAll('button[title="Nächste Seite"]')[1]!
    );
    await waitFor(() => {});
    expect(fetchDataFn).toHaveBeenCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].page).toBe(1);
  });

  it('should be possible to click a row', async () => {
    const clickHandler = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        onRowClick={clickHandler}
      />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-head-emptyColumn')).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-body-row-0-column-0'));
    expect(clickHandler).toBeCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(testData[0]);
    expect(
      queryByTestId('enhancedDataTable-body-row-clickArrow-0')
    ).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-body-row-clickArrow-0'));
    expect(clickHandler).toBeCalledTimes(2);
    expect(clickHandler).toHaveBeenCalledWith(testData[0]);

    userEvent.click(getByTestId('enhancedDataTable-body-row-click-1'));
    expect(clickHandler).toBeCalledTimes(3);
    expect(clickHandler).toHaveBeenCalledWith(testData[1]);
    expect(
      queryByTestId('enhancedDataTable-body-row-clickArrow-1')
    ).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-body-row-clickArrow-1'));
    expect(clickHandler).toBeCalledTimes(4);
    expect(clickHandler).toHaveBeenCalledWith(testData[1]);
  });

  it('should be possible to select a row, call a selection action and unselect the selected row', async () => {
    const actionHandler = jest.fn();
    const selectionActions: Array<
      EnhancedDataTableSelectionMenuActions<TestData>
    > = [
      {
        icon: GetApp,
        handler: actionHandler,
      },
    ];

    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        selectionActions={selectionActions}
      />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-head-selectAll')).toBeTruthy();
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('false');

    userEvent.click(getByTestId('enhancedDataTable-body-row-select-0'));
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('true');
    expect(
      getByTestId('enhancedDataTable-selectionMenu-action-0')
    ).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-selectionMenu-action-0'));
    expect(actionHandler).toBeCalledTimes(1);
    expect(actionHandler).toHaveBeenCalledWith([testData[0]]);

    // unselect
    userEvent.click(getByTestId('enhancedDataTable-body-row-select-0'));
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('false');
  });

  it('should be possible to select and unselect all rows by clicking the checkbox in table head and call a selection action', async () => {
    const actionHandler = jest.fn();
    const selectionActions: Array<
      EnhancedDataTableSelectionMenuActions<TestData>
    > = [
      {
        icon: GetApp,
        handler: actionHandler,
      },
    ];

    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        selectionActions={selectionActions}
      />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-head-selectAll')).toBeTruthy();
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('false');

    userEvent.click(getByTestId('enhancedDataTable-head-selectAll'));
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('true');
    expect(
      getByTestId('enhancedDataTable-selectionMenu-action-0')
    ).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-selectionMenu-action-0'));
    expect(actionHandler).toBeCalledTimes(1);
    expect(actionHandler).toHaveBeenCalledWith(testData);

    // unselect
    userEvent.click(getByTestId('enhancedDataTable-head-selectAll'));
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('false');
  });

  it('should be possible to select all rows by clicking the checkbox in the selection menu and call a selection action', async () => {
    const actionHandler = jest.fn();
    const selectionActions: Array<
      EnhancedDataTableSelectionMenuActions<TestData>
    > = [
      {
        icon: GetApp,
        handler: actionHandler,
      },
    ];

    const { getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        selectionActions={selectionActions}
      />
    );
    await waitFor(() => {});
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('false');

    userEvent.click(getByTestId('enhancedDataTable-body-row-select-0'));
    expect(
      getByTestId('enhancedDataTable-selectionMenu').getAttribute('data-open')
    ).toBe('true');
    expect(
      getByTestId('enhancedDataTable-selectionMenu-selectAll')
    ).toBeTruthy();
    expect(
      getByTestId('enhancedDataTable-selectionMenu-action-0')
    ).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-selectionMenu-selectAll'));
    userEvent.click(getByTestId('enhancedDataTable-selectionMenu-action-0'));
    expect(actionHandler).toBeCalledTimes(1);
    expect(actionHandler).toHaveBeenCalledWith(testData);
  });

  it('should be possible to sort', async () => {
    const { getByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchDataFn} />
    );
    await waitFor(() => {});

    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-0'));
    await waitFor(() => {});
    expect(fetchDataFn).toHaveBeenCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].order).toBe('asc');
    expect(fetchDataFn.mock.calls[1][0].orderBy).toBe(columns[0].accessor);

    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-0'));
    await waitFor(() => {});
    expect(fetchDataFn).toHaveBeenCalledTimes(3);
    expect(fetchDataFn.mock.calls[2][0].order).toBe('desc');
    expect(fetchDataFn.mock.calls[2][0].orderBy).toBe(columns[0].accessor);

    // column should be not sortable
    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-1'));
    await waitFor(() => {});
    expect(fetchDataFn).toHaveBeenCalledTimes(3);

    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-2'));
    await waitFor(() => {});
    expect(fetchDataFn).toHaveBeenCalledTimes(4);
    expect(fetchDataFn.mock.calls[3][0].order).toBe('asc');
    expect(fetchDataFn.mock.calls[3][0].orderBy).toBe(columns[2].accessor);
  });

  it('should be possible to provide default sorting for data fetching', async () => {
    const { getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        defaultOrder="desc"
        defaultOrderBy={columns[1].accessor}
      />
    );
    await waitFor(() => {});
    expect(fetchDataFn).toHaveBeenCalledTimes(1);
    expect(fetchDataFn.mock.calls[0][0].order).toBe('desc');
    expect(fetchDataFn.mock.calls[0][0].orderBy).toBe(columns[1].accessor);
  });

  it('should be possible to set and unset a text filter on a given column', async () => {
    const filters: Array<Filter<TestData>> = [
      {
        accessor: 'name',
        label: 'Name',
      },
      {
        accessor: 'age',
        label: 'Age',
      },
    ];

    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        filters={filters}
      />
    );
    await waitFor(() => {});
    expect(queryByTestId('enhancedDataTable-filterBar')).toBeTruthy();
    expect(queryByTestId('enhancedDataTable-filterBar-add')).toBeTruthy();
    // clicking add filter button should open the filter menu with the available filters
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      queryByTestId('enhancedDataTable-filterBar-filterMenu')
    ).toBeTruthy();
    // available filters should be rendered in a select list
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-1').firstChild!
        .textContent
    ).toBe(filters[1].label);
    // click first entry of available filters
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    // selected filter should match the clicked one
    expect(
      getByTestId('enhancedDataTable-filterBar-selectedFilter').innerHTML
    ).toBe(filters[0].label);
    // input field and submit button should be rendered
    expect(queryByTestId('enhancedDataTable-filterBar-input')).toBeTruthy();
    expect(queryByTestId('enhancedDataTable-filterBar-submit')).toBeTruthy();
    // input filter value: 'filterValue'
    userEvent.type(
      getByTestId('enhancedDataTable-filterBar-input'),
      'filterValue'
    );
    // submit filter value form
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await waitFor(() => {});
    // expect fetchData function to have been called with selected filter and its defined value
    expect(fetchDataFn.mock.calls[1][0].filters).toStrictEqual([
      {
        ...filters[0],
        selectorValues: undefined,
        multiple: undefined,
        value: 'filterValue',
      },
    ]);
    // filter menu should be closed automatically and the active filter should be rendered
    expect(queryByTestId('enhancedDataTable-filterBar-filterMenu')).toBeFalsy();
    expect(
      queryByTestId('enhancedDataTable-activeFilter-0')?.firstChild?.textContent
    ).toBe('Name: "filterValue"');
    // clicking the active filter should remove it
    userEvent.click(getByTestId('enhancedDataTable-activeFilter-0'));
    await waitFor(() => {});
    expect(fetchDataFn.mock.calls[2][0].filters).toStrictEqual([]);
    expect(queryByTestId('enhancedDataTable-activeFilter-0')).toBeFalsy();
  });

  it('should be impossible to add a filter more than once', async () => {
    const filters: Array<Filter<TestData>> = [
      {
        accessor: 'name',
        label: 'Name',
      },
      {
        accessor: 'age',
        label: 'Age',
      },
    ];

    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        filters={filters}
      />
    );
    await waitFor(() => {});
    // add first filter
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-1').firstChild!
        .textContent
    ).toBe(filters[1].label);
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    userEvent.type(
      getByTestId('enhancedDataTable-filterBar-input'),
      'filterValue'
    );
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await waitFor(() => {});

    // add second filter - the previously added filter should not be available in the list
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[1].label);
    expect(
      queryByTestId('enhancedDataTable-filterBar-selectFilter-1')
    ).toBeFalsy();
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    userEvent.type(
      getByTestId('enhancedDataTable-filterBar-input'),
      'filterValue'
    );
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await waitFor(() => {});

    // all available filters are active - no further filters can be added
    expect(
      getByTestId('enhancedDataTable-filterBar-add').classList.contains(
        'Mui-disabled'
      )
    ).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(queryByTestId('enhancedDataTable-filterBar-filterMenu')).toBeFalsy();
  });

  it('should be possible to add a filter more than once', async () => {
    const filters: Array<Filter<TestData>> = [
      {
        accessor: 'name',
        label: 'Name',
        multiple: true,
      },
      {
        accessor: 'age',
        label: 'Age',
        multiple: true,
      },
    ];

    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        filters={filters}
      />
    );
    await waitFor(() => {});
    // add first filter
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-1').firstChild!
        .textContent
    ).toBe(filters[1].label);
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    userEvent.type(
      getByTestId('enhancedDataTable-filterBar-input'),
      'filterValue'
    );
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await waitFor(() => {});

    // add second filter
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-1').firstChild!
        .textContent
    ).toBe(filters[1].label);
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    userEvent.type(
      getByTestId('enhancedDataTable-filterBar-input'),
      'filterValue2'
    );
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await waitFor(() => {});

    // add third filter
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-1').firstChild!
        .textContent
    ).toBe(filters[1].label);
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-1'));
    userEvent.type(getByTestId('enhancedDataTable-filterBar-input'), '15');
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await waitFor(() => {});

    // all filters should be available
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-1').firstChild!
        .textContent
    ).toBe(filters[1].label);
  });

  it('should be possible to close the previously opened filter menu', async () => {
    const filters: Array<Filter<TestData>> = [
      {
        accessor: 'name',
        label: 'Name',
      },
      {
        accessor: 'age',
        label: 'Age',
      },
    ];

    const { getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        filters={filters}
      />
    );
    await waitFor(() => {});
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    userEvent.click(getByTestId('enhancedDataTable-filterBar-close'));
    expect(
      getByTestId('enhancedDataTable-filterBar-filterMenu').getAttribute(
        'data-open'
      )
    ).toBe('false');
  });

  it('should be possible to set a filter on a given column by clicking a predefined filter value', async () => {
    const filters: Array<Filter<TestData>> = [
      {
        accessor: 'name',
        label: 'Name',
        selectorValues: ['Cain Ward', 'Mullins Clemons'],
      },
    ];

    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        filters={filters}
      />
    );
    await waitFor(() => {});
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectValue'));
    expect(
      queryByTestId('enhancedDataTable-filterBar-selectValue-0')
    ).toBeTruthy();
    expect(
      queryByTestId('enhancedDataTable-filterBar-selectValue-1')
    ).toBeTruthy();

    expect(
      getByTestId('enhancedDataTable-filterBar-selectValue-0').firstChild
        ?.textContent
    ).toBe(filters[0].selectorValues![0]);
    expect(
      getByTestId('enhancedDataTable-filterBar-selectValue-1').firstChild
        ?.textContent
    ).toBe(filters[0].selectorValues![1]);
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectValue-0'));
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await waitFor(() => {});
    expect(fetchDataFn).toBeCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].filters).toStrictEqual([
      {
        ...filters[0],
        value: filters[0].selectorValues![0],
        multiple: undefined,
      },
    ]);
  });

  it('should be possible to render any element in a table cell', async () => {
    const TestComponent: React.FC = ({ children }) => (
      <div data-testid={'custom-component'}>{children}</div>
    );

    const columns: Array<EnhancedDataTableColumn<TestData>> = [
      { accessor: 'name', label: 'Name', component: TestComponent },
      { accessor: 'city', label: 'City' },
      { accessor: 'age', label: 'Age' },
    ];

    const { getAllByTestId, queryAllByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchDataFn} />
    );
    await waitFor(() => {});
    expect(queryAllByTestId('custom-component').length).toBe(2);
    expect(getAllByTestId('custom-component')[0].innerHTML).toBe(
      testData[0].name
    );
    expect(getAllByTestId('custom-component')[1].innerHTML).toBe(
      testData[1].name
    );
  });

  it('should render an alternative table body component with row data', async () => {
    const TestComponent: React.FC<{ row: TestData }> = (props) => {
      return <div data-testid="custom-component">CUSTOM {props.row.city}</div>;
    };
    const columns: Array<EnhancedDataTableColumn<TestData>> = [
      { accessor: 'name', label: 'Name', component: TestComponent },
      { accessor: 'city', label: 'City', sortable: false },
      { accessor: 'age', label: 'Age' },
    ];

    const { getAllByTestId, queryAllByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchDataFn} />
    );
    await waitFor(() => {});
    expect(queryAllByTestId('custom-component').length).toBe(2);
    expect(getAllByTestId('custom-component')[0].innerHTML).toBe(
      `CUSTOM ${testData[0].city}`
    );
    expect(getAllByTestId('custom-component')[1].innerHTML).toBe(
      `CUSTOM ${testData[1].city}`
    );
  });

  it('should show additional action buttons in table head if toolbarActions prop is given', () => {
    const handler = jest.fn();
    const actions = [
      {
        icon: GetApp,
        label: 'FooFoo',
        handler,
      },
    ];
    const { getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        toolbarActions={actions}
      />
    );
    expect(getByTestId('enhancedDataTable-filterBar-actions')).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-filterBar-actions-0'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should render addtional row actions', async () => {
    const handlerA = jest.fn();
    const handlerB = jest.fn();
    const actions = [
      { icon: GetApp, handler: handlerA },
      { icon: Edit, handler: handlerB },
    ];
    const { getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        rowActions={actions}
      />
    );
    await waitFor(() => {});
    expect(getByTestId('enhancedDataTable-body-row-0-action-0')).toBeTruthy();
    expect(getByTestId('enhancedDataTable-body-row-0-action-1')).toBeTruthy();
    expect(getByTestId('enhancedDataTable-head-emptyColumn-0')).toBeTruthy();
    expect(getByTestId('enhancedDataTable-head-emptyColumn-1')).toBeTruthy();
  });

  it('should call callback of row actions', async () => {
    const handlerA = jest.fn();
    const handlerB = jest.fn();
    const actions = [
      { icon: GetApp, handler: handlerA },
      { icon: Edit, handler: handlerB },
    ];
    const { getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        rowActions={actions}
      />
    );
    await waitFor(() => {});
    userEvent.click(getByTestId('enhancedDataTable-body-row-0-action-0'));
    userEvent.click(getByTestId('enhancedDataTable-body-row-1-action-1'));
    expect(handlerA).toBeCalledTimes(1);
    expect(handlerB).toBeCalledTimes(1);
    expect(handlerA).toHaveBeenCalledWith(testData[0]);
    expect(handlerB).toHaveBeenCalledWith(testData[1]);
  });

  it('should show reset filter button', async () => {
    const filters: Filter<TestData>[] = [
      {
        accessor: 'age',
        label: 'Age',
        initialValue: '23',
      },
    ];
    const { getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        filters={filters}
        showResetToolbarFilters={true}
      />
    );

    await waitFor(async () => {
      expect(
        getByTestId('enhancedDataTable-filterBar-resetFilters')
      ).toBeTruthy();
    });

    act(() => {
      userEvent.click(getByTestId('enhancedDataTable-filterBar-resetFilters'));
    });

    await waitFor(async () => {
      expect(queryByTestId('enhancedDataTable-activeFilter-0')).toBeFalsy();
      expect(
        queryByTestId('enhancedDataTable-filterBar-resetFilters')
      ).toBeFalsy();
    });
  });

  it('should render toolbar actions with menu', async () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const items: ToolbarActionItem[] = [
      {
        icon: GetApp,
        label: 'Sub Action 1',
        handler: handler1,
      },
      {
        icon: GetApp,
        disabled: true,
        label: 'Sub Action 2',
        handler: handler2,
      },
    ];
    const actions: (ToolbarActionItem | ToolbarActionListItem)[] = [
      {
        type: 'list',
        icon: GetApp,
        label: 'FooFoo',
        items: items,
      },
    ];
    const { getByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        toolbarActions={actions}
      />
    );
    expect(getByTestId('enhancedDataTable-filterBar-actions')).toBeTruthy();
    act(() => {
      userEvent.click(getByTestId('enhancedDataTable-filterBar-actions-0'));
    });
    await waitFor(() => {
      expect(getByTestId('listMenu-menuItem-0')).toBeTruthy();
    });
    act(() => {
      userEvent.click(getByTestId('listMenu-menuItem-0'));
    });
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(0);
  });
});
