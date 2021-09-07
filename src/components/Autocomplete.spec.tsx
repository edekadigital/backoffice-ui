import * as React from 'react';

import { act, cleanup, waitFor } from '@testing-library/react';
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

    const { container, getByTestId } = render(
      <Autocomplete
        data-testid="superfancy-autocomplete"
        inputTestId="superfancy-autocomplete-input"
        {...props}
      />
    );
    const AutoCompleteSearch = getByTestId('superfancy-autocomplete');
    const input = getByTestId('superfancy-autocomplete-input');

    expect(container).toBeTruthy();
    expect(AutoCompleteSearch).toBeTruthy();
    expect(input).toBeTruthy();
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

    const { container, getByTestId } = render(
      <Autocomplete inputTestId="superfancy-autocomplete-input" {...props} />
    );
    expect(container).toBeTruthy();
    const input = getByTestId('superfancy-autocomplete-input');

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
      <Autocomplete inputTestId="superfancy-autocomplete-input" {...props} />
    );
    expect(container).toBeTruthy();
    const input = getByTestId('superfancy-autocomplete-input');

    userEvent.type(input, 'hold, my; beer christoph');
    await act(() => fetchOptionsPromise.then(() => {}));
    await userEvent.type(input, specialChars.enter, { delay: 20 });
    await act(() => Promise.all(findItemsFn.mock.calls).then(() => {}));

    expect(findItemsFn).toBeCalledTimes(4);
    expect(findItemsFn.mock.calls[0]).toMatchObject(['hold']);
    expect(findItemsFn.mock.calls[1]).toMatchObject(['my']);
    expect(findItemsFn.mock.calls[2]).toMatchObject(['beer']);
    expect(findItemsFn.mock.calls[3]).toMatchObject(['christoph']);

    expect(onChangeFn).toBeCalledTimes(5);
    const [newValue] = onChangeFn.mock.calls[0];
    expect(newValue).toMatchObject([
      { id: '4', name: 'hold' },
      { id: '4', name: 'my' },
      { id: '4', name: 'beer' },
      { id: '4', name: 'christoph' },
    ]);
  });

  it('calls onChange with previous state and new values when findItems is not set', async () => {
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
      <Autocomplete
        data-testid="superfancy-autocomplete"
        inputTestId="superfancy-autocomplete-input"
        {...props}
      />
    );
    const AutoCompleteSearch = getByTestId('superfancy-autocomplete');
    const input = getByTestId('superfancy-autocomplete-input');

    expect(container).toBeTruthy();
    expect(AutoCompleteSearch).toBeTruthy();
    expect(input).toBeTruthy();

    userEvent.type(input, 'hold, my; beer christoph');
    await act(() => fetchOptionsPromise.then(() => {}));
    await userEvent.type(input, `${specialChars.enter}`, { delay: 20 });

    expect(onChangeFn).toBeCalledTimes(1);
    const [newValue] = onChangeFn.mock.calls[0];
    expect(newValue.slice(0, 2)).toMatchObject(value);
    expect(newValue.slice(2, 6)).toMatchObject(
      ['hold', 'my', 'beer', 'christoph'].map((input: string) => {
        return { input };
      })
    );
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

    const { container, getByTestId } = render(
      <>
        <Autocomplete inputTestId="superfancy-autocomplete-input" {...props} />
        <TextField inputTestId="other-field" />
      </>
    );

    expect(container).toBeTruthy();
    const input = getByTestId(
      'superfancy-autocomplete-input'
    ) as HTMLInputElement;
    userEvent.type(input, 'hold, my; beer christoph');
    expect(input.value).toBe('hold, my; beer christoph');

    userEvent.click(getByTestId('other-field'));

    await waitFor(() => {
      expect(findItemsFn).toBeCalledTimes(4);
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

  it('keeps existing values on blur', async () => {
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
      value: [{ id: '4', name: 'hold' }],
      onChange: onChangeFn,
      fetchOptions: fetchOptionsFn,
      getOptionLabel: (item) => {
        return item.name;
      },
      findItems: findItemsFn,
    };

    const { container, getByTestId } = render(
      <>
        <Autocomplete inputTestId="superfancy-autocomplete-input" {...props} />
        <TextField inputTestId="other-field" />
      </>
    );

    expect(container).toBeTruthy();
    const input = getByTestId(
      'superfancy-autocomplete-input'
    ) as HTMLInputElement;
    userEvent.type(input, 'my; beer christoph');

    userEvent.click(getByTestId('other-field'));

    await waitFor(() => {
      expect(findItemsFn).toBeCalledTimes(3);
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
