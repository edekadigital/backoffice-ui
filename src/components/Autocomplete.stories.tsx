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

  const [value, setValue] = React.useState<(Brewery | string)[]>([]);

  const handleChange = (breweries: (Brewery | string)[]) => {
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

export const ColoredChipsExample = () => {
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
    return new Promise<(Brewery | string)[]>((resolve) =>
      setTimeout(() => {
        resolve(
          inputValues.map((name) => {
            return name.includes('success')
              ? {
                  id: 0,
                  name,
                  city: 'Hamburg',
                }
              : name;
          })
        );
      }, 1000 + Math.random() * 4000)
    );
  };

  const getOptionLabel = (brewery: Brewery) => brewery.name;

  return (
    <>
      <Body gutterBottom={3} variant="body2">
        <p>
          Here we show an example of using colored chips. Please note that in
          this example the provided method findItems (look at code in this
          example) is <strong>always</strong> returning something, even if it
          does not find a specific item. This enables showing not-found items in
          the Autocomplete.
        </p>
        <p>
          In order to test this, you can type something that includes
          &apos;success&apos; to get a blue chip. Everything else will show up
          in red.
        </p>
        <p>
          If you test this, watch the &apos;watchedValue&apos; list, while
          Autocomplete is searching. You will notice that a string that is still
          being searched, does not already make it to the values list. We only
          fire onChange, when we either found or did not find a string. This way
          you can be sure that onChange will always only deliver values that
          have been checked already.
        </p>
        <p>
          Autocomplete also allows you to paste a list of strings. If you want,
          copy this little list and see what happens:
        </p>
        <pre>coolsuccess, badfail, anothersuccess, anotherfail</pre>
        Also works with &apos;;&apos; instead of &apos;,&apos;.
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

export const ColoredChipsFindFailsExample = () => {
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
          inputValues
            .filter((name) => name.includes('success'))
            .map((name) => ({
              id: 0,
              name,
              city: 'Hamburg',
            }))
        );
      }, 1000)
    );
  };

  const getOptionLabel = (brewery: Brewery) => brewery.name;

  return (
    <>
      <Body gutterBottom={3} variant="body2">
        Here we show an example, where the findItems method (look at code in
        this example) will actually not return anything for not-found items. As
        you can see, not-found items are not showing up in the Autocomplete now.
        In order to test this, you can type something that includes
        &apos;success&apos; to get a blue chip. Everything else will not show
        up.
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
