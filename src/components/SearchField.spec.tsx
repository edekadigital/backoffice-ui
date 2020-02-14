import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { SearchField } from './SearchField';
import userEvent from '@testing-library/user-event';

describe('<SearchField/>', () => {
  afterEach(cleanup);

  const placeholder = 'placeholder text';

  it('should render the search field component', () => {
    const { container } = render(<SearchField placeholder={placeholder} />);

    const searchFieldResult = container.querySelectorAll<HTMLInputElement>(
      'input'
    );
    expect(searchFieldResult.item!(0).placeholder).toEqual(placeholder);
  });

  it('should render the search field with progress activated', () => {
    const { container } = render(
      <SearchField placeholder={placeholder} progress={true} />
    );

    const searchFieldProgressActivated = container.querySelectorAll<
      HTMLInputElement
    >('input');
    expect(searchFieldProgressActivated.item!(0).placeholder).toEqual(
      placeholder
    );

    const progressStatus = container.querySelectorAll<HTMLDivElement>('div');
    expect(
      progressStatus.item!(2).classList.contains('MuiLinearProgress-root')
    ).toBeTruthy();
  });

  it('should be able to use onChange in search field', async () => {
    let userInput = false;

    const handleUserInput = () => {
      userInput = true;
    };

    const { container } = render(
      <SearchField placeholder={placeholder} onChange={handleUserInput} />
    );

    const inputElement = container.querySelector<HTMLInputElement>('input');
    await userEvent.type(inputElement!, 'Hello SearchField');
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
});
