import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '..';
import { DateField } from './DateField';

export default {
  title: 'Components/DateField',
  component: DateField,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 10 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => <DateField label="Geburtsdatum" />;
export const WithPlaceholder = () => (
  <DateField label="Geburtsdatum" placeholder="TT.MM.JJJJ" />
);
export const Required = () => (
  <DateField label="Geburtsdatum" placeholder="TT.MM.JJJJ" required={true} />
);
export const WithError = () => (
  <DateField
    label="Geburtsdatum"
    placeholder="TT.MM.JJJJ"
    error={true}
    helperText="Lorem ipsum"
  />
);
export const Controlled = () => {
  const [value, setValue] = React.useState<string | ''>('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <DateField
      label="Geburtsdatum"
      placeholder="TT.MM.JJJJ"
      value={value}
      onChange={handleChange}
    />
  );
};

export const ReactHookFormExample = () => {
  const { handleSubmit, watch, control } = useForm<{
    dateField: string;
  }>();
  const [submittedValue, setSubmittedValue] = React.useState<string>();
  const watchedValue = watch('dateField');
  return (
    <>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.dateField))}>
        <Controller
          render={({ ref, ...props }) => (
            <DateField
              label="Geburtsdatum"
              placeholder="TT.MM.JJJJ"
              inputRef={ref}
              {...props}
            />
          )}
          name="dateField"
          defaultValue=""
          control={control}
        />
        <br />
        <br />
        <Button type="submit">Submit</Button>
      </form>
      <pre>Watched value: {watchedValue}</pre>
      <pre>Submitted value: {submittedValue}</pre>
    </>
  );
};
