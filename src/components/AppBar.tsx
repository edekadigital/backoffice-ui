import * as React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Theme,
  makeStyles,
  SvgIconProps,
  PopoverOrigin,
} from '@material-ui/core';
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

interface AppBarMenuProps {
  index: number;
  items: AppBarActionMenuItem[];
  open: boolean;
  anchorEl?: HTMLElement;
  onClose: Function;
}

export interface AppBarProps {
  /**
   * Action icon buttons and its handlers
   */
  actions?: AppBarActions;
  /**
   * The background color of the app bar. It supports those theme colors that make sense for this component.
   */
  color?: 'default' | 'primary' | 'transparent';
  /**
   * If `true`, the app bar will have a bottom margin.
   */
  gutterBottom?: boolean;
}

const anchorOrigin: PopoverOrigin = { vertical: 'bottom', horizontal: 'right' };
const transformOrigin: PopoverOrigin = { vertical: 'top', horizontal: 'right' };

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

const useListMenuIconStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.spacing(4.5),
  },
}));

const useGridMenuStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 280,
    maxHeight: 380,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
}));

const useGridMenuItemStyles = makeStyles((theme) => ({
  root: {
    flex: '0 0 50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
  },
}));

const useGridMenuIconStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(1),
    minWidth: 0,
    borderWidth: 1,
    borderColor: theme.palette.grey[300],
    borderStyle: 'solid',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('border-color'),
    ['.MuiListItem-button:hover &']: {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const useGridMenuTextStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    whiteSpace: 'normal',
  },
}));

const AppBarListMenu: React.FC<AppBarMenuProps> = ({
  index,
  items,
  open,
  anchorEl,
  onClose,
}) => {
  const iconClasses = useListMenuIconStyles();

  const renderItems = items.map((tempItem, itemIndex) => {
    const key = `app-bar-menu-item-${index}-${itemIndex}`;

    const IconComponent = tempItem.icon;

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      tempItem.handler(event);
      onClose();
    };

    return (
      <MuiMenuItem onClick={handleClick} key={key} data-testid={key}>
        <MuiListItemIcon classes={iconClasses}>
          <IconComponent fontSize="small" />
        </MuiListItemIcon>
        <MuiListItemText primary={tempItem.label} />
      </MuiMenuItem>
    );
  });

  return (
    <MuiMenu
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      keepMounted={true}
      transformOrigin={transformOrigin}
      getContentAnchorEl={null}
      open={open}
      onClose={() => onClose()}
    >
      {renderItems}
    </MuiMenu>
  );
};

const AppBarGridMenu: React.FC<AppBarMenuProps> = ({
  index,
  items,
  open,
  anchorEl,
  onClose,
}) => {
  const menuClasses = useGridMenuStyles();
  const itemClasses = useGridMenuItemStyles();
  const iconClasses = useGridMenuIconStyles();
  const textClasses = useGridMenuTextStyles();

  const renderItems = items.map((tempItem, itemIndex) => {
    const key = `app-bar-menu-item-${index}-${itemIndex}`;

    const IconComponent = tempItem.icon;

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      tempItem.handler(event);
      onClose();
    };

    return (
      <MuiMenuItem
        onClick={handleClick}
        key={key}
        data-testid={key}
        classes={itemClasses}
      >
        <MuiListItemIcon classes={iconClasses}>
          <IconComponent fontSize="small" color="primary" />
        </MuiListItemIcon>
        <Typography variant="caption" align="center" classes={textClasses}>
          {tempItem.label}
        </Typography>
      </MuiMenuItem>
    );
  });

  return (
    <MuiMenu
      classes={menuClasses}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      keepMounted={true}
      transformOrigin={transformOrigin}
      getContentAnchorEl={null}
      open={open}
      onClose={() => onClose()}
    >
      {renderItems}
    </MuiMenu>
  );
};

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

  const actionMenus = actions.map((tempAction, index) => {
    if ('menuType' in tempAction) {
      const action = tempAction as AppBarActionMenu;
      const { items } = action;
      const anchorEl = activeMenu?.anchorEl;
      const open = activeMenu?.index === index;
      const key = `app-bar-action-menu-${index}`;
      switch (action.menuType) {
        case 'list':
          return (
            <AppBarListMenu
              index={index}
              items={items}
              anchorEl={anchorEl}
              open={open}
              key={key}
              onClose={closeMenu}
            />
          );
        case 'grid':
          return (
            <AppBarGridMenu
              index={index}
              items={items}
              anchorEl={anchorEl}
              open={open}
              key={key}
              onClose={closeMenu}
            />
          );
        default:
          return null;
      }
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
