import * as React from 'react';
import { Autocomplete } from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
};

export const Default = () => {
  interface Brewery {
    id: number;
    name: string;
    city: string;
  }

  const [value, setValue] = React.useState<Brewery[]>([]);

  const handleChange = (breweries: Brewery[]) => {
    setValue([...breweries]);
  };

  const fetchOptions = async (inputValue: string) => {
    if (inputValue.length > 2) {
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries/search?query=${inputValue}`
      );
      const result: Brewery[] = await response.json();

      return result.filter(
        (tempVal) =>
          tempVal.name.toLowerCase().startsWith(inputValue.toLowerCase()) ||
          tempVal.city.toLowerCase().startsWith(inputValue.toLowerCase())
      );
    } else {
      return [];
    }
  };

  const findItems = async (...inputValues: string[]) => {
    return new Promise<Brewery[]>((resolve) =>
      resolve(inputValues.map((name) => ({ id: 0, name, city: 'Hamburg' })))
    );
  };

  const getOptionLabel = (brewery: Brewery) => brewery.name;

  return (
    <Autocomplete
      label="Breweries"
      inputPlaceholder="Add breweries by name or city"
      value={value}
      onChange={handleChange}
      fetchOptions={fetchOptions}
      getOptionLabel={getOptionLabel}
      findItems={findItems}
    />
  );
};
