import * as React from 'react';

import { fireEvent, cleanup } from '@testing-library/react';
import { Button } from './Button';
import { ArrowForward } from '..';
import { render } from '../test-utils';

const label = 'Some Label';

describe('<Button/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(<Button>{label}</Button>);
    expect(container.textContent).toEqual(label);
  });

  it('should render the component on the left side', () => {
    const { container } = render(
      <Button iconPosition={'left'}>{label}</Button>
    );
    expect(container.textContent).toEqual(label);
  });

  it('should render the component on the left side with icon', () => {
    const { container } = render(
      <Button iconPosition={'left'} icon={ArrowForward} variant={'contained'}>
        {label}
      </Button>
    );
    expect(container.textContent).toEqual(label);
    const icon = container.querySelector<HTMLOrSVGImageElement>('svg');
    expect(icon!).toBeTruthy();
  });

  it('should render the component on the right side with icon and progress', () => {
    const { container } = render(
      <Button iconPosition={'right'} variant={'contained'} showProgress={true}>
        {label}
      </Button>
    );
    expect(container.textContent).toEqual(label);
    const icon = container.querySelector<HTMLOrSVGImageElement>('svg');
    expect(icon!).toBeTruthy();
    expect(icon!.classList).toContain('MuiCircularProgress-svg');
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
