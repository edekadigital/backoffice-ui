import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { TextField, OptionsTextField } from '..'; // @edekadigital/backoffice-ui
import { FormRow } from './FormRow';
import { number } from 'prop-types';

const numbers: number[] = [];
for (let i = 0; i < 1000; i++) {
  numbers.push(i);
}

storiesOf('Components|TextField', module)
  .add('default', () => <TextField label="Some label" />)
  .add('required', () => <TextField label="Some label" required={true} />)
  .add('with placeholder', () => (
    <TextField label="Some label" placeholder="Placeholder" />
  ))
  .add('with value', () => <TextField label="Some label" value="Some value" />)
  .add('password', () => (
    <TextField label="Password" required={true} type="password" />
  ))
  .add('with options', () => (
    <span>
      <FormRow widths={[6, 6]}>
        <OptionsTextField
          label="Device"
          options={['Phone', 'Tablet', 'Laptop/Desktop']}
          searchableOptions={true}
        />
        <OptionsTextField
          label="Platform"
          options={['React Native', 'React']}
        />
      </FormRow>
      <OptionsTextField
        label="Numbers"
        options={numbers}
        maxOptionsHeight={200}
        searchableOptions={true}
      />
    </span>
  ));
