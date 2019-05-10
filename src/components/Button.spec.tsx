import * as React from 'react';

import { render, fireEvent, cleanup } from 'react-testing-library';
import { Button } from './Button';

const label = 'Some Label';

describe('<Button />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(<Button>{label}</Button>);
    expect(container.textContent).toEqual(label);
  });

  it('should trigger onClick callback', () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };
    const { getByTestId } = render(
      <Button onClick={handleClick} data-testid="button">
        {label}
      </Button>
    );
    fireEvent.click(getByTestId('button'));
    expect(clicked).toBe(true);
  });
});
