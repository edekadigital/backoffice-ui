import * as React from 'react';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { makeStyles, Theme, fade } from '@material-ui/core/styles';

export interface CheckboxProps {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate?: boolean;
  /**
   * If set to `true` the colors of the checkbox are inverted.
   * This might be helpful e.g. if the checkbox is being placed on a dark background.
   */
  inverted?: boolean;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  /**
   * If `true`, the `input` element will be required.
   */
  required?: boolean;
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value?: unknown;
}

const useStyles = makeStyles<Theme, CheckboxProps>((theme: Theme) => ({
  root: ({ inverted }) => ({
    color: inverted
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    '&.Mui-checked': {
      color: inverted
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
    },
    '&:hover, &.Mui-checked:hover': {
      backgroundColor: inverted
        ? fade(theme.palette.primary.contrastText, 0.04)
        : fade(theme.palette.primary.main, 0.04),
    },
  }),
}));

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { inverted, ...additionalProps } = props;
  const classes = useStyles({ inverted });
  return (
    <MuiCheckbox classes={classes} color={'primary'} {...additionalProps} />
  );
};
