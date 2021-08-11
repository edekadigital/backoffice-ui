import * as React from 'react';
import MuiAutocomplete, {
  AutocompleteChangeReason,
} from '@material-ui/lab/Autocomplete';
import { TextField as MuiTextField } from '@material-ui/core';

export interface AutocompleteProps<T extends {}> {
  /**
   * The label of this autocomplete field that will be shown inside when empty and not focused, inside the top line when filled.
   */
  label: string;
  /**
   * The inputPlaceholder is shown inside the input while typing as a suggestion
   */
  inputPlaceholder: string;
  /**
   * Overwrites the default `data-testid` for the input element.
   * @default "autocompleteField-input"
   */
  inputTestId?: string;
  /**
   * the default values that are shipped with this component by config
   */
  value: T[];
  /**
   * function fired when items are changing
   */
  onChange: (items: T[]) => unknown;
  /**
   * how to fetch autosuggestions
   */
  fetchOptions: (inputValue: string) => Promise<T[]>;
  /**
   * Used to determine the string value for a given option.
   */
  getOptionLabel: (item: T) => string;
  /**
   * how to process manually entered items (not autosuggested)
   */
  findItems?: (...inputStrings: string[]) => Promise<T[]>;
  /**
   * You normally should not have to use this, but in special cases
   * use className to override specific styles.
   */
  className?: string;
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
    inputTestId = 'autocompleteField-input',
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

  const handleBlur = async (event: React.ChangeEvent<{}>) =>
    handleChange(
      event,
      [...value, (event.target as HTMLInputElement).value],
      'blur'
    );

  const handleChange = async (
    _: React.ChangeEvent<{}>,
    value: (T | string)[],
    reason: AutocompleteChangeReason
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
      case 'blur':
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
      onBlur={handleBlur}
      onChange={handleChange}
      {...otherProps}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          inputProps={{ ...params.inputProps, 'data-testid': inputTestId }}
          variant="outlined"
          label={label}
          placeholder={inputPlaceholder}
        />
      )}
    />
  );
};
