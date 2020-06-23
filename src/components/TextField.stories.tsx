import * as React from 'react';
import { TextField } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components|TextField',
  component: TextField,
};

TextField.defaultProps = {
  type: 'text',
  required: false,
};

export const Default = () => <TextField label="Some label" />;
export const Required = () => <TextField label="Some label" required={true} />;
export const WithPlaceholder = () => (
  <TextField label="Some label" placeholder="Placeholder" />
);
export const WithError = () => (
  <TextField
    label="Some label"
    placeholder="Placeholder"
    error={true}
    helperText="Lorem ipsum"
  />
);

export const WithValue = () => (
  <TextField label="Some label" value="Some value" />
);

export const Password = () => (
  <TextField label="Password" required={true} type="password" />
);
