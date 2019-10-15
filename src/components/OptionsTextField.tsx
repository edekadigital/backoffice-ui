import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, TextFieldValue, TextFieldType } from './TextField';
import { Typography, Popover } from '@material-ui/core';

// Very similar to TextFieldProps, but the onChange function is decoupled from DOMEvents (tradeoff = loss of information)
export interface OptionsTextFieldProps {
  label: string;
  placeholder?: string;
  type?: TextFieldType;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  autoComplete?: string;
  defaultValue?: TextFieldValue;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: TextFieldValue;
  onChange?: (value: TextFieldValue) => void;
  options: TextFieldValue[];
  maxOptionsHeight?: number;
  searchableOptions?: boolean;
}

export const OptionsTextField: React.FC<OptionsTextFieldProps> = props => {
  const [value, setValue] = React.useState<TextFieldValue>(
    props.defaultValue != null ? props.defaultValue : ''
  );
  const [query, setQuery] = React.useState<string>('');
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );
  const [
    inputElement,
    setInputElement,
  ] = React.useState<null | HTMLInputElement>(null);
  const {
    onChange,
    maxOptionsHeight,
    searchableOptions,
    ...additionalProps
  } = props;
  const isMenuOpen = Boolean(anchorElement);

  const optionsQueryResult = props.options.filter(option =>
    option
      .toString()
      .toLowerCase()
      .startsWith(query.toLowerCase())
  );

  // Handle selection / menu closed
  const handleSelected = (newValue: TextFieldValue | null) => {
    setAnchorElement(null);
    if (newValue !== null && value !== newValue) {
      setValue(newValue);
      setQuery(newValue.toString());
      if (onChange != null) {
        onChange(newValue);
      }
    } else {
      setQuery(value != null ? value.toString() : '');
    }
  };

  // Always select entire input, so it cannot be changed one character at a time
  if (!props.disabled && inputElement != null && !isMenuOpen) {
    // Should happen after updating the value
    setTimeout(() => {
      inputElement.setSelectionRange(0, value.toString().length);
    }, 0);
  }

  // Don't open menu for disabled OptionsTextField
  if (props.disabled && anchorElement != null) {
    setAnchorElement(null);
  }

  const options =
    optionsQueryResult.length > 0 ? (
      optionsQueryResult.map(option => {
        const onClickHandler = (event: React.MouseEvent) =>
          handleSelected(option);
        return (
          <MenuItem
            onClick={onClickHandler}
            key={option}
            selected={value === option}
          >
            <Typography>{option}</Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem disabled={true} key={undefined} />
    ); // ...or one empty option

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleOnClose = (event: React.SyntheticEvent) => {
    handleSelected(null);
  };

  const getOptionsSearchField = () => {
    return searchableOptions ? (
      <TextField
        label=""
        placeholder={props.label}
        type="search"
        value={query}
        onChange={handleOnChange}
      />
    ) : (
      <span />
    ); // No search field
  };

  const menu = (
    <Popover
      anchorEl={anchorElement}
      keepMounted={true}
      open={isMenuOpen}
      onClose={handleOnClose}
    >
      {getOptionsSearchField()}
      <div
        style={
          maxOptionsHeight != null
            ? { maxHeight: maxOptionsHeight, overflow: 'scroll' }
            : {}
        }
      >
        {options}
      </div>
    </Popover>
  );

  const handleInputOnKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.keyCode === 8) {
      setValue('');
      setQuery('');
    }
  };

  const handleInputOnClick = (event: React.MouseEvent) => {
    if (optionsQueryResult.length === 0) {
      setQuery('');
    }
    setAnchorElement(event.currentTarget as HTMLElement);
    setInputElement(event.target as HTMLInputElement);
  };

  return (
    <span>
      <span onClick={handleInputOnClick} onKeyDown={handleInputOnKeyDown}>
        <TextField {...additionalProps} value={value} />
      </span>
      <span aria-haspopup="true" />
      {menu}
    </span>
  );
};
