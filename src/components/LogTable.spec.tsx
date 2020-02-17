import * as React from 'react';

import { render, cleanup } from '@testing-library/react';
import { LogTable } from './LogTable';
import { ThemeProvider } from '..';

describe('<LogTable />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const columns = ['Column A', 'Column B'];
    const rows = [
      ['Value A1', 'Value B1'],
      ['Value A2', 'Value B2'],
    ];

    const { getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <LogTable columns={columns} rows={rows} />
      </ThemeProvider>
    );

    expect(getByTestId(`logTable-th-0`).textContent).toEqual('Column A');
    expect(getByTestId(`logTable-th-1`).textContent).toEqual('Column B');
    expect(getByTestId(`logTable-td-0-0`).textContent).toEqual('Value A1');
    expect(getByTestId(`logTable-td-0-1`).textContent).toEqual('Value B1');
    expect(getByTestId(`logTable-td-1-0`).textContent).toEqual('Value A2');
    expect(getByTestId(`logTable-td-1-1`).textContent).toEqual('Value B2');

    expect(queryByTestId(`logTable-th-2`)).toBeNull();
    expect(queryByTestId(`logTable-td-0-2`)).toBeNull();
    expect(queryByTestId(`logTable-td-1-2`)).toBeNull();
  });
});
