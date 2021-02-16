import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Body, TextField, Visibility } from '..'; // @edekadigital/backoffice-ui
import { IconButton } from './IconButton';
import { Paper } from './Paper';

export default {
  title: 'Components/TextField',
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

export const WithTextEndAdornment = () => {
  const adornment = <>Test</>;
  return <TextField label="Some label" endAdornment={adornment} />;
};

export const WithIconButtonEndAdornment = () => {
  const adornment = (
    <IconButton onClick={() => {}} icon={Visibility} edge="end" />
  );
  return <TextField label="Some label" endAdornment={adornment} />;
};

export const WithTextStartAdornmentBefore = () => {
  return (
    <TextField
      label="Some label"
      startAdornment={<>1.</>}
      startAdornmentPosition="outside"
    />
  );
};

export const WithIconButtonStartAdornment = () => {
  const adornment = (
    <IconButton onClick={() => {}} icon={Visibility} edge="end" />
  );
  return <TextField label="Some label" startAdornment={adornment} />;
};

export const Password = () => (
  <TextField label="Password" required={true} type="password" />
);

export const TimePicker = () => <TextField type="time" label="Some label" />;

export const Multiline = () => (
  <TextField multiline={true} rows={5} label="Some label" />
);

export const Invert = () => {
  return (
    <Paper backgroundColor="primary">
      <TextField color="secondary" label="Some Label" />
    </Paper>
  );
};

export const ReactHookFormExample = () => {
  const { register, handleSubmit, watch } = useForm<{ text: string }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    string | undefined
  >();

  const watchedValue = watch('text');
  return (
    <>
      <Body gutterBottom={3} variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.text))}>
        <TextField name="text" inputRef={register} />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <pre>
        Watched value:{' '}
        {watchedValue !== undefined ? watchedValue.toString() : ''}
      </pre>
      <pre>
        Submitted value:{' '}
        {submittedValue !== undefined ? submittedValue.toString() : ''}
      </pre>
    </>
  );
};
