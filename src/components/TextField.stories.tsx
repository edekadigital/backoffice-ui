import * as React from 'react';
import { TextField, Visibility } from '..'; // @edekadigital/backoffice-ui
import { InputAdornment, IconButton } from '@material-ui/core';

export default {
  title: 'Components|TextField',
  component: TextField,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 10 }}>{storyFn()}</div>
    ),
  ],
};

TextField.defaultProps = {
  type: 'text',
  required: false,
  inputTestId: 'textField-input',
};

export const Default = () => <TextField label="Some label" />;
export const Required = () => <TextField label="Some label" required={true} />;
export const Disabled = () => <TextField label="Some label" disabled={true} />;
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

export const WithTextAdornment = () => {
  const adornment = <InputAdornment position="end">Test</InputAdornment>;
  return <TextField label="Some label" endAdornment={adornment} />;
};

export const WithIconButtonAdornment = () => {
  const adornment = (
    <InputAdornment position="end">
      <IconButton onClick={() => {}} onMouseDown={() => {}} edge="end">
        <Visibility />
      </IconButton>
    </InputAdornment>
  );
  return <TextField label="Some label" endAdornment={adornment} />;
};

export const Password = () => (
  <TextField label="Password" required={true} type="password" />
);
