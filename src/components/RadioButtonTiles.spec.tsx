import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { RadioButtonTiles } from '..';
import { Star } from '../icons';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('<RadioButtonTiles />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const items = [
      {
        label: 'foo',
        value: 'bar',
      },
    ];
    const { getByTestId, queryByTestId } = render(
      <RadioButtonTiles items={items} value="bar" />
    );
    expect(getByTestId('radioButtonTiles')).toBeTruthy();
    expect(getByTestId('radioButtonTiles-item-0')).toBeTruthy();
    expect(getByTestId('radioButtonTiles-item-0-label').textContent).toBe(
      items[0].label
    );
    expect(queryByTestId('radioButtonTiles-item-0-icon')).toBeFalsy();
  });

  it('should render the component with icon', () => {
    const items = [
      {
        label: 'foo',
        value: 'bar',
        icon: Star,
      },
    ];
    const { getByTestId } = render(
      <RadioButtonTiles items={items} value="bar" />
    );
    expect(getByTestId('radioButtonTiles-item-0-icon')).toBeTruthy();
  });

  it('should render multiple tiles and it should be possible to select an item', () => {
    const items = [
      {
        label: 'foo',
        value: 'bar',
      },
      {
        label: 'lorem',
        value: 'ipsum',
      },
    ];

    const onChangeFn = jest.fn();
    const { getByTestId } = render(
      <RadioButtonTiles
        items={items}
        onChange={onChangeFn}
        value={items[0].value}
      />
    );
    expect(
      getByTestId('radioButtonTiles-item-0').getAttribute('aria-selected')
    ).toBe('true');
    expect(
      getByTestId('radioButtonTiles-item-1').getAttribute('aria-selected')
    ).toBe('false');
    userEvent.click(getByTestId('radioButtonTiles-item-1'));
    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(onChangeFn.mock.calls[0][1]).toBe(items[1].value);
  });

  it('should not break if no onChange callback is provided', () => {
    const items = [
      {
        label: 'foo',
        value: 'bar',
      },
    ];

    const { getByTestId } = render(
      <RadioButtonTiles items={items} value="bar" />
    );
    userEvent.click(getByTestId('radioButtonTiles-item-0'));
    expect(getByTestId('radioButtonTiles')).toBeTruthy();
  });
});
