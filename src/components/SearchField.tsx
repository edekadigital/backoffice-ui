import * as React from 'react';
import {
  IconButton as MuiIconButton,
  LinearProgress as MuiLinearProgress,
} from '@material-ui/core';
import { Search } from '../icons';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { TextField } from './TextField';

export interface SearchFieldProps {
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: string;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: (value: string) => void;
  /**
   * Callback fired when the form is submitted.
   */
  onSubmit?: (value: string) => void;
  /**
   * If `true`, the progress bar will be visible.
   */
  progress?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    left: 0,
    width: '100%',
    marginTop: -theme.spacing(0.5),
  },
}));

/**
 * | Test ID               | Description          |
 * | --------------------- | -------------------- |
 * | `searchField-input`   | Input field          |
 * | `searchField-submit`  | Submit button        |
 */
export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  progress,
  onChange,
  onSubmit,
}) => {
  const classes = useStyles();
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

  const progressBar = progress ? (
    <MuiLinearProgress className={classes.progress} />
  ) : null;

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        disabled={progress}
        placeholder={placeholder}
        inputRef={inputRef}
        onChange={handleInputChange}
        inputTestId={'searchField-input'}
        endAdornment={
          <MuiIconButton
            aria-label={placeholder}
            type="submit"
            disabled={progress}
            data-testid="searchField-submit"
          >
            <Search />
          </MuiIconButton>
        }
      />
      {progressBar}
    </form>
  );
};
