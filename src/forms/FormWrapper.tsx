import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../components/Button';
import { ButtonBar } from '../components/ButtonBar';

export type FormWrapperHandler = () => void;

export interface FormWrapperProps {
  submitLabel: string;
  cancelLabel: string;
  onSubmit: FormWrapperHandler;
  onCancel: FormWrapperHandler;
}

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: theme.breakpoints.values['md'],
  },
  content: {
    marginBottom: theme.spacing(3),
  },
}));

export const FormWrapper: React.FC<FormWrapperProps> = props => {
  const { children, submitLabel, cancelLabel, onSubmit, onCancel } = props;

  const classes = useStyles();

  const internalOnSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <form onSubmit={internalOnSubmit} className={classes.root}>
      <div className={classes.content}>{children}</div>
      <ButtonBar>
        <Button type="submit">{submitLabel}</Button>
        <Button variant="text" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </ButtonBar>
    </form>
  );
};
