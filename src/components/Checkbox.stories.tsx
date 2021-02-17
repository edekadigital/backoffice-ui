import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Body, Button, Checkbox } from '..'; // @edekadigital/backoffice-ui
import { edekaBlue } from '../constants/colors';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export const Default = () => <Checkbox />;
export const Inverted = () => (
  <div style={{ background: `${edekaBlue.main}` }}>
    <Checkbox inverted={true} />
  </div>
);
export const Disabled = () => <Checkbox disabled={true} />;

export const ReactHookFormExample = () => {
  const { register, handleSubmit, watch } = useForm<{ checked: boolean }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    boolean | undefined
  >();

  const watchedValue = watch('checked');
  return (
    <>
      <Body gutterBottom variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.checked))}>
        <Checkbox name="checked" inputRef={register} />
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
