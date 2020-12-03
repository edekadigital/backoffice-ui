import * as React from 'react';

import { fireEvent, cleanup } from '@testing-library/react';
import { Button } from './Button';
import { ArrowForward } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

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

  it('should open menu if provided', () => {
    const fooFn = jest.fn();
    const onClickFn = jest.fn();
    const { getByTestId } = render(
      <Button
        menu={{ items: [{ label: 'foo', handler: fooFn }] }}
        data-testid="button"
        onClick={onClickFn}
      >
        {label}
      </Button>
    );
    userEvent.click(getByTestId('button'));
    expect(getByTestId('listMenu')).toBeVisible();
    expect(getByTestId('listMenu-menuItem-0')).toBeVisible();
    expect(getByTestId('listMenu-menuItem-0').textContent).toBe('foo');
    userEvent.click(getByTestId('listMenu-menuItem-0'));
    expect(fooFn).toHaveBeenCalledTimes(1);
    expect(onClickFn).toHaveBeenCalledTimes(0);
  });

  it('should render button as split button', () => {
    const onClickFn = jest.fn();
    const fooFn = jest.fn();
    const { getByTestId } = render(
      <Button
        menu={{ splitButton: true, items: [{ label: 'foo', handler: fooFn }] }}
        onClick={onClickFn}
      >
        {label}
      </Button>
    );
    expect(getByTestId('splitButton-main')).toBeTruthy();
    expect(getByTestId('splitButton-menu')).toBeTruthy();
    userEvent.click(getByTestId('splitButton-main'));
    expect(onClickFn).toHaveBeenCalledTimes(1);
    userEvent.click(getByTestId('splitButton-menu'));
    expect(getByTestId('listMenu')).toBeVisible();
    expect(getByTestId('listMenu-menuItem-0')).toBeVisible();
    expect(getByTestId('listMenu-menuItem-0').textContent).toBe('foo');
    userEvent.click(getByTestId('listMenu-menuItem-0'));
    expect(fooFn).toHaveBeenCalledTimes(1);
  });
});
