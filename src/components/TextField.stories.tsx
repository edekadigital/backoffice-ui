import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { TextField } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|TextField', module)
  .add('default', () => <TextField label="Some label" />)
  .add('required', () => <TextField label="Some label" required={true} />)
  .add('with placeholder', () => (
    <TextField label="Some label" placeholder="Placeholder" />
  ))
  .add('with error', () => (
    <TextField
      label="Some label"
      placeholder="Placeholder"
      error={true}
      helperText="Lorem ipsum"
    />
  ))
  .add('with value', () => <TextField label="Some label" value="Some value" />)
  .add('password', () => (
    <TextField label="Password" required={true} type="password" />
  ));
