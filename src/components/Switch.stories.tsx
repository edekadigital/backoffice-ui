import * as React from 'react';
import { Switch } from '..'; // @edekadigital/backoffice-ui

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
