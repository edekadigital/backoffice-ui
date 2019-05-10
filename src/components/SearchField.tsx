import * as React from 'react';
import {
  Paper as MuiPaper,
  InputBase as MuiInputBase,
  IconButton as MuiIconButton,
} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Search } from '../icons';

export interface SearchFieldProps {
  placeholder: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

const searchFieldStyles = () =>
  createStyles({
    form: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  });

const SearchFieldComponent: React.FC<SearchFieldProps & WithStyles> = props => {
  const { placeholder, classes, onChange, onSubmit } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  const handleFormSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit(inputRef!.current!.value);
      }
    },
    [onSubmit]
  );

  return (
    <MuiPaper elevation={1}>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <MuiInputBase
          className={classes.input}
          placeholder={placeholder}
          inputRef={inputRef}
          onChange={handleInputChange}
        />
        <MuiIconButton
          className={classes.iconButton}
          aria-label={placeholder}
          type="submit"
        >
          <Search />
        </MuiIconButton>
      </form>
    </MuiPaper>
  );
};

export const SearchField = withStyles(searchFieldStyles)(SearchFieldComponent);
