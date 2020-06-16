import * as React from 'react';
import { cleanup, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import {
  EnhancedDataTable,
  EnhancedDataTableFetchData,
  EnhancedDataTableColumn,
  EnhancedDataTableFetchResult,
} from './EnhancedDataTable';
import { paginateTable } from '../../utils/tableUtils';

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
  return new Promise(resolve => {
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
      // tslint:disable-next-line: no-any
      const data: TestData[] = undefined as any;
      return new Promise(resolve => {
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
      return new Promise(resolve => {
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
});
