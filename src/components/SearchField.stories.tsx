import * as React from 'react';
import { SearchField } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components/SearchField',
  component: SearchField,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 120 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => {
  const handleChange = (value: string) => {
    console.log(`Change: ${value}`);
  };

  const handleSubmit = (value: string) => {
    console.log(`Submit: ${value}`);
  };
  return (
    <SearchField
      placeholder="Search"
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export const Progress = () => {
  const handleChange = (value: string) => {
    console.log(`Change: ${value}`);
  };

  const handleSubmit = (value: string) => {
    console.log(`Submit: ${value}`);
  };

  return (
    <SearchField
      placeholder="Search"
      progress={true}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};
