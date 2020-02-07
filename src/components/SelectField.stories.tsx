import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { SelectField } from '..';

const menuItems = [
  { value: '', label: 'Keine Angabe' },
  { value: 'de', label: 'Germany' },
  { value: 'se', label: 'Sweden' },
  { value: 'pl', label: 'Poland' },
];

storiesOf('Components|SelectField', module)
  .add('default', () => (
    <SelectField
      label="Some label"
      value=""
      menuItems={menuItems}
      id="test-id"
    />
  ))
  .add('pre selected', () => (
    <SelectField label="Some label" value="de" menuItems={menuItems} />
  ))
  .add('disabled and preselected', () => (
    <SelectField
      label="Some label"
      disabled={true}
      value="de"
      menuItems={menuItems}
    />
  ))
  .add('with error', () => (
    <SelectField
      label="Some label"
      value="de"
      menuItems={menuItems}
      error={true}
      helperText="Lorem ipsum"
    />
  ))
  .add('controlled', () => {
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
  });
