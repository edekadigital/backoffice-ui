import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../components/Button';
import { ButtonBar } from '../components/ButtonBar';

export type FormWrapperHandler = () => void;

export interface FormWrapperProps {
  /**
   * The label text of the submit button.
   */
  submitLabel: string;
  /**
   * The label text of the cancel button.
   */
  cancelLabel?: string;
  /**
   * Callback fired when the form is submitted.
   */
  onSubmit: FormWrapperHandler;
  /**
   * Callback fired when the cancel button is clicked.
   */
  onCancel?: FormWrapperHandler;
}

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values['md'],
  },
  content: {
    marginBottom: theme.spacing(3),
  },
}));

/**
 * | Test ID             | Description              |
 * | ------------------- | ------------------------ |
 * | `formWrapper-form`  | container                |
 * | `formWrapper-cancel`| cancel button            |
 * | `formWrapper-submit`| submit button            |
 */
export const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  const { children, submitLabel, cancelLabel, onSubmit, onCancel } = props;

  const classes = useStyles();

  const internalOnSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const cancelButton = React.useMemo(
    () =>
      cancelLabel && onCancel ? (
        <Button
          variant="text"
          onClick={onCancel}
          data-testid="formWrapper-cancel"
        >
          {cancelLabel}
        </Button>
      ) : null,
    [cancelLabel, onCancel]
  );

  return (
    <form
      onSubmit={internalOnSubmit}
      className={classes.root}
      data-testid="formWrapper-form"
    >
      <div className={classes.content}>{children}</div>
      <ButtonBar>
        <Button type="submit" data-testid="formWrapper-submit">
          {submitLabel}
        </Button>
        {cancelButton}
      </ButtonBar>
    </form>
  );
};
