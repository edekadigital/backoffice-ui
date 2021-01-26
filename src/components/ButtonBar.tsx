import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

export type ButtonBarAlign = 'left' | 'right';
export interface ButtonBarProps {
  /**
   * Aligns the items to the `left` or `right`.
   * @default "left"
   */
  align?: ButtonBarAlign;
}

const useStyles = makeStyles<Theme, ButtonBarProps>((theme) => ({
  root: {
    margin: theme.spacing(-2),
  },
  wrapper: ({ align = 'left' }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: align === 'right' ? 'flex-end' : 'initial',
  }),
  item: {
    margin: theme.spacing(2),
  },
}));

/**
 * | Test ID                                     | Description                                     |
 * | ------------------------------------------- | ----------------------------------------------- |
 * | `buttonBar-item-${index}`                   | Item in button bar                              |
 */
export const ButtonBar: React.FC<ButtonBarProps> = (props) => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const classes = useStyles(props);
  const items = children.map((tempChild, index) => {
    const key = `button-bar-item-${index}`;
    return (
      <div
        key={key}
        className={classes.item}
        data-testid={`buttonBar-item-${index}`}
      >
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
