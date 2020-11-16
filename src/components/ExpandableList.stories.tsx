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

const initialItems = [
  { value: 'Banane' },
  { value: 'Apfel' },
  { value: 'Melone' },
];

const initialItemsCheckedSingle = [
  { value: 'Banane', checked: true },
  { value: 'Apfel', checked: false },
  { value: 'Melone', checked: false },
];

const initialItemsChecked = [
  { value: 'Banane', checked: true },
  { value: 'Apfel', checked: true },
  { value: 'Melone', checked: false },
];

export const Default = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      initialItems={initialItems}
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
    />
  );
};

export const CheckableMultiple = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
      checkable="multiple"
      initialItems={initialItemsChecked}
    />
  );
};

export const CheckableSingle = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
      checkable="single"
      initialItems={initialItemsCheckedSingle}
    />
  );
};

export const Disabled = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
      initialItems={initialItems}
      disabled={true}
    />
  );
};

export const WithMinMax = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
      checkable="single"
      initialItems={initialItemsChecked}
      max={5}
      min={2}
    />
  );
};

export const WithExternalId = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  const initialItems = [
    { value: 'Banane', checked: true, id: '1' },
    { value: 'Apfel', checked: false, id: '2' },
    { value: 'Melone', checked: false, id: '3' },
  ];

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
      checkable="single"
      initialItems={initialItems}
      max={5}
      min={2}
    />
  );
};

export const NoInitialItems = () => {
  const handleChange = (listItems: Array<ListItem>) => {
    console.log(listItems);
  };

  return (
    <ExpandableList
      optionLabel="Option"
      addButtonLabel="Option hinzufügen"
      onChange={handleChange}
    />
  );
};
