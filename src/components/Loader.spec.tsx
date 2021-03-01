import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { Loader } from './Loader';

describe('<ListMenu/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId('circular-progress')).toBeTruthy();
  });
  it('should render the component with message', () => {
    const { getByTestId } = render(<Loader message="Message" />);
    expect(getByTestId('circular-progress')).toBeTruthy();
    expect(getByTestId('message')).toBeTruthy();
  });
});
