import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { AppBar, Logout } from '..';
import userEvent from '@testing-library/user-event';
import { render } from '../test-utils';
import { AppBarActions } from './AppBar';

describe('<AppBar />', () => {
  afterEach(cleanup);

  it('should render the app bar component', () => {
    const { container } = render(<AppBar gutterBottom>Some title</AppBar>);
    expect(container).toBeTruthy();
  });

  it('should render the label', () => {
    const { getByTestId } = render(<AppBar>Some title</AppBar>);
    expect(getByTestId('appBar-title').textContent).toEqual('Some title');
  });

  it('should render action item and call its handler', () => {
    const icon = Logout;
    const handler = jest.fn();

    const actions: AppBarActions = [
      {
        icon,
        handler,
      },
    ];

    const { getByTestId } = render(
      <AppBar actions={actions}>Some title</AppBar>
    );
    userEvent.click(getByTestId('appBar-actionItem-0'));
    expect(handler).toBeCalledTimes(1);
  });

  it('should render grid menu and close after pressing escape key', () => {
    const icon = Logout;
    const handler = jest.fn();

    const actions: AppBarActions = [
      {
        icon,
        menuType: 'grid',
        items: [
          {
            label: 'Some item',
            icon,
            handler,
          },
        ],
      },
    ];

    const { getByTestId } = render(
      <AppBar actions={actions}>Some title</AppBar>
    );

    expect(getByTestId('appBar-menuItem-0-0')).not.toBeVisible();
    userEvent.click(getByTestId('appBar-actionItem-0'));
    expect(getByTestId('appBar-menuItem-0-0')).toBeVisible();
    fireEvent.keyDown(getByTestId('appBar-menuItem-0-0'), {
      key: 'Esc',
      code: 'Esc',
    });
    expect(getByTestId('appBar-menuItem-0-0')).not.toBeVisible();
  });

  it('should render grid menu and call item handler and close menu afterwards', () => {
    const icon = Logout;
    const handler = jest.fn();

    const actions: AppBarActions = [
      {
        icon,
        menuType: 'grid',
        items: [
          {
            label: 'Some item',
            icon,
            handler,
          },
        ],
      },
    ];

    const { getByTestId } = render(
      <AppBar actions={actions}>Some title</AppBar>
    );

    userEvent.click(getByTestId('appBar-actionItem-0'));
    expect(getByTestId('appBar-menuItem-0-0')).toBeVisible();
    userEvent.click(getByTestId('appBar-menuItem-0-0'));
    expect(handler).toBeCalledTimes(1);
    expect(getByTestId('appBar-menuItem-0-0')).not.toBeVisible();
  });

  it('should render list menu and close after pressing escape key', () => {
    const icon = Logout;
    const handler = jest.fn();

    const actions: AppBarActions = [
      {
        icon,
        menuType: 'list',
        items: [
          {
            label: 'Some item',
            icon,
            handler,
          },
        ],
      },
    ];

    const { getByTestId } = render(
      <AppBar actions={actions}>Some title</AppBar>
    );

    expect(getByTestId('appBar-menuItem-0-0')).not.toBeVisible();
    userEvent.click(getByTestId('appBar-actionItem-0'));
    expect(getByTestId('appBar-menuItem-0-0')).toBeVisible();
    fireEvent.keyDown(getByTestId('appBar-menuItem-0-0'), {
      key: 'Esc',
      code: 'Esc',
    });
    expect(getByTestId('appBar-menuItem-0-0')).not.toBeVisible();
  });

  it('should render list menu and call item handler and close menu afterwards', () => {
    const icon = Logout;
    const handler = jest.fn();

    const actions: AppBarActions = [
      {
        icon,
        menuType: 'list',
        items: [
          {
            label: 'Some item',
            icon,
            handler,
          },
        ],
      },
    ];

    const { getByTestId } = render(
      <AppBar actions={actions}>Some title</AppBar>
    );

    userEvent.click(getByTestId('appBar-actionItem-0'));
    expect(getByTestId('appBar-menuItem-0-0')).toBeVisible();
    userEvent.click(getByTestId('appBar-menuItem-0-0'));
    expect(handler).toBeCalledTimes(1);
    expect(getByTestId('appBar-menuItem-0-0')).not.toBeVisible();
  });
});
