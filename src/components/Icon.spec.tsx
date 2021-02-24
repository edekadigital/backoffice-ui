import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { Add } from '../icons';
import { Icon } from './Icon';

describe('<IconButton/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId } = render(<Icon icon={Add} />);
    expect(getByTestId('icon')).toBeTruthy();
  });
});
