import * as React from 'react';
import { DateField } from './DateField';

export default {
  title: 'Components|DateField',
  component: DateField,
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
