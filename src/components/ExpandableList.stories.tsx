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
  const handleChange = (listItems: Array<any>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      initialItems={[
        { value: 'Banane' },
        { value: 'Apfel' },
        { value: 'Melone' },
      ]}
      optionLabel="Option"
      headline="Liste von Optionen"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
    />
  );
};

export const WithAdditionalAction = () => {
  const handleClick = () => {
    console.log('This is an additional Action');
  };

  const handleChange = (listItems: Array<any>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      optionLabel="Option"
      addtionalAction={{ icon: Check, handler: handleClick }}
      headline="Liste von Optionen"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
    />
  );
};
