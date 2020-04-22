import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { DataTable, FetchResult } from './DataTable';
import { render } from '../../test-utils';
import { ArrowRight } from '../..';
import 'react-table';

const fetchData = (): Promise<FetchResult<{}>> =>
  new Promise(() => [
    { data: [{ some: 'data', data: 'some' }], pageIndex: 1, totalCount: 1 },
  ]);

describe('<DataTable>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const columns = [
      { Header: 'Some', accessor: 'some' },
      { Header: 'Data', accessor: 'data' },
    ];
    const { container } = render(
      <DataTable
        fetchData={fetchData}
        columns={columns}
        pagination={{ labelRowsPerPage: 'Rows', rowsPerPageOptions: [5, 10] }}
        headline="Test table"
        actions={[{ icon: ArrowRight, handler: jest.fn() }]}
        drawerWidth="sm"
        tableSelectionActions={[{ icon: ArrowRight, handler: jest.fn() }]}
      />
    );
    expect(container).toBeTruthy();
  });
});
