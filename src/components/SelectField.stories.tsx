import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Body, Button } from '..';
import { Paper } from './Paper';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

export default {
  title: 'Components/SelectField',
  component: SelectField,
  subcomponents: { TextField },
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 120 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => {
  const menuItems = [
    { value: '', label: 'Keine Angabe' },
    { value: 'de', label: 'Germany' },
    { value: 'se', label: 'Sweden' },
    { value: 'pl', label: 'Poland' },
  ];
  return (
    <SelectField
      label="Some label"
      value=""
      menuItems={menuItems}
      id="test-id"
    />
  );
};

export const PreSelected = () => {
  const menuItems = [
    { value: '', label: 'Keine Angabe' },
    { value: 'de', label: 'Germany' },
    { value: 'se', label: 'Sweden' },
    { value: 'pl', label: 'Poland' },
  ];
  return <SelectField label="Some label" value="de" menuItems={menuItems} />;
};

export const Disabled = () => {
  const menuItems = [
    { value: '', label: 'Keine Angabe' },
    { value: 'de', label: 'Germany' },
  ];
  return (
    <SelectField label="Some label" disabled={true} menuItems={menuItems} />
  );
};

export const WithError = () => {
  const menuItems = [
    { value: '', label: 'Keine Angabe' },
    { value: 'de', label: 'Germany' },
  ];
  return (
    <SelectField
      label="Some label"
      value="de"
      menuItems={menuItems}
      error={true}
      helperText="Lorem ipsum"
    />
  );
};

export const Controlled = () => {
  const menuItems = [
    { value: '', label: 'Keine Angabe' },
    { value: 'de', label: 'Germany' },
    { value: 'se', label: 'Sweden' },
    { value: 'pl', label: 'Poland' },
  ];
  const [value, setValue] = React.useState<string | ''>('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <SelectField
      menuItems={menuItems}
      value={value}
      onChange={handleChange}
      label="Some label"
    />
  );
};

export const WithDefaultValue = () => {
  const menuItems = [
    { value: '', label: 'Keine Angabe' },
    { value: 'de', label: 'Germany' },
    { value: 'se', label: 'Sweden' },
    { value: 'pl', label: 'Poland' },
  ];
  const [value, setValue] = React.useState<string>();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <SelectField
      menuItems={menuItems}
      value={value}
      onChange={handleChange}
      label="Some label"
      defaultValue={menuItems[1].value}
    />
  );
};

export const WithContrastColor = () => {
  const menuItems = [
    { value: '', label: 'Keine Angabe' },
    { value: 'de', label: 'Germany' },
    { value: 'se', label: 'Sweden' },
    { value: 'pl', label: 'Poland' },
  ];
  return (
    <Paper backgroundColor="primary">
      <SelectField
        label="Some label"
        value=""
        menuItems={menuItems}
        id="test-id"
        color="secondary"
      />
    </Paper>
  );
};

export const ReactHookFormExample = () => {
  const { handleSubmit, watch, control } = useForm<{
    country: string;
  }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    string | undefined
  >();

  const watchedValue = watch('country');
  return (
    <>
      <Body gutterBottom={3} variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.country))}>
        <Controller
          render={({ ref, ...props }) => (
            <SelectField
              label="Some label"
              menuItems={[
                { value: '', label: 'Keine Angabe' },
                { value: 'de', label: 'Germany' },
                { value: 'se', label: 'Sweden' },
                { value: 'pl', label: 'Poland' },
              ]}
              inputRef={ref}
              {...props}
            />
          )}
          name="country"
          control={control}
          defaultValue=""
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
