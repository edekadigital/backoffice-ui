import * as React from 'react';
import { SelectField } from './SelectField';

export default {
  title: 'Components|SelectField',
  component: SelectField,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 10 }}>{storyFn()}</div>
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
    <div style={{ width: '50%', margin: 'auto' }}>
      <SelectField
        menuItems={menuItems}
        value={value}
        onChange={handleChange}
        label="Some label"
      />
    </div>
  );
};
