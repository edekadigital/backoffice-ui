import * as React from 'react';
import { ExpandableList } from '..'; // @edekadigital/backoffice-ui
import { Check } from '../icons';

export default {
  title: 'Components/ExpandableList',
  component: ExpandableList,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 10 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => {
  const handleClick = () => {
    console.log('This is an additional Action');
  };

  return (
    <ExpandableList
      initialItems={[
        { initialValue: 'Option 1' },
        { initialValue: 'Option 2' },
        { initialValue: 'Option 3' },
      ]}
      optionLabel="Option"
      addtionalAction={{ icon: Check, handler: handleClick }}
      headline="Liste von Optionen"
    />
  );
};
