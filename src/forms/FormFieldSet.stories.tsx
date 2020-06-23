import * as React from 'react';
import { FormFieldSet, FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Forms|FormFieldSet',
  component: FormFieldSet,
};

export const Default = () => (
  <FormFieldSet>
    <FormRow>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
  </FormFieldSet>
);

export const WithTitle = () => (
  <FormFieldSet title="Lorem ipsum">
    <FormRow>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
  </FormFieldSet>
);

export const Multiple = () => (
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
);
