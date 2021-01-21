import * as React from 'react';
import { FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Forms/FormRow',
  component: FormRow,
};

export const Default = () => (
  <FormRow>
    <TextField label="Some Label" />
    <TextField label="Some Label" />
  </FormRow>
);

export const MultiRow = () => (
  <>
    <FormRow gutterBottom={true}>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
    <FormRow>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
    <FormRow gutterTop>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
  </>
);

export const CustomGridLayout = () => (
  <>
    <FormRow gridLayout={[3, 3, 4]} gutterBottom={true}>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
    <FormRow gridLayout={[8, 4]} gutterBottom={true}>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
    <FormRow gridLayout={[3, 9]}>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
  </>
);

export const SingleFieldWithMaxWidth = () => (
  <FormRow maxWidth={'sm'}>
    <TextField label="Some Label" />
  </FormRow>
);
