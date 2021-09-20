import * as React from 'react';
import MuiAutocomplete, {
  AutocompleteChangeReason,
} from '@material-ui/lab/Autocomplete';
import {
  Chip,
  CircularProgress,
  TextField as MuiTextField,
} from '@material-ui/core';
import { AutocompleteGetTagProps } from '@material-ui/lab/Autocomplete/Autocomplete';

export interface AutocompleteProps<T extends {}> {
  /**
   * The label of this autocomplete field that will be shown inside when empty and not focused, inside the top line when filled.
   */
  label?: string;
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

  /**
   * You can use the chipLookupColor prop to define a color
   * for the chip during the item search
   */
  chipLookupColor?: string;

  /**
   * You can use the chipLookupColor property to define a color
   * for the chip of the not found item
   */
  chipLookupFailedColor?: string;

  /**
   * You can use the chipLookupColor property to define a color
   * for the chip of the found item
   */
  chipLookupSuccessColor?: string;

  /**
   * abc
   */
  colored?: boolean;
}

const trimSplit = (x: string): string[] => x.trim().split(/[,;]?[\s]+/);
const flatten = <T extends string[]>(array: T[]): string[] =>
  array.reduce((acc: string[], val: string[]) => acc.concat(val), []);
const distinct = <T extends string>(value: T, index: number, self: T[]) => {
  return self.indexOf(value) === index;
};

export const Autocomplete = <A extends {}>(props: AutocompleteProps<A>) => {
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

  type B = A & { input: string; found?: boolean };

  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<B[]>([]);

  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    inputValue: string
  ) => {
    const nativeEvent: InputEvent = event.nativeEvent as InputEvent;
    if (event && nativeEvent.inputType === 'insertFromPaste') {
      await handleChange(
        event,
        [...value, (event.target as HTMLInputElement).value],
        'create-option'
      );
    } else {
      const nextOptions = await fetchOptions(inputValue).then((results) =>
        results.map((el) => {
          return { ...el, input: inputValue, found: true };
        })
      );
      setOptions(nextOptions);
    }
  };

  const handleBlur = async (event: React.ChangeEvent<{}>) => {
    if ((event.target as HTMLInputElement).value.trim() !== '') {
      await handleChange(
        event,
        [...value, (event.target as HTMLInputElement).value],
        'blur'
      );
    }
  };

  const handleChange = async (
    _: React.ChangeEvent<{}>,
    value: (A | string)[],
    reason: AutocompleteChangeReason
  ) => {
    const allValues: B[] = [];
    const oldValues: B[] = value.filter((it) => typeof it === 'object') as B[];
    allValues.push(...oldValues);

    const newValues: string[] = flatten(
      (value.filter((it) => typeof it === 'string') as string[]).map(trimSplit)
    )
      .filter(distinct)
      .filter((input) => allValues.every((e) => e.input !== input));

    for (const tempValue of newValues) {
      allValues.push({ input: tempValue } as B);
    }

    if (findItems && newValues.length > 0) {
      setLoading(true);
      for (const tempValue of newValues) {
        findItems(tempValue).then((items) => {
          const index = allValues.findIndex((it) => it.input === tempValue);
          allValues[index] = { ...items[0], input: tempValue };
          onChange(allValues);
          if (index === allValues.length - 1) setLoading(false);
        });
      }
    }

    switch (reason) {
      case 'create-option':
      case 'select-option':
      case 'remove-option':
      case 'blur':
      case 'clear':
        onChange(allValues);
        break;
    }
  };

  const getExtendedOptionLabel = (b: B) => {
    return b.found === undefined && b.input ? b.input : getOptionLabel(b);
  };

  const renderTagsFunc: (
    value: A[],
    getTagProps: AutocompleteGetTagProps
  ) => React.ReactNode = (value, getTagProps) =>
    value.map((option, index) => {
      return (
        <Chip
          {...getTagProps({ index })}
          key={`autocomplete-key-${index}`}
          label={getExtendedOptionLabel(option as B)}
          style={{
            backgroundColor:
              (option as B).found === true
                ? props.chipLookupSuccessColor || '#1a65b2'
                : (option as B).found === false
                ? props.chipLookupFailedColor || '#d32f2f'
                : props.chipLookupColor || '#e0e0e0',
          }}
          color={(option as B).found !== undefined ? 'primary' : 'default'}
        />
      );
    });

  let renderTagsProps = {};
  if (props.colored) {
    renderTagsProps = {
      renderTags: renderTagsFunc,
    };
  }

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
      {...renderTagsProps}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="primary" size={'1.5rem'} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            'data-testid': inputTestId,
          }}
          variant="outlined"
          label={label}
          placeholder={inputPlaceholder}
        />
      )}
    />
  );
};
