import * as React from 'react';
import { Launch, Star, History, CloudDownload, Check } from '../icons';
import { RadioButtonTiles } from './RadioButtonTiles';
import { Body, Button, Page } from '..';
import { Controller, useForm } from 'react-hook-form';

export default {
  title: 'Components/RadioButtonTiles',
  component: RadioButtonTiles,
};

export const Default = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <RadioButtonTiles
      items={[
        { label: 'Option A', value: 'a', icon: Launch },
        { label: 'Option B', value: 'b', icon: Launch },
      ]}
      onChange={handleChange}
      value={value}
    />
  );
};

export const ThreeTilesPerLine = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <Page variant="narrow">
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
          { label: 'Option D', value: 'd', icon: CloudDownload },
          { label: 'Option E', value: 'e', icon: Check },
        ]}
        onChange={handleChange}
        value={value}
      />
    </Page>
  );
};

export const TwoTilesPerLine = () => {
  const [value, setValue] = React.useState<string>('a');
  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <Page variant="narrow">
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
        ]}
        onChange={handleChange}
        value={value}
        tilesPerLine={2}
      />
    </Page>
  );
};
export const FourTilesPerLine = () => {
  const [value, setValue] = React.useState<string>('a');
  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <Page variant="narrow">
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
          { value: 'd', icon: CloudDownload },
          { value: 'e', icon: Check },
        ]}
        onChange={handleChange}
        value={value}
        tilesPerLine={4}
      />
    </Page>
  );
};

export const ReactHookFormExample = () => {
  const { control, handleSubmit, watch } = useForm<{ selected: string }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    string | undefined
  >();

  const watchedValue = watch('selected');
  return (
    <>
      <Body gutterBottom={3} variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.selected))}>
        <Controller
          render={({ value, onChange }) => (
            <RadioButtonTiles
              items={[
                { label: 'Option A', value: 'a', icon: Launch },
                { label: 'Option B', value: 'b', icon: Star },
                { label: 'Option C', value: 'c', icon: History },
                { value: 'd', icon: CloudDownload },
                { value: 'e', icon: Check },
              ]}
              tilesPerLine={4}
              value={value}
              onChange={onChange}
            />
          )}
          name="selected"
          defaultValue={undefined}
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
