import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { SearchField } from './SearchField';
import userEvent from '@testing-library/user-event';

describe('<SearchField/>', () => {
  afterEach(cleanup);

  const placeholder = 'placeholder text';

  it('should render the search field component', () => {
    const { getByTestId } = render(<SearchField placeholder={placeholder} />);

    const inputResult = getByTestId('searchField-input')! as HTMLInputElement;
    expect(inputResult.placeholder).toEqual(placeholder);
  });

  it('should render the search field with progress activated', () => {
    const { getByTestId, getByRole } = render(
      <SearchField placeholder={placeholder} progress={true} />
    );

    const inputResult = getByTestId('searchField-input')! as HTMLInputElement;
    expect(inputResult.placeholder).toEqual(placeholder);
    const progressResult = getByRole('progressbar')! as HTMLDivElement;
    expect(progressResult).toBeTruthy();
  });

  it('should be able to use onChange in search field', async () => {
    let userInput = false;

    const handleUserInput = () => {
      userInput = true;
    };

    const { getByTestId } = render(
      <SearchField placeholder={placeholder} onChange={handleUserInput} />
    );

    await userEvent.type(
      getByTestId('searchField-input')!,
      'Hello SearchField'
    );
    expect(userInput).toBeTruthy();
  });

  it('should be possible to push onSubmit button', async () => {
    const handleUserClick = jest.fn();
    const handleUserInput = jest.fn();

    const { getByTestId } = render(
      <SearchField
        placeholder={placeholder}
        onChange={handleUserInput}
        onSubmit={handleUserClick}
      />
    );

    await userEvent.type(getByTestId('searchField-input'), 'Hello Searchfield');
    userEvent.click(getByTestId('searchField-submit'));

    expect(handleUserInput).toBeCalled();
    expect(handleUserClick).toBeCalledTimes(1);
    expect(handleUserClick).toBeCalledWith('Hello Searchfield');
  });

  it('should render component search field without submit handler', async () => {
    const onSubmit = jest.fn();

    const { container, getByTestId } = render(
      <SearchField placeholder={placeholder} />
    );

    container
      .querySelector<HTMLFormElement>('form')!
      .addEventListener('submit', onSubmit);
    await userEvent.type(getByTestId('searchField-input'), 'Hello Searchfield');
    await userEvent.click(getByTestId('searchField-submit'));

    expect(onSubmit).toBeCalledTimes(1);
  });
});
