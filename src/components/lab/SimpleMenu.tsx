import * as React from 'react';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu as MuiMenu, MenuProps, Theme } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '../IconButton';
import { ArrowDropDown } from '../../icons';

// WIP

export interface MenuItemAction {
  label: string;
  action: () => void;
}

interface SimpleMenuProps {
  items: MenuItemAction[];
}

export const SimpleMenu: React.FC<SimpleMenuProps> = props => {
  const { items } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({})((props: MenuProps) => (
    <MuiMenu
      elevation={5}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      {...props}
    />
  ));

  const renderedItems = items.map((item: MenuItemAction, index) => (
    <MenuItem key={`menu-item-${index}`} onClick={item.action}>
      {item.label}
    </MenuItem>
  ));

  return (
    <div>
      <div>
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ip
        <IconButton icon={ArrowDropDown} onClick={handleClick} />
      </div>
      <StyledMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {renderedItems}
      </StyledMenu>
    </div>
  );
};
