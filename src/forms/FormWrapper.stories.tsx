import * as React from 'react';
import { FormWrapper, FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

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
      <FormRow gutterBottom={true}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>

      <FormRow gutterBottom={true}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </FormWrapper>
  );
};

export const OnlySubmit = () => {
  const onSubmit = () => {
    console.log('onSubmit');
  };
  return (
    <FormWrapper submitLabel="Login" onSubmit={onSubmit}>
      <FormRow gutterBottom={true}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </FormWrapper>
  );
};
