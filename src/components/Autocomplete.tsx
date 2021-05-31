import * as React from 'react';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

/**
 * UI
 */
export interface AutocompleteProps<T extends {}> {
  label: string;
  inputPlaceholder: string;
  value: T[];
  onChange: (items: T[]) => unknown;
  fetchOptions: (inputValue: string) => Promise<T[]>;
  getOptionLabel: (item: T) => string;
  findItems?: (...inputStrings: string[]) => Promise<T[]>;
}

export const Autocomplete = <T extends {}>(props: AutocompleteProps<T>) => {
  const {
    label,
    inputPlaceholder,
    value,
    getOptionLabel,
    onChange,
    fetchOptions,
    findItems,
    ...otherProps
  } = props;

  const [options, setOptions] = React.useState<T[]>([]);

  const handleInputChange = async (
    _: React.ChangeEvent<{}>,
    inputValue: string
  ) => {
    const nextOptions = await fetchOptions(inputValue);
    setOptions(nextOptions);
  };

  const handleChange = async (
    _: React.ChangeEvent<{}>,
    value: (T | string)[],
    reason: string
  ) => {
    const newValues: T[] = [];

    for (const tempValue of value) {
      if (typeof tempValue === 'object') {
        newValues.push(tempValue);
      } else if (typeof tempValue === 'string' && findItems) {
        const foundItems = await findItems(...tempValue.split(/[,;]?[\s]+/));
        foundItems.forEach((tempValue) => newValues.push(tempValue as T));
      }
    }

    switch (reason) {
      case 'create-option':
      case 'select-option':
      case 'remove-option':
      case 'clear':
        onChange(newValues);
        break;
    }
  };

  return (
    <MuiAutocomplete
      multiple
      freeSolo
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onInputChange={handleInputChange}
      onChange={handleChange}
      {...otherProps}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={inputPlaceholder}
        />
      )}
    />
  );
};
