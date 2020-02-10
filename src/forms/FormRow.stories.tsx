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
      <FormRow gutterBottom={true}>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
      <FormRow>
        <TextField label="Some Label" />
        <TextField label="Some Label" />
      </FormRow>
    </>
  ))
  .add('custom gridLayout', () => (
    <>
      <FormRow gridLayout={[6, 6]} gutterBottom={true}>
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
  ))
  .add('single field', () => (
    <>
      <FormRow maxWidth={'sm'}>
        <TextField label="Some Label" />
      </FormRow>
    </>
  ));
