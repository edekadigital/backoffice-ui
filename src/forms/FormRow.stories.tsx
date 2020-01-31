import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

storiesOf('Forms|FormRow', module)
  .add('default', () => (
    <>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </>
  ))
  .add('multi-row', () => (
    <>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </>
  ))
  .add('custom widths', () => (
    <>
      <FormRow widths={[6, 6]}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow widths={[8, 4]}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow widths={[3, 9]}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </>
  ))
  .add('single field', () => (
    <>
      <FormRow>
        <TextField label="Some Label" />
      </FormRow>
    </>
  ));
