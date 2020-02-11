import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

export interface FormFieldSetProps {
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: theme.breakpoints.values['md'],
    '& + &': {
      marginTop: theme.spacing(4),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));

export const FormFieldSet: React.FC<FormFieldSetProps> = ({
  title,
  children,
}) => {
  const classes = useStyles();

  const renderedTitle = React.useMemo(
    () =>
      title ? (
        <Typography
          className={classes.title}
          component="div"
          variant="h5"
          data-testid="formFieldSet-title"
        >
          <strong>{title}</strong>
        </Typography>
      ) : null,
    [title]
  );

  return (
    <Paper role="group" className={classes.root}>
      {renderedTitle}
      {children}
    </Paper>
  );
};