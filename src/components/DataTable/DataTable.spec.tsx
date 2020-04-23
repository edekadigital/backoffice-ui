import * as React from 'react';

import { cleanup, fireEvent } from '@testing-library/react';
import { DataTable, FetchResult } from './DataTable';
import { render } from '../../test-utils';
import { ArrowRight } from '../..';

const fetchData = (): Promise<FetchResult<{}>> =>
  new Promise(() => [
    { data: [{ some: 'data', data: 'some' }], pageIndex: 1, totalCount: 1 },
  ]);

const columns = [
  { Header: 'Some', accessor: 'some' },
  { Header: 'Data', accessor: 'data' },
];

describe('<DataTable>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(
      <DataTable
        fetchData={fetchData}
        columns={columns}
        pagination={{ labelRowsPerPage: 'Rows', rowsPerPageOptions: [5, 10] }}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should render the component with checkboxes', () => {
    const { container, getByTestId } = render(
      <DataTable
        fetchData={fetchData}
        columns={columns}
        pagination={{ labelRowsPerPage: 'Rows', rowsPerPageOptions: [5, 10] }}
        tableSelectionActions={[{ icon: ArrowRight, handler: jest.fn() }]}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should render the component with actions', () => {
    const { getByTestId } = render(
      <DataTable
        fetchData={fetchData}
        columns={columns}
        pagination={{ labelRowsPerPage: 'Rows', rowsPerPageOptions: [5, 10] }}
        actions={[{ icon: ArrowRight, handler: jest.fn() }]}
      />
    );

    expect(getByTestId('tablebar-action')).toBeTruthy();
  });

  it('should render the component with headline', () => {
    const { getByTestId } = render(
      <DataTable
        fetchData={fetchData}
        columns={columns}
        pagination={{ labelRowsPerPage: 'Rows', rowsPerPageOptions: [5, 10] }}
        headline="Test table"
      />
    );
    expect(getByTestId('tablebar-heading')).toBeTruthy();
  });

  it('should render the component with headline', () => {
    const { getByTitle } = render(
      <DataTable
        fetchData={fetchData}
        columns={columns}
        pagination={{ labelRowsPerPage: 'Rows', rowsPerPageOptions: [5, 10] }}
        headline="Test table"
      />
    );

    fireEvent.click(getByTitle('Next page'));
  });
});
