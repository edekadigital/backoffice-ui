import * as React from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';
import { Button } from './Button';
import { ThemeProvider } from '..';

const label = 'Some Label';

describe('<Button />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(
      <ThemeProvider>
        <Button>{label}</Button>
      </ThemeProvider>
    );
    expect(container.textContent).toEqual(label);
  });

  it('should trigger onClick callback', () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };
    const { getByTestId } = render(
      <ThemeProvider>
        <Button onClick={handleClick} data-testid="button">
          {label}
        </Button>
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('button'));
    expect(clicked).toBe(true);
  });
});
