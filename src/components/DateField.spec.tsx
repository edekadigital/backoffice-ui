import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { DateField } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

const label = 'some label';
const placeholder = 'TT.MM.JJJJ';
const errorText = 'Error Text';
const dateValue = '341985';
const correctFormattedDateValue = '03.04.1985';

describe('<DateField />', () => {
  afterEach(cleanup);

  it('should render the date field component with placeholder', () => {
    const { getByText, getByTestId } = render(
      <DateField label={label} placeholder={placeholder} />
    );

    expect(getByText(label).textContent).toBeTruthy();
    expect(getByTestId('textField-input')!.attributes[1].value).toEqual(placeholder);
  });

  it('should render the date field component with error message', () => {
    const { getByTestId } = render(
      <DateField
        label={label}
        placeholder={placeholder}
        error={true}
        helperText={errorText}
        data-testid={'datefield-id'}
      />
    );

    expect(getByTestId('datefield-id').children[2].textContent).toEqual(errorText);
    expect(getByTestId('datefield-id').children[1].classList).toContain('Mui-error');
    expect(getByTestId('datefield-id').children[2].classList).toContain('Mui-error');
  });

  it('should trigger onChange for component date field', async () => {
    let onChanged = false;
    const handleOnChange = () => {
      onChanged = true;
    };

    const { getByTestId } = render(
      <DateField label={label} onChange={handleOnChange} />
    );

    await userEvent.type(getByTestId('textField-input')!, dateValue);
    expect(onChanged).toBeTruthy();
    expect(getByTestId('textField-input')!.attributes[4].value).toEqual(correctFormattedDateValue);
  });

  it('should fill day and month correctly with a leading 0', async () => {
    const { getByTestId } = render(<DateField label={label} />);

    await userEvent.type(getByTestId('textField-input')!, '3.');
    expect(getByTestId('textField-input')!.attributes[4].value).toEqual('03');
    await userEvent.type(getByTestId('textField-input')!, '03.4.');
    expect(getByTestId('textField-input')!.attributes[4].value).toEqual('03.04');
  });
});
