import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { DateField } from './DateField';

storiesOf('Components|DateField', module)
  .add('default', () => <DateField label="Geburtsdatum" />)
  .add('with placeholder', () => (
    <DateField label="Geburtsdatum" placeholder="TT.MM.JJJJ" />
  ))
  .add('required', () => (
    <DateField label="Geburtsdatum" placeholder="TT.MM.JJJJ" required={true} />
  ))
  .add('with error', () => (
    <DateField
      label="Geburtsdatum"
      placeholder="TT.MM.JJJJ"
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
      <DateField
        label="Geburtsdatum"
        placeholder="TT.MM.JJJJ"
        value={value}
        onChange={handleChange}
      />
    );
  });
