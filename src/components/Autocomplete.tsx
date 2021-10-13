import * as React from 'react';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import {
  Chip,
  CircularProgress,
  TextField as MuiTextField,
} from '@material-ui/core';
import { AutocompleteGetTagProps } from '@material-ui/lab/Autocomplete/Autocomplete';
import { useMemo } from 'react';

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
   * A value item of type T stands for an item, that is considered 'found'.
   * A value item of type string stands for an 'unfound' item.
   */
  value: (T | string)[];
  /**
   * function fired when items are changing. Items will be of type T, if the
   * user
   * - selected the item through the options dropdown
   * - typed something, for which the findItems method returned an object of type T
   * If findItems returned a string for the searched string, that string will also
   * be returned here.
   */
  onChange: (items: (T | string)[]) => unknown;
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
   * If you do NOT want to display unfound items, just do not
   * return an item for the respective inputString. Otherwise if
   * you want to display unfound items, return a string for that item
   * (e.g. the original inputString).
   *
   * This only works correctly, if you feed the items of the onChange
   * callback back into the value property.
   */
  findItems?: (...inputStrings: string[]) => Promise<(T | string)[]>;
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
   * Autocomplete internally makes a distinction between items that have
   * been 'found' (either through the fetchOptions method or through the
   * findItems method) and items, which are just the plain strings a user
   * has typed in, but which did not correspond to any result of findItems.
   * If you want this internal distinction to be visible, then set this property to true.
   * 'found' items will have a blue color (or the color you specify in chipLookupSuccessColor),
   * unfound items will be red (or what you specify in chipLookupFailedColor).
   * And items, which are still being searched for via findItems, will
   * temporarily be displayed in grey (or what you specify in chipLookupColor).
   *
   * If you turn this to false (default), then everything will be grey.
   */
  colored?: boolean;
}

const trimSplit = (x: string): string[] => x.trim().split(/[,;]?[\s]+/);
const flatten = <T extends string[]>(array: T[]): string[] =>
  array.reduce((acc: string[], val: string[]) => acc.concat(val), []);
const distinct = <T extends string>(value: T, index: number, self: T[]) => {
  return self.indexOf(value) === index;
};
const isString = (v: unknown): v is string => typeof v === 'string';

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
    chipLookupSuccessColor = '#1a65b2',
    chipLookupFailedColor = '#d32f2f',
    chipLookupColor = '#e0e0e0',
    colored,
    ...otherProps
  } = props;

  const [loading, setLoading] = React.useState(false);
  // options which we can display in the suggestion dropdown
  const [options, setOptions] = React.useState<T[]>([]);
  // strings, that the user has just typed in and for which we
  // are searching for corresponding objects of type T.
  const [itemsBeingSearched, setItemsBeingSearched] = React.useState<string[]>(
    []
  );

  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    inputValue: string
  ) => {
    if (event === null) return;

    const nativeEvent: InputEvent = event.nativeEvent as InputEvent;
    if (nativeEvent && nativeEvent.inputType === 'insertFromPaste') {
      await handleChange(event, [
        ...value,
        (event.target as HTMLInputElement).value,
      ]);
    } else if (inputValue) {
      const nextOptions = await fetchOptions(inputValue);
      setOptions(nextOptions);
    }
  };

  const handleBlur = async (event: React.ChangeEvent<{}>) => {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.trim() !== '') {
      await handleChange(event, [...value, inputElement.value]);
    }
  };

  const handleChange = async (
    _: React.ChangeEvent<{}>,
    values: (T | string)[]
  ) => {
    // all values which we already had in our props. We also use this
    // list to build the new values state
    let allValues = values.filter((value) => props.value.includes(value));

    // new values which the user has typed in just now
    const newStringValues: string[] = flatten(
      values
        .filter(isString)
        .filter((newValue) => !props.value.includes(newValue))
        .map(trimSplit)
    ).filter(distinct);

    // new values which the user has selected through the dropdown
    const newObjectValues = values
      .filter((v) => !isString(v))
      .filter((v) => !props.value.includes(v));

    // selected values can directly be added
    allValues = allValues.concat(newObjectValues);

    if (newStringValues.length <= 0 && values.length !== props.value.length) {
      // If there are no new typed string values, we can end this here and
      // return what we have collected so far.
      onChange(allValues);
      return;
    }

    if (findItems) {
      // We have a find method, so we can search for objects that correspond
      // to the typed string values.
      setLoading(true);
      setItemsBeingSearched(newStringValues);
      // Due to the asynchronous nature of findItems AND the way itemsBeingSearched
      // is updated, we need to keep this technical copy here in order to
      // have a deterministic list.
      const localListOfItemsBeingSearched = [...newStringValues];
      for (const tempValue of newStringValues) {
        monitorItemSearch(tempValue, localListOfItemsBeingSearched, allValues);
      }
    } else {
      // We do not have a find method, so we just take what was given to us.
      allValues = allValues.concat(newStringValues);
      onChange(allValues);
    }
  };

  const monitorItemSearch = async (
    searchValue: string,
    localListOfItemsBeingSearched: string[],
    allValues: (T | string)[]
  ) => {
    if (findItems) {
      const items = await findItems(searchValue);
      if (items.length > 0) {
        allValues.push(items[0]);
        onChange(allValues);
      }
      const indexOfSearchValue = localListOfItemsBeingSearched.indexOf(
        searchValue
      );
      localListOfItemsBeingSearched.splice(indexOfSearchValue, 1);
      setItemsBeingSearched([...localListOfItemsBeingSearched]);
      if (localListOfItemsBeingSearched.length <= 0) setLoading(false);
    }
  };

  const getExtendedOptionLabel = (option: T | string) => {
    return isString(option) ? option : getOptionLabel(option);
  };

  const renderTagsFunc: (
    values: (T | string)[],
    getTagProps: AutocompleteGetTagProps
  ) => React.ReactNode = (values, getTagProps) =>
    values.map((value, index) => {
      const bgColor = !isString(value)
        ? chipLookupSuccessColor
        : itemsBeingSearched.indexOf(value) >= 0
        ? chipLookupColor
        : chipLookupFailedColor;
      return (
        <Chip
          {...getTagProps({ index })}
          key={`autocomplete-key-${index}`}
          label={getExtendedOptionLabel(value)}
          style={{ backgroundColor: bgColor }}
          disabled={loading}
          color={bgColor === chipLookupColor ? 'default' : 'primary'}
        />
      );
    });

  const values = useMemo(() => [...value, ...itemsBeingSearched], [
    value,
    itemsBeingSearched,
  ]);

  return (
    <MuiAutocomplete
      multiple
      freeSolo
      options={options}
      getOptionLabel={getOptionLabel}
      value={values}
      onInputChange={handleInputChange}
      onBlur={handleBlur}
      onChange={handleChange}
      {...otherProps}
      renderTags={colored ? renderTagsFunc : undefined}
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
