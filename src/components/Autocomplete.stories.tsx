import * as React from 'react';
import { Autocomplete } from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
};

export const Default = () => {
  interface User {
    id: number;
    name: string;
  }

  const [value, setValue] = React.useState<User[]>([]);

  const handleChange = (users: User[]) => {
    setValue([...users]);
  };

  const fetchOptions = async (inputValue: string) => {
    if (inputValue.length > 1) {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const result: User[] = await response.json();

      return result.filter((tempUser) =>
        tempUser.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
    } else {
      return [];
    }
  };

  const getOptionLabel = (user: User) => user.name;

  return (
    <Autocomplete
      label="Users"
      inputPlaceholder="Add user"
      value={value}
      onChange={handleChange}
      fetchOptions={fetchOptions}
      getOptionLabel={getOptionLabel}
    />
  );
};
