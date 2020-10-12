import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { DatePicker } from '..';
import { render } from '../test-utils';

const label = 'a special date';
const value = new Date('12 24 2020');
const placeholder = 'placeholder';

describe('<DatePicker />', () => {
  afterEach(cleanup);

  it('should render the date picker component', () => {
    const { getByTestId } = render(
      <DatePicker
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={() => {}}
      />
    );

    const inputResult = getByTestId('datePicker-input') as HTMLInputElement;

    expect(inputResult.placeholder).toEqual(placeholder);
    expect(inputResult.value).toEqual('24.12.2020');
    expect(getByTestId('datePicker-label').textContent).toEqual(label);
  });

  it('should render the date field component with error message', () => {
    const errorText = 'Error Text';
    const { getByText } = render(
      <DatePicker
        label={label}
        value={value}
        onChange={() => {}}
        placeholder={placeholder}
        error={true}
        helperText={errorText}
      />
    );

    const errorMessage = getByText(errorText);
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.classList).toContain('Mui-error');
  });

  it('should show error message for date in the past', () => {
    const errorText = 'Das Datum darf nicht in der Vergangenheit liegen!';
    const { getByText } = render(
      <DatePicker
        label={label}
        value={new Date('12 24 2000')}
        disablePast={true}
        onChange={() => {}}
      />
    );

    const errorMessage = getByText(errorText);

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.classList).toContain('Mui-error');
  });

  it('should show error message for date in the future', () => {
    const errorText = 'Das Datum darf nicht in der Zukunft liegen!';
    const { getByText } = render(
      <DatePicker
        label={label}
        value={new Date('12 24 2090')}
        disableFuture={true}
        onChange={() => {}}
      />
    );

    const errorMessage = getByText(errorText);
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.classList).toContain('Mui-error');
  });

  it('should show error message for date before min date', () => {
    const errorText = 'Das Datum darf nicht vor dem 25.12.2020 liegen!';
    const { getByText } = render(
      <DatePicker
        label={label}
        value={value}
        minDate={new Date('12 25 2020')}
        onChange={() => {}}
      />
    );

    const errorMessage = getByText(errorText);
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.classList).toContain('Mui-error');
  });

  it('should show error message for date after max date', () => {
    const errorText = 'Das Datum darf nicht nach dem 23.12.2020 liegen!';
    const { getByText } = render(
      <DatePicker
        label={label}
        value={value}
        maxDate={new Date('12 23 2020')}
        disableFuture={true}
        onChange={() => {}}
      />
    );

    const errorMessage = getByText(errorText);
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.classList).toContain('Mui-error');
  });
});
