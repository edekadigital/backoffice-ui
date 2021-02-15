import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Body, Switch } from '..'; // @edekadigital/backoffice-ui

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
  const { register, handleSubmit, watch } = useForm<{ switch: boolean }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    boolean | undefined
  >();

  const watchedValue = watch('switch');
  return (
    <>
      <Body gutterBottom variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.switch))}>
        <Switch label="Some label" name="switch" inputRef={register} />
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
