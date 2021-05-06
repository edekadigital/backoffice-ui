import * as React from 'react';
import {
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  SvgIconProps,
  Theme,
} from '@material-ui/core';
import { IconButton } from '..';

export interface ListActionItem {
  icon: React.ElementType<SvgIconProps>;
  handler: (e: React.MouseEvent, id: string | undefined) => void;
}

export interface ListItem {
  text?: React.ReactElement | string;
  subText?: React.ReactElement | string;
  bullet?: React.ReactElement;
  id?: string;
  disabled?: boolean;
  action?: ListActionItem;
}

const useListBulletStyles = makeStyles((theme: Theme) => ({
  root: { marginRight: theme.spacing(2) },
}));

export const ListItem: React.VFC<ListItem> = (props) => {
  const { text, subText, bullet, id, action, disabled = false } = props;
  const bulletStyles = useListBulletStyles();
  return (
    <MuiListItem divider={true} disabled={disabled}>
      {bullet && (
        <ListItemAvatar classes={bulletStyles}>{bullet}</ListItemAvatar>
      )}
      <ListItemText primary={text} secondary={subText} />
      {action && (
        <ListItemSecondaryAction>
          <IconButton
            icon={action?.icon}
            onClick={(e: React.MouseEvent) => action?.handler(e, id)}
            disabled={disabled}
          />
        </ListItemSecondaryAction>
      )}
    </MuiListItem>
  );
};
