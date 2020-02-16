import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { TextField } from '..';
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
});
