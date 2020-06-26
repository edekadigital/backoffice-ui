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
    const { getByTestId } = render(
      <TextField
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        data-testid={'textfield-id'}
      />
    );

    const inputResult = getByTestId('textField-input')! as HTMLInputElement;

    expect(inputResult.name).toEqual(name);
    expect(inputResult.placeholder).toEqual(placeholder);
    expect(inputResult.value).toEqual(value);
    expect(getByTestId('textField-label').textContent).toEqual(label);
  });
});
