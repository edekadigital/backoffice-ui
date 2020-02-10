import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { ContentGroup, FormRow, TextField } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|ContentGroup', module)
  .add('default', () => (
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
  ))
  .add('multiple groups', () => (
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
  ));
