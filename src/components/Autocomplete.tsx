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
}

export const Autocomplete = <T extends {}>(props: AutocompleteProps<T>) => {
  const {
    label,
    inputPlaceholder,
    value,
    getOptionLabel,
    onChange,
    fetchOptions,
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

  const handleChange = (
    _: React.ChangeEvent<{}>,
    value: (T | string)[],
    reason: string
  ) => {
    const newValue = value as T[];
    switch (reason) {
      case 'select-option':
      case 'remove-option':
        onChange(newValue);
        break;
      default:
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
