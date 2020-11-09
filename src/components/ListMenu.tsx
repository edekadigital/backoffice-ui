import * as React from 'react';
import { makeStyles, SvgIconProps, Theme } from '@material-ui/core';
import {
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
} from '@material-ui/core';

export interface ListMenuItem {
  icon?: React.ElementType<SvgIconProps>;
  label?: string;
  handler: React.MouseEventHandler<HTMLElement>;
}

export interface ListMenuProps {
  /**
   * Referenced element used to set the position of the menu
   */
  anchorEl?: HTMLElement | null;
  /**
   * Optional index counter
   */
  index?: number;
  /**
   * The menu items to show
   */
  items: ListMenuItem[];
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose: () => void;
  /**
   * If `true`, the menu is visible.
   */
  open: boolean;
}

const useMenuStyles = makeStyles<Theme>((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
  },
  iconStyles: {
    minWidth: theme.spacing(4.5),
  },
}));

/**
 * | Test ID                                                            | Description                               |
 * | ------------------------------------------------------------------ | ----------------------------------------- |
 * | `listMenu` (or `listMenu-${index}`)                                | List Menu container                       |
 * | `listMenu-menuItem-${itemIndex}` (`listMenu-menuItem-${itemIndex}`)| Menu item                                 |
 */
export const ListMenu: React.FC<ListMenuProps> = ({
  items,
  index,
  open,
  anchorEl,
  onClose,
}) => {
  const classes = useMenuStyles();
  const renderIcon = (item: ListMenuItem) => {
    if (item.icon) {
      const IconComponent = item.icon;
      return (
        <MuiListItemIcon classes={{ root: classes.iconStyles }}>
          <IconComponent fontSize="small" />
        </MuiListItemIcon>
      );
    } else return null;
  };

  const renderItems = items.map((tempItem, itemIndex) => {
    const key =
      index !== undefined
        ? `listMenu-menuItem-${index}-${itemIndex}`
        : `listMenu-menuItem-${itemIndex}`;
    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      tempItem.handler(event);
      onClose();
    };

    return (
      <MuiMenuItem onClick={handleClick} key={key} data-testid={key}>
        {renderIcon(tempItem)}
        <MuiListItemText primary={tempItem.label} />
      </MuiMenuItem>
    );
  });

  return (
    <MuiMenu
      classes={{ paper: classes.paper }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      keepMounted={true}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      getContentAnchorEl={null}
      open={open}
      onClose={() => onClose()}
      data-testid={index !== undefined ? `listMenu-${index}` : 'listMenu'}
    >
      {renderItems}
    </MuiMenu>
  );
};
