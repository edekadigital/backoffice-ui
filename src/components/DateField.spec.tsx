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
    const { container } = render(
      <DateField label={label} placeholder={placeholder} />
    );

    const labelResult = container.querySelectorAll<HTMLLabelElement>('label');
    expect(labelResult.item!(0).textContent).toEqual(label);
    const placeholderResult = container.querySelector<HTMLInputElement>(
      'input'
    );
    expect(placeholderResult!.placeholder).toEqual(placeholder);
  });

  it('should render the date field component with error message', () => {
    const { container } = render(
      <DateField
        label={label}
        placeholder={placeholder}
        error={true}
        helperText={errorText}
      />
    );

    const errorTextResult = container.querySelectorAll<HTMLParagraphElement>(
      'p'
    );
    expect(errorTextResult.item!(0).textContent).toEqual(errorText);
    const placeholderResult = container.querySelector<HTMLLabelElement>(
      'label'
    );
    expect(placeholderResult!.classList).toContain('Mui-error');
  });

  it('should trigger onChange for component date field', async () => {
    let onChanged = false;
    const handleOnChange = () => {
      onChanged = true;
    };

    const { container } = render(
      <DateField label={label} onChange={handleOnChange} />
    );

    const inputElement = container.querySelector<HTMLInputElement>('input');
    await userEvent.type(inputElement!, dateValue);
    expect(onChanged).toBeTruthy();
    expect(inputElement!.value).toEqual(correctFormattedDateValue);
  });

  it('should fill day and month correctly with a leading 0', async () => {
    const { container } = render(<DateField label={label} />);

    const inputElement = container.querySelector<HTMLInputElement>('input');

    await userEvent.type(inputElement!, '3.');
    expect(inputElement!.value).toEqual('03');
    await userEvent.type(inputElement!, '03.4.');
    expect(inputElement!.value).toEqual('03.04');
  });
});
