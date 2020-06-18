import * as React from 'react';
import { cleanup, wait } from '@testing-library/react';
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
import { GetApp } from '../../icons';
import { EnhancedDataTableSelectionMenuActions } from './EnhancedDataTableSelectionMenu';

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
  pageSize = 10,
  pageIndex = 0,
}) => {
  const { paginatedResult, totalCount } = paginateTable(
    pageSize,
    pageIndex,
    testData
  );
  return new Promise((resolve) => {
    resolve({ data: paginatedResult, totalCount, pageIndex });
  });
};

describe('<EnhancedDataTable />', () => {
  beforeEach(() => {
    fetchDataFn = jest.fn(fetchData);
  });

  afterEach(cleanup);

  it('should render a loading indicator if data is undefined', async () => {
    const fetchUndefined: EnhancedDataTableFetchData<TestData> = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: TestData[] = undefined as any;
      return new Promise((resolve) => {
        resolve({ data, totalCount: 0, pageIndex: 0 });
      });
    };
    const { container, queryByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchUndefined} />
    );
    await wait(() => expect(container).toBeTruthy());
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
    await wait();
  });

  it('should render the enhanced table component if data is provided', async () => {
    const { container, getByTestId, queryByTestId } = render(
      <EnhancedDataTable
        columns={columns}
        fetchData={fetchDataFn}
        headline={'Headline'}
      />
    );
    await wait(() => expect(container).toBeTruthy());
    expect(fetchDataFn).toBeCalledTimes(1);
    expect(fetchDataFn).toHaveBeenCalledWith({
      filters: undefined,
      order: 'asc',
      orderBy: undefined,
      pageIndex: 0,
      pageSize: 10,
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
        resolve({ data: [], totalCount: 0, pageIndex: 0 });
      });
    };
    const { queryByTestId, getByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchEmpty} />
    );
    await wait();
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-emptyResult')).toBeTruthy();
    expect(
      getByTestId('enhancedDataTable-emptyResult').firstChild?.textContent
    ).toBe('Keine Datensätze gefunden');
  });

  it('should render a null result info if fetch data function promise is being rejected', async () => {
    const fetchRejected: EnhancedDataTableFetchData<TestData> = () => {
      return Promise.reject();
    };
    const { queryByTestId, getByTestId } = render(
      <EnhancedDataTable columns={columns} fetchData={fetchRejected} />
    );
    await wait();
    expect(queryByTestId('enhancedDataTable-container')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-pagination')).toBeFalsy();
    expect(queryByTestId('enhancedDataTable-emptyResult')).toBeTruthy();
    expect(
      getByTestId('enhancedDataTable-emptyResult').firstChild?.textContent
    ).toBe('Keine Datensätze gefunden');
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
    await wait();
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
    await wait();
    expect(
      container.querySelector('.MuiTablePagination-select')?.firstChild
        ?.textContent
    ).toBe('1');
    expect(fetchDataFn.mock.calls[0][0].pageSize).toBe(1);
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
    await wait();
    expect(fetchDataFn.mock.calls[0][0].pageSize).toBe(1);
    userEvent.click(container.querySelector('.MuiTablePagination-select')!);
    const paginationSelectItems = baseElement.querySelectorAll(
      '.MuiTablePagination-menuItem'
    );
    expect(paginationSelectItems.length).toBe(2);
    expect(paginationSelectItems[0].textContent).toBe('1');
    expect(paginationSelectItems[1].textContent).toBe('2');
    userEvent.click(paginationSelectItems[1]);
    await wait();
    expect(fetchDataFn).toHaveBeenCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].pageSize).toBe(2);
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
    await wait();
    expect(fetchDataFn.mock.calls[0][0].pageIndex).toBe(0);
    userEvent.click(
      container.querySelectorAll('button[title="Nächste Seite"]')[1]!
    );
    await wait();
    expect(fetchDataFn).toHaveBeenCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].pageIndex).toBe(1);
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
    await wait();
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
    const selectionActions: Array<EnhancedDataTableSelectionMenuActions<
      TestData
    >> = [
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
    await wait();
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
    const selectionActions: Array<EnhancedDataTableSelectionMenuActions<
      TestData
    >> = [
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
    await wait();
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
    const selectionActions: Array<EnhancedDataTableSelectionMenuActions<
      TestData
    >> = [
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
    await wait();
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
    await wait();

    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-0'));
    await wait();
    expect(fetchDataFn).toHaveBeenCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].order).toBe('asc');
    expect(fetchDataFn.mock.calls[1][0].orderBy).toBe(columns[0].accessor);

    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-0'));
    await wait();
    expect(fetchDataFn).toHaveBeenCalledTimes(3);
    expect(fetchDataFn.mock.calls[2][0].order).toBe('desc');
    expect(fetchDataFn.mock.calls[2][0].orderBy).toBe(columns[0].accessor);

    // column should be not sortable
    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-1'));
    await wait();
    expect(fetchDataFn).toHaveBeenCalledTimes(3);

    userEvent.click(getByTestId('enhancedDataTable-head-column-sort-2'));
    await wait();
    expect(fetchDataFn).toHaveBeenCalledTimes(4);
    expect(fetchDataFn.mock.calls[3][0].order).toBe('asc');
    expect(fetchDataFn.mock.calls[3][0].orderBy).toBe(columns[2].accessor);
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
    await wait();
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
      getByTestId('enhancedDataTable-filterBar-input').querySelector('input')!,
      'filterValue'
    );
    // submit filter value form
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await wait();
    // expect fetchData function to have been called with selected filter and its defined value
    expect(fetchDataFn.mock.calls[1][0].filters).toStrictEqual([
      { ...filters[0], selectorValues: undefined, value: 'filterValue' },
    ]);
    // filter menu should be closed automatically and the active filter should be rendered
    expect(queryByTestId('enhancedDataTable-filterBar-filterMenu')).toBeFalsy();
    expect(
      queryByTestId('enhancedDataTable-activeFilter-0')?.firstChild?.textContent
    ).toBe('Name: "filterValue"');
    // clicking the active filter should remove it
    userEvent.click(getByTestId('enhancedDataTable-activeFilter-0'));
    await wait();
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
    await wait();
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
      getByTestId('enhancedDataTable-filterBar-input').querySelector('input')!,
      'filterValue'
    );
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await wait();

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
      getByTestId('enhancedDataTable-filterBar-input').querySelector('input')!,
      'filterValue'
    );
    userEvent.click(getByTestId('enhancedDataTable-filterBar-submit'));
    await wait();

    // all available filters are active - no further filters can be added
    expect(
      getByTestId('enhancedDataTable-filterBar-add').classList.contains(
        'Mui-disabled'
      )
    ).toBeTruthy();
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(queryByTestId('enhancedDataTable-filterBar-filterMenu')).toBeFalsy();
  });

  it('should be to close the previously opened filter menu', async () => {
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
    await wait();
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
    userEvent.click(getByTestId('enhancedDataTable-filterBar-close'));
    expect(
      getByTestId('enhancedDataTable-filterBar-filterMenu').getAttribute(
        'data-open'
      )
    ).toBe('false');
  });

  it('should be possible to set and unset a filter on a given column by clicking a predefined filter value', async () => {
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
    await wait();
    userEvent.click(getByTestId('enhancedDataTable-filterBar-add'));
    expect(
      getByTestId('enhancedDataTable-filterBar-selectFilter-0').firstChild!
        .textContent
    ).toBe(filters[0].label);
    userEvent.click(getByTestId('enhancedDataTable-filterBar-selectFilter-0'));
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
    await wait();
    expect(fetchDataFn).toBeCalledTimes(2);
    expect(fetchDataFn.mock.calls[1][0].filters).toStrictEqual([
      { ...filters[0], value: filters[0].selectorValues![0] },
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
    await wait();
    expect(queryAllByTestId('custom-component').length).toBe(2);
    expect(getAllByTestId('custom-component')[0].innerHTML).toBe(
      testData[0].name
    );
    expect(getAllByTestId('custom-component')[1].innerHTML).toBe(
      testData[1].name
    );
  });
});
