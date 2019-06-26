import * as React from 'react';
import {
  Paper as MuiPaper,
  InputBase as MuiInputBase,
  IconButton as MuiIconButton,
  LinearProgress as MuiLinearProgress,
} from '@material-ui/core';
import { Search } from '../icons';
import { makeStyles } from '@material-ui/styles';

export interface SearchFieldProps {
  placeholder: string;
  progress?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

const useStyles = makeStyles({
  paper: {
    position: 'relative',
    overflow: 'hidden',
  },
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
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
});

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
    <MuiPaper elevation={1} className={classes.paper}>
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
      {progressBar}
    </MuiPaper>
  );
};
