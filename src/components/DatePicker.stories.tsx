import * as React from 'react';
import { DatePicker } from '..'; // @edekadigital/backoffice-ui
import { useState } from 'react';

export default {
  title: 'Components|DatePicker',
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
