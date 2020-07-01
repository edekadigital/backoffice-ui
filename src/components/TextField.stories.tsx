import * as React from 'react';
import { TextField, Visibility } from '..'; // @edekadigital/backoffice-ui
import { IconButton } from './IconButton';

export default {
  title: 'Components|TextField',
  component: TextField,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 10 }}>{storyFn()}</div>
    ),
  ],
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
  const adornment = <>Test</>;
  return <TextField label="Some label" endAdornment={adornment} />;
};

export const WithIconButtonAdornment = () => {
  const adornment = (
    <IconButton onClick={() => {}} icon={Visibility} edge="end" />
  );
  return <TextField label="Some label" endAdornment={adornment} />;
};

export const Password = () => (
  <TextField label="Password" required={true} type="password" />
);
