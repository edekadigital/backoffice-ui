import * as React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import { DateField } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

const label = 'some label';
const placeholder = 'TT.MM.JJJJ';
const errorText = 'Error Text';

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

  // TODO
  it('should be able to type date in date field', async () => {
    let userInput = false;

    const handleUserInput = () => {
      userInput = true;
    };

    const { container } = render(
      <DateField
        label={label}
        placeholder={placeholder}
        onChange={handleUserInput}
      />
    );

    const inputElement = container.querySelector<HTMLInputElement>('input');
    await userEvent.type(inputElement!, 'Hello SearchField');
    expect(userInput).toBeTruthy();
  });
});
