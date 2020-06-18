import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    margin: theme.spacing(-2),
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    margin: theme.spacing(2),
  },
}));

export const ButtonBar: React.FC = (props) => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const classes = useStyles();
  const items = children.map((tempChild, index) => {
    const key = `button-bar-item-${index}`;
    return (
      <div key={key} className={classes.item}>
        {tempChild}
      </div>
    );
  });
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>{items}</div>
    </div>
  );
};
