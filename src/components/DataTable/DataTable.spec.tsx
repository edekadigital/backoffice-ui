import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { DataTable } from './DataTable';
import { render } from '../../test-utils';
import { ArrowRight } from '../..';
import 'react-table';

const fetchData = jest
  .fn()
  .mockResolvedValue([{ data: [{ some: 'data', data: 'some' }] }]);

describe('<DataTable>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(
      <DataTable
        fetchData={fetchData}
        columns={[{ Header: 'Some' }, { Header: 'Data' }]}
        pagination={{ labelRowsPerPage: 'Rows', rowsPerPageOptions: [5, 10] }}
        headline="Test table"
        actions={[{ icon: ArrowRight, handler: jest.fn() }]}
        drawerWidth="sm"
        tableSelectionActions={[{ icon: ArrowRight, handler: jest.fn() }]}
      />
    );
    expect(container).toBeTruthy();
    console.log(container);
  });
});
