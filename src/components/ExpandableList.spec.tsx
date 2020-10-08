import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ExpandableList } from '..';
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
  isCheckable: string | undefined = undefined
) => {
  const onChangeFn = jest.fn();
  const renderResult = render(
    <ExpandableList
      initialItems={!noInitialItems ? items : undefined}
      onChange={onChangeFn}
      checkable={isCheckable}
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
    const { renderResult } = setup(true, 'single');
    const { getByTestId } = renderResult;

    expect(getByTestId('expandableList-item-additional-0')).toBeTruthy();
    userEvent.click(getByTestId('expandableList-item-additional-1'));
    expect(
      getByTestId('expandableList-item-additional-icon-1').getAttribute('color')
    ).toBe('#4caf50');
    expect(
      getByTestId('expandableList-item-additional-icon-0').getAttribute('color')
    ).toBeFalsy();
  });
  it('checkable should render addtional check icon with multiple selection', () => {
    const { renderResult } = setup(true, 'multiple');
    const { getByTestId } = renderResult;

    expect(getByTestId('expandableList-item-additional-0')).toBeTruthy();
    userEvent.click(getByTestId('expandableList-item-additional-1'));
    userEvent.click(getByTestId('expandableList-item-additional-0'));
    expect(
      getByTestId('expandableList-item-additional-icon-1').getAttribute('color')
    ).toBe('#4caf50');
    expect(
      getByTestId('expandableList-item-additional-icon-0').getAttribute('color')
    ).toBe('#4caf50');
  });
  it('should handle inputs correctly', () => {
    const { renderResult, onChangeFn, string } = setup(true, 'single');
    const { getByTestId } = renderResult;
    userEvent.type(getByTestId('expandableList-item-0'), string);
    expect(onChangeFn).toHaveBeenCalledTimes(string.length);
    expect(onChangeFn.mock.calls[2][0][0].value).toEqual(string);
  });
});
