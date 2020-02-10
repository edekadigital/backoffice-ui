import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { FormWrapper, FormFieldSet, FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

storiesOf('Forms|FormWrapper', module).add('default', () => {
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
});
