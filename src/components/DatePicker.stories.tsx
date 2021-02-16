import * as React from 'react';
import { Body, DatePicker } from '..'; // @edekadigital/backoffice-ui
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 10 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker label="Some label" value={value} onChange={setValue} />;
};
export const DefaultToday = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return <DatePicker label="Some label" value={value} onChange={setValue} />;
};
export const WithFutureDisabled = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <DatePicker
      label="Some label"
      value={value}
      onChange={setValue}
      disableFuture={true}
    />
  );
};
export const Required = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <DatePicker
      label="Some label"
      value={value}
      onChange={setValue}
      required={true}
    />
  );
};
export const Disabled = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <DatePicker
      label="Some label"
      value={value}
      onChange={setValue}
      disabled={true}
    />
  );
};
export const WithPlaceholder = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePicker
      label="Some label"
      value={value}
      onChange={setValue}
      placeholder="Placeholder"
    />
  );
};
export const WithError = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePicker
      label="Some label"
      value={value}
      onChange={setValue}
      error={true}
      helperText="Lorem ipsum"
    />
  );
};

export const WithValue = () => {
  const [value, setValue] = useState<Date | null>(new Date('12 24 2020'));
  return <DatePicker label="Some label" value={value} onChange={setValue} />;
};

export const ReactHookFormExample = () => {
  const { control, handleSubmit, watch } = useForm<{ date: boolean }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    boolean | undefined
  >();

  const watchedValue = watch('date');
  return (
    <>
      <Body gutterBottom={3} variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.date))}>
        <Controller
          render={({ ref, ...props }) => (
            <DatePicker label="Geburtsdatum" inputRef={ref} {...props} />
          )}
          name="date"
          defaultValue={undefined}
          control={control}
        />
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
