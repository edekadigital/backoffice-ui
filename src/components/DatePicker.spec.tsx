import * as React from 'react';

import { cleanup, waitFor } from '@testing-library/react';
import { DatePicker } from '..';
import { render } from '../test-utils';

const label = 'a special date';
const value = new Date('12 24 2020');
const placeholder = 'placeholder';
let newValue;
const setValue = (date: Date | null) => (newValue = date);

describe('<DatePicker />', () => {
  afterEach(cleanup);

  it('should render the date picker component', () => {
    const { getByTestId } = render(
      <DatePicker
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={setValue}
        data-testid={'datepicker-id'}
      />
    );

    const inputResult = getByTestId('datepicker-input') as HTMLInputElement;

    expect(inputResult.placeholder).toEqual(placeholder);
    expect(inputResult.value).toEqual('24.12.2020');
    expect(getByTestId('datepicker-label').textContent).toEqual(label);
  });

  it('should render the date field component with error message', () => {
    const errorText = 'Error Text';
    const { getByText } = render(
      <DatePicker
        label={label}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        error={true}
        helperText={errorText}
        data-testid={'datepicker-id'}
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
        onChange={setValue}
        data-testid={'datepicker-id'}
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
        onChange={setValue}
        data-testid={'datepicker-id'}
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
        onChange={setValue}
        data-testid={'datepicker-id'}
      />
    );

    const errorMessage = getByText(errorText);
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.classList).toContain('Mui-error');
  });

  it('should show error message for date after max date', () => {
    const errorText = 'Das Datum darf nicht nach dem 23.12.2020 liegen!';
    const { container, getByText } = render(
      <DatePicker
        label={label}
        value={value}
        maxDate={new Date('12 23 2020')}
        disableFuture={true}
        onChange={setValue}
        data-testid={'datepicker-id'}
      />
    );

    const errorMessage = getByText(errorText);
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.classList).toContain('Mui-error');
  });
});
