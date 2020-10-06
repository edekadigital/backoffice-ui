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
describe('<ExpandableList />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const onChangeFn = jest.fn();

    const { getByTestId } = render(
      <ExpandableList initialItems={items} onChange={onChangeFn} />
    );
    expect(getByTestId('expandableList')).toBeTruthy();
    expect(getByTestId('expandableList-item-0')).toBeTruthy();
    expect(getByTestId('expandableList-item-0').getAttribute('value')).toBe(
      'bar'
    );
  });
  it('delete Button should delete items', () => {
    const onChangeFn = jest.fn();

    const { getByTestId } = render(
      <ExpandableList initialItems={items} onChange={onChangeFn} />
    );
    userEvent.click(getByTestId('expandableList-item-delete-0'));
    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(onChangeFn.mock.calls[0][0].length).toBe(items.length - 1);
  });

  it('add Button should add item', () => {
    const onChangeFn = jest.fn();
    const { getByTestId } = render(
      <ExpandableList onChange={onChangeFn} initialItems={items} />
    );
    userEvent.click(getByTestId('expandable-list-add'));
    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(onChangeFn.mock.calls[0][0].length).toBe(items.length + 1);
  });
  it('addtional action should render addtional icon and call callback', () => {
    const handlerFn = jest.fn();
    const addtionalAction = { icon: Star, handler: handlerFn };
    const onChangeFn = jest.fn();
    const { getByTestId } = render(
      <ExpandableList
        onChange={onChangeFn}
        initialItems={items}
        addtionalAction={addtionalAction}
      />
    );
    expect(getByTestId('expandableList-item-additional-0')).toBeTruthy();
    userEvent.click(getByTestId('expandableList-item-additional-0'));
    expect(handlerFn).toHaveBeenCalledTimes(1);
  });
  it('should handle inputs correctly', () => {
    const string = 'foo';
    const onChangeFn = jest.fn();
    const { getByTestId } = render(<ExpandableList onChange={onChangeFn} />);
    userEvent.type(getByTestId('expandableList-item-0'), string);
    expect(onChangeFn).toHaveBeenCalledTimes(string.length);
    expect(onChangeFn.mock.calls[2][0][0].value).toEqual(string);
  });
});
