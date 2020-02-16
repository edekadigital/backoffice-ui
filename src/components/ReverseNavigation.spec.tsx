import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { render } from '../test-utils';
import { ReverseNavigation } from '..';

describe('<ReverseNavigation/>', () => {
  afterEach(cleanup);

  it('should render the reverse navigation component', () => {
    const onClick = () => {};

    const { getByTestId } = render(
      <ReverseNavigation infoBarContent={'test'} onBackClick={onClick} />
    );

    expect(getByTestId('reverseNavigation-infoBar')).toBeTruthy();
    expect(getByTestId('reverseNavigation-infoBar').textContent).toEqual(
      'test'
    );
  });

  it('should trigger onClick callback for reverse navigation', () => {
    let clicked = false;
    const onClick = () => {
      clicked = true;
    };

    const { getByTestId } = render(<ReverseNavigation onBackClick={onClick} />);

    fireEvent.click(getByTestId('reverseNavigation-back'));
    expect(clicked).toBe(true);
  });

  it('should trigger onClick callback for reverse navigation with variant narrow', () => {
    let clicked = false;
    const onClick = () => {
      clicked = true;
    };

    const { getByTestId } = render(<ReverseNavigation onBackClick={onClick} />);

    fireEvent.click(getByTestId('reverseNavigation-back'));
    expect(clicked).toBe(true);
  });
});
