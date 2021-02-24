import { Divider } from '@material-ui/core';
import { cleanup, render } from '@testing-library/react';
import * as React from 'react';

describe('<IconButton/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId } = render(<Divider />);
    expect(getByTestId('divider')).toBeTruthy();
  });
});
