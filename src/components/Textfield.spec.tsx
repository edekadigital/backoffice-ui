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

  it('should render the text field component with an adornment', () => {
    const adornment = <div data-testid={'adornment'}>adornment</div>;
    const { getByTestId } = render(
      <TextField data-testid={'textfield-id'} endAdornment={adornment} />
    );
    expect(getByTestId('adornment').textContent).toBe('adornment');
  });

  it('should render the text field component with a start adornment', () => {
    const adornment = <div data-testid={'adornment'}>adornment</div>;
    const { getByTestId } = render(
      <TextField data-testid={'textfield-id'} startAdornment={adornment} />
    );
    expect(getByTestId('adornment').textContent).toBe('adornment');
  });

  it('should render the text field component with a start adornment with position outside', () => {
    const adornment = <div data-testid={'adornment'}>adornment</div>;
    const { getByTestId } = render(
      <TextField
        data-testid={'textfield-id'}
        startAdornment={adornment}
        startAdornmentPosition="outside"
      />
    );
    expect(getByTestId('adornment').textContent).toBe('adornment');
    expect(getByTestId('grid-container-textfield')).toBeTruthy();
  });
});
