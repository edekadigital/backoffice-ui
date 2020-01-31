import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { FormFieldSet, FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

storiesOf('Forms|FormFieldSet', module)
  .add('default', () => (
    <FormFieldSet>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </FormFieldSet>
  ))
  .add('with title', () => (
    <FormFieldSet title="Lorem ipsum">
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </FormFieldSet>
  ))
  .add('multiple', () => (
    <>
      <FormFieldSet title="Lorem ipsum">
        <FormRow>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
      </FormFieldSet>
      <FormFieldSet title="Lorem ipsum">
        <FormRow>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
      </FormFieldSet>
    </>
  ));
