import * as React from 'react';
import {
  List as MuiList,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  SvgIconProps,
} from '@material-ui/core';
import { Image } from './Image';
import { Divider, IconButton } from '..';
import { Delete } from '../icons';

export interface ListActionItem {
  icon: React.ElementType<SvgIconProps>;
  handler: (clickedRow: any) => void;
}

export interface ListItem {
  text?: string;
  subText?: string;
  bullet?: React.ReactElement;
}

export interface ListProps {
  items?: ListItem;
  action?: Array<ListActionItem>;
}

const item = {
  text: 'ListItem',
  subText: 'Subtext of ListItem',
  bullet: (
    <div style={{ paddingRight: '15px' }}>
      <Image
        mode="scale-down"
        src="https://via.placeholder.com/61x34/000000/404040"
        alt="Some alt text"
      />
    </div>
  ),
};
export const List: React.VFC<ListProps> = () => {
  return (
    <MuiList dense={true}>
      <Divider />
      <ListItem>
        <ListItemAvatar>{item.bullet}</ListItemAvatar>
        <ListItemText primary={item.text} secondary={item.subText} />
        <ListItemSecondaryAction>
          <IconButton icon={Delete} onClick={(e) => console.log(e)} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </MuiList>
  );
};

/**
 *  <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
 */
