import * as React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Theme, makeStyles, SvgIconProps } from '@material-ui/core';
import clsx from 'clsx';

// "colorTransparent" key is missing in type definition for AppBar prop "classes"
type AppBarClasses = never;

export interface AppBarActionItem {
  icon: React.ElementType<SvgIconProps>;
  handler: React.MouseEventHandler<HTMLElement>;
}

export interface AppBarActionMenuItem extends AppBarActionItem {
  label: string;
}

export interface AppBarActionMenu {
  icon: React.ElementType<SvgIconProps>;
  menuType: 'list' | 'grid';
  items: AppBarActionMenuItem[];
}

export type AppBarActions = (AppBarActionItem | AppBarActionMenu)[];

export interface AppBarProps {
  /**
   * Action icon buttons and its handlers
   */
  actions?: AppBarActions;
  color?: 'default' | 'primary' | 'transparent';
  children: React.ReactNode;
  /**
   * If `true`, the app bar will have a bottom margin.
   */
  gutterBottom?: boolean;
}

const useStyles = makeStyles<Theme, AppBarProps>((theme) => ({
  root: ({ gutterBottom }) => ({
    marginBottom: theme.spacing(gutterBottom ? 3 : 0),
  }),
  grow: {
    flexGrow: 1,
  },
}));

const useAppBarStyles = makeStyles((theme) => ({
  colorTransparent: {
    color: theme.palette.primary.main,
  },
}));

export const AppBar: React.FC<AppBarProps> = (props) => {
  const { actions = [], children, color } = props;

  const [activeMenu, setActiveMenu] = React.useState<{
    anchorEl: HTMLElement;
    index: number;
  } | null>(null);

  const classes = useStyles(props);
  const appBarClasses = useAppBarStyles();

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const actionItems = actions.map((tempAction, index) => {
    const {
      handler = (event: React.MouseEvent<HTMLElement>) =>
        setActiveMenu((prev) =>
          prev && prev.index === index
            ? null
            : { index, anchorEl: event.currentTarget }
        ),
      icon,
    } = tempAction as AppBarActionItem;

    const IconComponent = icon;

    return (
      <div key={`action-item-${index}`}>
        <MuiIconButton color="inherit" onClick={handler}>
          <IconComponent fontSize="small" />
        </MuiIconButton>
      </div>
    );
  });

  const actionMenus = actions.map((tempAction, actionIndex) => {
    if ('menuType' in tempAction) {
      const action = tempAction as AppBarActionMenu;

      const isMenuOpen =
        activeMenu !== null && activeMenu.index === actionIndex;
      const { anchorEl } = activeMenu || {};
      const key = `app-bar-action-menu-${actionIndex}`;

      const items = action.items.map((tempItem, itemIndex) => {
        const key = `app-bar-action-item-${actionIndex}-${itemIndex}`;

        const IconComponent = tempItem.icon;

        const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
          tempItem.handler(event);
          closeMenu();
        };

        return (
          <MuiMenuItem onClick={handleClick} key={key} data-testid={key}>
            <MuiListItemIcon>
              <IconComponent fontSize="small" />
            </MuiListItemIcon>
            <MuiListItemText primary={tempItem.label} />
          </MuiMenuItem>
        );
      });

      return (
        <MuiMenu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted={true}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          getContentAnchorEl={null}
          open={isMenuOpen}
          onClose={closeMenu}
          key={key}
          data-testid={key}
        >
          {items}
        </MuiMenu>
      );
    } else {
      return null;
    }
  });

  return (
    <div className={clsx(classes.root, classes.grow)}>
      <MuiAppBar
        position="static"
        color={color}
        elevation={0}
        classes={appBarClasses as AppBarClasses}
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            className={classes.title}
            data-testid="appBar-title"
          >
            {children}
          </Typography>
          <div className={classes.grow}></div>
          {actionItems}
          {actionMenus}
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};
