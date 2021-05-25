import * as React from 'react';

import {
  cleanup,
  waitFor,
  within,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import { render } from '../test-utils';
import { Autocomplete, AutocompleteProps } from './Autocomplete';
import userEvent from '@testing-library/user-event';

describe('<Autocomplete/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const onChangeFn = jest.fn();
    const fetchOptionsFn = jest.fn(() => {
      return Promise.resolve([
        { id: '1', name: 'beerholda' },
        { id: '2', name: 'beerholda2' },
        { id: '3', name: 'beerholda3' },
      ]);
    });

    const props: AutocompleteProps<{ id: string; name: string }> = {
      label: 'theLabel',
      inputPlaceholder: 'hold my beer',
      value: [],
      onChange: onChangeFn,
      fetchOptions: fetchOptionsFn,
      getOptionLabel: (item) => {
        return item.id;
      },
    };

    const { container } = render(<Autocomplete {...props}></Autocomplete>);
    expect(container).toBeTruthy();
  });

  it('displays chip correctly when option is set', () => {
    const onChangeFn = jest.fn();
    const fetchOptionsFn = jest.fn(() => {
      return Promise.resolve([]);
    });

    const props: AutocompleteProps<{ id: string; name: string }> = {
      label: 'theLabel',
      inputPlaceholder: 'hold my beer',
      value: [{ id: '3', name: 'beerholda3' }],
      onChange: onChangeFn,
      fetchOptions: fetchOptionsFn,
      getOptionLabel: (item) => {
        return item.name;
      },
    };

    const { container, queryByText, getByText } = render(
      <Autocomplete {...props}></Autocomplete>
    );
    expect(container).toBeTruthy();
    expect(queryByText('beerholda3')).toBeTruthy();
  });

  it('calls onChange when option is added', async () => {
    const promise = Promise.resolve([
      { id: '1', name: 'beerholda' },
      { id: '2', name: 'beerholda2' },
      { id: '3', name: 'beerholda3' },
    ]);
    const onChangeFn = jest.fn();
    const fetchOptionsFn = jest.fn(() => {
      return promise;
    });

    const props: AutocompleteProps<{ id: string; name: string }> = {
      label: 'theLabel',
      inputPlaceholder: 'hold my beer',
      value: [],
      onChange: onChangeFn,
      fetchOptions: fetchOptionsFn,
      getOptionLabel: (item) => {
        return item.name;
      },
    };

    const { container, getByTestId, getByText } = render(
      <Autocomplete
        data-testid="superfancy-autocomplete"
        {...props}
      ></Autocomplete>
    );
    expect(container).toBeTruthy();
    const AutoCompleteSearch = getByTestId('superfancy-autocomplete');
    const input = within(AutoCompleteSearch).getByPlaceholderText(
      'hold my beer'
    );

    userEvent.type(input, 'hold');
    await act(() => promise.then(() => {}));
    fireEvent.keyDown(AutoCompleteSearch, { key: 'ArrowDown' });
    fireEvent.keyDown(AutoCompleteSearch, { key: 'Enter' });

    expect(onChangeFn).toBeCalledTimes(1);
    const [newValue] = onChangeFn.mock.calls[0];
    expect(newValue).toMatchObject([{ id: '1', name: 'beerholda' }]);
  });
});
