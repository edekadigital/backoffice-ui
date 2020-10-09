import * as React from 'react';
import { ExpandableList, ListItem } from '..'; // @edekadigital/backoffice-ui

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
  const handleChange = (listItems: Array<ListItem>) => {
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
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
    />
  );
};

export const WithAdditionalCheckButton = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  const initialItems = [
    { value: 'Banane' },
    { value: 'Apfel' },
    { value: 'Melone' },
  ];

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
      checkable="multiple"
      initialItems={initialItems}
    />
  );
};

export const Disabled = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  const initialItems = [
    { value: 'Banane', checked: true },
    { value: 'Apfel', checked: false },
    { value: 'Melone', checked: false },
  ];

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
      checkable="single"
      initialItems={initialItems}
      disabled={true}
    />
  );
};
