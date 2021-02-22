import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Body, Button, Switch } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components/Switch',
  component: Switch,
};

export const Default = () => <Switch label="Some label" value="someValue" />;
export const Disbaled = () => (
  <Switch label="Some label" value="someValue" disabled={true} />
);
export const Controlled = () => {
  const StoryComponent = () => {
    const [checked, setChecked] = React.useState<boolean>(true);

    const toggle = React.useCallback(() => {
      setChecked(!checked);
    }, [checked]);

    return (
      <Switch
        label="Some label"
        value="someValue"
        checked={checked}
        onChange={toggle}
      />
    );
  };
  return <StoryComponent />;
};

export const ReactHookFormExample = () => {
  const { control, handleSubmit, watch, reset } = useForm<{
    switch: boolean;
  }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    boolean | undefined
  >();

  const [data, setData] = React.useState<{ switch: true }>();

  React.useEffect(() => {
    setTimeout(() => {
      setData({ switch: true });
    }, 1000);
  }, []);

  React.useEffect(() => {
    reset(data);
  }, [data, reset]);

  const watchedValue = watch('switch');
  return (
    <>
      <Body gutterBottom variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.switch))}>
        <Controller
          name="switch"
          control={control}
          defaultValue={false}
          render={({ onChange, value }) => {
            return (
              <Switch
                label="EDEKA-Inspiration"
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
              />
            );
          }}
        />
        <br />
        <br />
        <Button type="submit">Submit</Button>
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
