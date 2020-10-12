import * as React from 'react';
import { FormWrapper, FormFieldSet, FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Forms/FormWrapper',
  component: FormWrapper,
};

export const Default = () => {
  const onSubmit = () => {
    console.log('onSubmit');
  };

  const onCancel = () => {
    console.log('onCancel');
  };

  return (
    <FormWrapper
      submitLabel="Submit"
      cancelLabel="Cancel"
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <FormFieldSet title="Lorem ipsum">
        <FormRow gutterBottom={true}>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
        <FormRow>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
      </FormFieldSet>
      <FormFieldSet title="Lorem ipsum">
        <FormRow gutterBottom={true}>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
        <FormRow>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
      </FormFieldSet>
    </FormWrapper>
  );
};

export const OnlySubmit = () => {
  const onSubmit = () => {
    console.log('onSubmit');
  };
  return (
    <FormWrapper submitLabel="Login" onSubmit={onSubmit}>
      <FormFieldSet title="Lorem ipsum">
        <FormRow gutterBottom={true}>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
        <FormRow>
          <TextField label="Some Label" />
          <TextField label="Some Label" />
        </FormRow>
      </FormFieldSet>
    </FormWrapper>
  );
};
