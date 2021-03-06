import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

export type ButtonBarAlign = 'left' | 'right' | 'center';
export interface ButtonBarProps {
  /**
   * Aligns the items to the `left`, `right` or `center`.
   * @default "left"
   */
  align?: ButtonBarAlign;
}

const useStyles = makeStyles<Theme, ButtonBarProps>((theme) => ({
  root: {
    margin: theme.spacing(-2),
  },
  wrapper: ({ align = 'left' }) => {
    let justify;
    switch (align) {
      case 'center':
        justify = 'center';
        break;
      case 'right':
        justify = 'flex-end';
        break;
      default:
        justify = 'initial';
    }
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: justify,
    };
  },
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
