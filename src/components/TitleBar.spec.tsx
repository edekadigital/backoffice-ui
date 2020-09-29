import * as React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test-utils';
import { Star, TitleBar } from '..';

describe('<TitleBar/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId, queryByTestId } = render(<TitleBar>lorem</TitleBar>);
    expect(getByTestId('titleBar-title').textContent).toBe('lorem');
    expect(queryByTestId('titleBar-backButton')).toBeFalsy();
    expect(queryByTestId('titleBar-info')).toBeFalsy();
    expect(queryByTestId('titleBar-additionalContent')).toBeFalsy();
    expect(queryByTestId('titleBar-actions')).toBeFalsy();
  });

  it('should render with floating reverse navigation', () => {
    const onBackClickFn = jest.fn();
    const { getByTestId } = render(
      <TitleBar onBackClick={onBackClickFn}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-title').textContent).toBe('lorem');
    expect(getByTestId('titleBar-backButton')).toBeTruthy();
    userEvent.click(getByTestId('titleBar-backButton'));
    expect(onBackClickFn).toHaveBeenCalledTimes(1);
  });

  it('should render without floating reverse navigation', () => {
    const onBackClickFn = jest.fn();
    const { getByTestId } = render(
      <TitleBar onBackClick={onBackClickFn} floatingBackButton={false}>
        lorem
      </TitleBar>
    );
    expect(getByTestId('titleBar-title').textContent).toBe('lorem');
    expect(getByTestId('titleBar-backButton')).toBeTruthy();
    userEvent.click(getByTestId('titleBar-backButton'));
    expect(onBackClickFn).toHaveBeenCalledTimes(1);
  });

  it('should render with additional content (text)', () => {
    const additionalContent = 'ID: 012345678';
    const { getByTestId } = render(
      <TitleBar additionalContent={additionalContent}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-additionalContent').textContent).toBe(
      additionalContent
    );
  });

  it('should render with additional content (node)', () => {
    const additionalContent = <div data-testid="node" />;
    const { getByTestId } = render(
      <TitleBar additionalContent={additionalContent}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-additionalContent')).toBeTruthy();
    expect(getByTestId('node')).toBeTruthy();
  });

  it('should render with info content (text)', () => {
    const info = 'ID: 012345678';
    const { getByTestId } = render(<TitleBar info={info}>lorem</TitleBar>);
    expect(getByTestId('titleBar-info').textContent).toBe(info);
  });

  it('should render with info content (node)', () => {
    const info = <div data-testid="node" />;
    const { getByTestId } = render(<TitleBar info={info}>lorem</TitleBar>);
    expect(getByTestId('titleBar-info')).toBeTruthy();
    expect(getByTestId('node')).toBeTruthy();
  });

  it('should render with simple action button with label', () => {
    const clickFn = jest.fn();
    const label = 'label';
    const actions = [
      {
        handler: clickFn,
        icon: Star,
        label: label,
      },
    ];
    const { getByTestId } = render(
      <TitleBar actions={actions}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-actions')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0').textContent).toBe(label);
    userEvent.click(getByTestId('titleBar-actionItem-0'));
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  it('should render with an action menu', async () => {
    const menuItemLabel1 = 'foo';
    const menuItemClickFn1 = jest.fn();
    const actions = [
      {
        icon: Star,
        items: [
          {
            label: menuItemLabel1,
            icon: Star,
            handler: menuItemClickFn1,
          },
        ],
      },
    ];
    const { getByTestId } = render(
      <TitleBar actions={actions}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-actions')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0').textContent).toBe('');
    expect(getByTestId('titleBar-actionMenu-0')).not.toBeVisible();
    userEvent.click(getByTestId('titleBar-actionItem-0'));
    expect(getByTestId('titleBar-actionMenu-0')).toBeVisible();
    expect(getByTestId('titleBar-menuItem-0-0').textContent).toBe(
      menuItemLabel1
    );
    userEvent.click(getByTestId('titleBar-menuItem-0-0'));

    expect(menuItemClickFn1).toBeCalledTimes(1);
    await waitFor(() => {
      expect(getByTestId('titleBar-actionMenu-0')).not.toBeVisible();
    });
  });

  it('should be possible to close the action menu by pressing esc key', async () => {
    const menuItemLabel1 = 'foo';
    const menuItemClickFn1 = jest.fn();
    const actions = [
      {
        icon: Star,
        items: [
          {
            label: menuItemLabel1,
            icon: Star,
            handler: menuItemClickFn1,
          },
        ],
      },
    ];
    const { getByTestId } = render(
      <TitleBar actions={actions} gutterBottom>
        lorem
      </TitleBar>
    );
    userEvent.click(getByTestId('titleBar-actionItem-0'));
    fireEvent.keyDown(getByTestId('titleBar-menuItem-0-0'), {
      key: 'Esc',
      code: 'Esc',
    });
    await waitFor(() => {
      expect(getByTestId('titleBar-actionMenu-0')).not.toBeVisible();
    });
    expect(menuItemClickFn1).toHaveBeenCalledTimes(0);
  });
});
