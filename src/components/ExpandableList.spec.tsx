import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ExpandableList } from '..';
import { Star } from '../icons';
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

const setup = (noInitialItems = false, hasAdditionalAction = false) => {
  const onChangeFn = jest.fn();
  const handlerFn = jest.fn();
  const additionalAction = [{ icon: Star, handler: handlerFn }];
  const renderResult = render(
    <ExpandableList
      initialItems={!noInitialItems ? items : undefined}
      onChange={onChangeFn}
      additionalActions={!hasAdditionalAction ? undefined : additionalAction}
    />
  );
  const string = 'foo';
  return { onChangeFn, renderResult, handlerFn, string };
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
  it('addtional action should render addtional icon and call callback', () => {
    const { renderResult, handlerFn } = setup(true, true);
    const { getByTestId } = renderResult;

    expect(getByTestId('expandableList-item-additional-0')).toBeTruthy();
    userEvent.click(getByTestId('expandableList-item-additional-0'));
    expect(handlerFn).toHaveBeenCalledTimes(1);
  });
  it('should handle inputs correctly', () => {
    const { renderResult, onChangeFn, string } = setup(true, true);
    const { getByTestId } = renderResult;
    userEvent.type(getByTestId('expandableList-item-0'), string);
    expect(onChangeFn).toHaveBeenCalledTimes(string.length);
    expect(onChangeFn.mock.calls[2][0][0].value).toEqual(string);
  });
});
