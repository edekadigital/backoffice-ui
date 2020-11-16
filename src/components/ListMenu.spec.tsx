import { Add } from '@material-ui/icons';
import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ListMenu } from '..';

describe('<ListMenu/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const fooFn = jest.fn();
    const barFn = jest.fn();
    const onCloseFn = jest.fn();
    const items = [
      { label: 'foo', handler: fooFn },
      { label: 'bar', handler: barFn, icon: Add },
    ];
    const { getByTestId } = render(
      <ListMenu
        open={true}
        items={items}
        onClose={onCloseFn}
        anchorEl={document.createElement('div')}
      />
    );
    userEvent.click(getByTestId('listMenu-menuItem-0'));
    userEvent.click(getByTestId('listMenu-menuItem-1'));
    fireEvent.keyDown(getByTestId('listMenu-menuItem-0'), {
      key: 'Esc',
      code: 'Esc',
    });

    expect(getByTestId('listMenu')).toBeVisible();
    expect(getByTestId('listMenu-menuItem-0')).toBeVisible();
    expect(getByTestId('listMenu-menuItem-0').textContent).toBe('foo');
    expect(getByTestId('listMenu-menuItem-1')).toBeVisible();
    expect(getByTestId('listMenu-menuItem-1').textContent).toBe('bar');
    expect(getByTestId('listMenu-menuItem-1-icon')).toBeVisible();
    expect(fooFn).toHaveBeenCalledTimes(1);
    expect(barFn).toHaveBeenCalledTimes(1);
    expect(onCloseFn).toHaveBeenCalledTimes(3);
  });
});
