import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Switch } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|Switch', module)
  .add('default', () => <Switch label="Some label" value="someValue" />)
  .add('disabled', () => (
    <Switch label="Some label" value="someValue" disabled={true} />
  ))
  .add('controlled', () => {
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
  });
