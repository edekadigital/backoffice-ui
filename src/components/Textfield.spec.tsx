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
    const { getByText, container } = render(
      <TextField
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        data-testid={'textfield-id'}
      />
    );

    const inputTextField = container.querySelector<HTMLInputElement>(
      'input'
    );

    expect(inputTextField!.name).toEqual(name);
    expect(inputTextField!.placeholder).toEqual(placeholder);
    expect(inputTextField!.value).toEqual(value);
    expect(getByText(label)!).toBeTruthy();
  });
});
