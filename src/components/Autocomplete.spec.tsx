import * as React from 'react';

import {
  act,
  cleanup,
  getAllByRole,
  getByTestId,
  waitFor,
  within,
} from '@testing-library/react';
import { render } from '../test-utils';
import { Autocomplete, AutocompleteProps } from './Autocomplete';
import userEvent, { specialChars } from '@testing-library/user-event';
import { TextField } from './TextField';

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

    const { container } = render(<Autocomplete {...props} />);
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

    const { container, queryByText } = render(<Autocomplete {...props} />);
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
      <Autocomplete data-testid="superfancy-autocomplete" {...props} />
    );
    expect(container).toBeTruthy();
    const AutoCompleteSearch = getByTestId('superfancy-autocomplete');
    const input = within(AutoCompleteSearch).getByPlaceholderText(
      'hold my beer'
    );

    await userEvent.type(input, 'hold', { delay: 20 });
    expect(input).toHaveValue('hold');
    await userEvent.type(input, `${specialChars.arrowDown}`, { delay: 20 });
    await userEvent.type(input, `${specialChars.enter}`, { delay: 20 });

    expect(onChangeFn).toBeCalledTimes(1);
    const [newValue] = onChangeFn.mock.calls[0];
    expect(newValue).toMatchObject([{ id: '1', name: 'beerholda' }]);
  });

  it('calls findItems when string is entered', async () => {
    const fetchOptionsPromise = Promise.resolve([
      { id: '1', name: 'beerholda' },
      { id: '2', name: 'beerholda2' },
      { id: '3', name: 'beerholda3' },
    ]);
    const onChangeFn = jest.fn();
    const fetchOptionsFn = jest.fn(() => fetchOptionsPromise);
    const findItemsFn = jest.fn(
      (...inputStrings: string[]) =>
        new Promise<any>((resolve) =>
          resolve(inputStrings.map((name) => ({ id: '4', name })))
        )
    );

    const props: AutocompleteProps<{ id: string; name: string }> = {
      label: 'theLabel',
      inputPlaceholder: 'hold my beer',
      value: [],
      onChange: onChangeFn,
      fetchOptions: fetchOptionsFn,
      getOptionLabel: (item) => {
        return item.name;
      },
      findItems: findItemsFn,
    };

    const { container, getByTestId } = render(
      <Autocomplete data-testid="superfancy-autocomplete" {...props} />
    );
    expect(container).toBeTruthy();
    const AutoCompleteSearch = getByTestId('superfancy-autocomplete');
    const input = within(AutoCompleteSearch).getByPlaceholderText(
      'hold my beer'
    );

    userEvent.type(input, 'hold, my; beer christoph');
    await act(() => fetchOptionsPromise.then(() => {}));
    await userEvent.type(input, specialChars.enter, { delay: 20 });
    await act(() => Promise.all(findItemsFn.mock.calls).then(() => {}));

    expect(findItemsFn).toBeCalledTimes(1);
    const inputStrings = findItemsFn.mock.calls[0];
    expect(inputStrings).toMatchObject(['hold', 'my', 'beer', 'christoph']);

    expect(onChangeFn).toBeCalledTimes(1);
    const [newValue] = onChangeFn.mock.calls[0];
    expect(newValue).toMatchObject([
      { id: '4', name: 'hold' },
      { id: '4', name: 'my' },
      { id: '4', name: 'beer' },
      { id: '4', name: 'christoph' },
    ]);
  });

  it('calls onChange with previous state when findItems is not set', async () => {
    const value = [
      { id: '1', name: 'beerholda' },
      { id: '2', name: 'beerholda2' },
    ];
    const fetchOptionsPromise = Promise.resolve([
      { id: '1', name: 'beerholda' },
      { id: '2', name: 'beerholda2' },
      { id: '3', name: 'beerholda3' },
    ]);
    const onChangeFn = jest.fn();
    const fetchOptionsFn = jest.fn(() => fetchOptionsPromise);

    const props: AutocompleteProps<{ id: string; name: string }> = {
      label: 'theLabel',
      inputPlaceholder: 'hold my beer',
      value: value,
      onChange: onChangeFn,
      fetchOptions: fetchOptionsFn,
      getOptionLabel: (item) => {
        return item.name;
      },
    };

    const { container, getByTestId } = render(
      <Autocomplete data-testid="superfancy-autocomplete" {...props} />
    );
    expect(container).toBeTruthy();
    const AutoCompleteSearch = getByTestId('superfancy-autocomplete');
    const input = within(AutoCompleteSearch).getByPlaceholderText(
      'hold my beer'
    );

    userEvent.type(input, 'hold, my; beer christoph');
    await act(() => fetchOptionsPromise.then(() => {}));
    await userEvent.type(input, `${specialChars.enter}`, { delay: 20 });

    expect(onChangeFn).toBeCalledTimes(1);
    const [newValue] = onChangeFn.mock.calls[0];
    expect(newValue).toMatchObject(value);
  });

  it('calls onChange on blur', async () => {
    const fetchOptionsPromise = Promise.resolve([]);
    const onChangeFn = jest.fn();
    const fetchOptionsFn = jest.fn(() => fetchOptionsPromise);
    const findItemsFn = jest.fn(
      (...inputStrings: string[]) =>
        new Promise<any>((resolve) =>
          resolve(inputStrings.map((name) => ({ id: '4', name })))
        )
    );

    const props: AutocompleteProps<{ id: string; name: string }> = {
      label: 'theLabel',
      inputPlaceholder: 'hold my beer',
      value: [],
      onChange: onChangeFn,
      fetchOptions: fetchOptionsFn,
      getOptionLabel: (item) => {
        return item.name;
      },
      findItems: findItemsFn,
    };

    const { getAllByRole, getByTestId } = render(
      <>
        <Autocomplete {...props} />
        <TextField inputTestId="other-field" />
      </>
    );

    const input = getAllByRole('textbox')[0] as HTMLInputElement;
    userEvent.type(input, 'hold, my; beer christoph');
    expect(input.value).toBe('hold, my; beer christoph');

    userEvent.click(getByTestId('other-field'));

    await waitFor(() => {
      expect(findItemsFn).toBeCalledTimes(1);
      expect(onChangeFn).toBeCalledTimes(1);
    });

    const [newValue] = onChangeFn.mock.calls[0];
    expect(newValue).toMatchObject([
      { id: '4', name: 'hold' },
      { id: '4', name: 'my' },
      { id: '4', name: 'beer' },
      { id: '4', name: 'christoph' },
    ]);
  });
});
