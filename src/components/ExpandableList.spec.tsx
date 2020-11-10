import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ExpandableList, CheckOptions } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

const items = [
  {
    value: 'bar',
  },
  {
    value: 'foo',
  },
];

const setup = (
  noInitialItems = false,
  isCheckable: CheckOptions | undefined = undefined,
  itemsOverride?: { value: string }[],
  minMax?: { min: number; max: number }
) => {
  const onChangeFn = jest.fn();
  const initialItems = itemsOverride ? [...items, ...itemsOverride] : items;
  const renderResult = render(
    <ExpandableList
      initialItems={!noInitialItems ? initialItems : undefined}
      onChange={onChangeFn}
      checkable={isCheckable}
      min={minMax?.min}
      max={minMax?.max}
    />
  );
  const string = 'foo';
  return { onChangeFn, renderResult, string };
};

describe('<ExpandableList />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { renderResult } = setup();

    const { getByTestId } = renderResult;

    expect(getByTestId('expandableList')).toBeTruthy();
    expect(getByTestId('expandableList-item-0')).toBeTruthy();
    expect(getByTestId('expandableList-item-0').getAttribute('value')).toBe(
      'bar'
    );
  });
  it('delete Button should delete items', () => {
    const { renderResult, onChangeFn } = setup();

    const { getByTestId } = renderResult;

    userEvent.click(getByTestId('expandableList-item-delete-0'));
    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(onChangeFn.mock.calls[0][0].length).toBe(items.length - 1);
    expect(onChangeFn.mock.calls[0][0][0].value).toBe(items[1].value);
  });

  it('add Button should add item', () => {
    const { renderResult, onChangeFn } = setup();

    const { getByTestId } = renderResult;

    userEvent.click(getByTestId('expandable-list-add'));
    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(onChangeFn.mock.calls[0][0].length).toBe(items.length + 1);
  });
  it('checkable should render addtional check icon with single selection', () => {
    const { renderResult, onChangeFn } = setup(true, 'single');
    const { getByTestId } = renderResult;

    expect(getByTestId('expandableList-item-additional-0')).toBeTruthy();
    userEvent.click(getByTestId('expandableList-item-additional-1'));
    expect(onChangeFn.mock.calls[0][0][1].checked).toBe(true);
    expect(onChangeFn.mock.calls[0][0][0].checked).toBe(false);
  });
  it('checkable should render addtional check icon with multiple selection', () => {
    const { renderResult, onChangeFn } = setup(true, 'multiple');
    const { getByTestId } = renderResult;

    expect(getByTestId('expandableList-item-additional-0')).toBeTruthy();
    userEvent.click(getByTestId('expandableList-item-additional-0'));
    userEvent.click(getByTestId('expandableList-item-additional-1'));
    expect(onChangeFn.mock.calls[0][0][0].checked).toBe(true);
    expect(onChangeFn.mock.calls[1][0][1].checked).toBe(true);
  });
  it('should handle inputs correctly', () => {
    const { renderResult, onChangeFn, string } = setup(true, 'single');
    const { getByTestId } = renderResult;
    userEvent.type(getByTestId('expandableList-item-0'), string);
    expect(onChangeFn).toHaveBeenCalledTimes(string.length);
    expect(onChangeFn.mock.calls[2][0][0].value).toEqual(string);
  });

  it('should show add button as disabled when max items is reached', () => {
    const items = [
      {
        value: 'foobar',
      },
    ];
    const { renderResult } = setup(false, undefined, items, { min: 2, max: 3 });
    const { getByTestId } = renderResult;
    expect(getByTestId('expandable-list-add')).toHaveAttribute('disabled');
  });

  it('should show delete button as disabled when min items is reached', () => {
    const { renderResult } = setup(false, undefined, undefined, {
      min: 2,
      max: 3,
    });
    const { getByTestId } = renderResult;
    expect(getByTestId('expandableList-item-delete-0')).toHaveAttribute(
      'disabled'
    );
  });
});
