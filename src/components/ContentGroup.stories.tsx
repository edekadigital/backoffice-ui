import * as React from 'react';

import { ContentGroup, FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components|ContentGroup',
  component: ContentGroup,
};

export const Default = () => (
  <ContentGroup title="Some title">
    <FormRow gridLayout={[8, 4]} gutterBottom={true}>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
    <FormRow gridLayout={[3, 9]}>
      <TextField label="Some Label" />
      <TextField label="Some Label" />
    </FormRow>
  </ContentGroup>
);
export const MultipleGroups = () => (
  <>
    <ContentGroup title="Some title">
      <FormRow gridLayout={[8, 4]} gutterBottom={true}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow gridLayout={[3, 9]}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </ContentGroup>
    <ContentGroup title="Some title">
      <FormRow gridLayout={[8, 4]} gutterBottom={true}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow gridLayout={[3, 9]}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </ContentGroup>
  </>
);
