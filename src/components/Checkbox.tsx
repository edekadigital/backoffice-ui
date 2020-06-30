import * as React from 'react';
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@material-ui/core/Checkbox';
import { makeStyles, Theme } from '@material-ui/core/styles';

export interface CheckboxProps
  extends Pick<
    MuiCheckboxProps,
    | 'checked'
    | 'disabled'
    | 'id'
    | 'inputRef'
    | 'inputProps'
    | 'onChange'
    | 'required'
    | 'value'
  > {
  /**
   * If set to `true` the colors of the checkbox are inverted.
   * This might be helpful e.g. if the checkbox is being placed on a dark background.
   */
  inverted?: boolean;
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
  }),
}));

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { inverted = false, ...additionalProps } = props;
  const classes = useStyles({ inverted });
  return <MuiCheckbox classes={classes} {...additionalProps} />;
};
