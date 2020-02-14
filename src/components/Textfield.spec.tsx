import * as React from 'react';

import { fireEvent, cleanup } from '@testing-library/react';
import { Button } from './Button';
import { TextField, ThemeProvider } from '..';
import { render } from '../test-utils';

const label = 'some text';
const name = 'textfield';
const value = 'some value';
const placeholder = 'some placeholder';

describe('<TextField />', () => {
  afterEach(cleanup);

  it('should render the text field component', () => {
    const { container } = render(
      <TextField
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    );

    const inputTextField = container.querySelectorAll<HTMLInputElement>(
      'input'
    );

    expect(inputTextField.item!(0).name).toEqual(name);
    expect(inputTextField.item!(0).placeholder).toEqual(placeholder);
    expect(inputTextField.item!(0).value).toEqual(value);

    const inputLabel = container.querySelector<HTMLInputElement>('label');

    expect(inputLabel!.textContent).toEqual(label);
  });

  it('should trigger onClick callback', () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };
    const { getByTestId } = render(
      <Button onClick={handleClick} data-testid="button">
        {label}
      </Button>
    );
    fireEvent.click(getByTestId('button'));
    expect(clicked).toBe(true);
  });
});
