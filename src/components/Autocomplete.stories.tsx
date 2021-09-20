import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from './Autocomplete';
import { Body } from '../typography/Body';

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

export const ReactHookFormExample = () => {
  interface Brewery {
    id: number;
    name: string;
    city: string;
  }

  const { control, watch } = useForm<{ breweries: Brewery[] }>({
    defaultValues: {
      breweries: [],
    },
  });

  const watchedValue = watch('breweries');

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
    <>
      <Body gutterBottom={3} variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <Controller
        render={({ onChange, value }) => (
          <Autocomplete
            label="Breweries"
            inputPlaceholder="Add breweries by name or city"
            value={value}
            onChange={onChange}
            fetchOptions={fetchOptions}
            getOptionLabel={getOptionLabel}
            findItems={findItems}
          />
        )}
        name="breweries"
        control={control}
      />
      <br />
      <Body>watchedValue:</Body>
      <pre>{JSON.stringify(watchedValue, null, 2)}</pre>
    </>
  );
};

export const ReactHookFormWithColoredChipsExample = () => {
  interface Brewery {
    id: number;
    name: string;
    city: string;
  }

  const { control, watch } = useForm<{ breweries: Brewery[] }>({
    defaultValues: {
      breweries: [],
    },
  });

  const watchedValue = watch('breweries');

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
      setTimeout(() => {
        resolve(
          inputValues.map((name) => ({
            id: 0,
            name,
            city: 'Hamburg',
            found: name.includes('failed')
              ? false
              : name.includes('success')
              ? true
              : undefined,
          }))
        );
      }, 2000)
    );
  };

  const getOptionLabel = (brewery: Brewery) => brewery.name;

  return (
    <>
      <Body gutterBottom={3} variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <Controller
        render={({ onChange, value }) => (
          <Autocomplete
            colored={true}
            label="Breweries"
            inputPlaceholder="Add breweries by name or city"
            value={value}
            onChange={onChange}
            fetchOptions={fetchOptions}
            getOptionLabel={getOptionLabel}
            findItems={findItems}
          />
        )}
        name="breweries"
        control={control}
      />
      <br />
      <Body>watchedValue:</Body>
      <pre>{JSON.stringify(watchedValue, null, 2)}</pre>
    </>
  );
};
