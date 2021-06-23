import * as React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Theme,
  makeStyles,
  SvgIconProps,
  PopoverOrigin,
} from '@material-ui/core';
import clsx from 'clsx';
import { ServiceIcon } from './internal';
import { ListMenu } from '..';

// "colorTransparent" key is missing in type definition for AppBar prop "classes"
type AppBarClasses = never;

export interface AppBarActionItem {
  icon: React.ElementType<SvgIconProps>;
  handler: React.MouseEventHandler<HTMLElement>;
}

export interface AppBarActionListMenuItem extends AppBarActionItem {
  label: string;
}

export interface AppBarActionGridMenuItem
  extends Omit<AppBarActionItem, 'icon'> {
  icon: React.ElementType<SvgIconProps> | string;
  label: string;
}

export interface AppBarActionListMenu {
  icon: React.ElementType<SvgIconProps>;
  menuType: 'list';
  items: AppBarActionListMenuItem[];
}

export interface AppBarActionGridMenu {
  icon: React.ElementType<SvgIconProps>;
  menuType: 'grid';
  items: AppBarActionGridMenuItem[];
}

export type AppBarActions = (
  | AppBarActionItem
  | AppBarActionListMenu
  | AppBarActionGridMenu
)[];

interface AppBarActionListMenuProps {
  index: number;
  items: AppBarActionListMenuItem[];
  open: boolean;
  anchorEl?: HTMLElement;
  onClose: Function;
}

interface AppBarActionGridMenuProps {
  index: number;
  items: AppBarActionGridMenuItem[];
  open: boolean;
  anchorEl?: HTMLElement;
  onClose: Function;
}

export interface AppBarProps {
  /**
   * Action icon buttons and its handlers
   * @default []
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
    marginBottom: theme.spacing(gutterBottom ? 4 : 0),
    zIndex: theme.zIndex.drawer + 1,
    position: 'relative',
    top: 0,
    '&.sticky': {
      position: 'sticky',
    },
  }),
  grow: {
    flexGrow: 1,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const useAppBarStyles = makeStyles((theme) => ({
  colorTransparent: {
    color: theme.palette.primary.main,
  },
}));

const useGridMenuStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 280,
    maxHeight: 380,
    marginTop: theme.spacing(1),
  },
  list: {
    width: 280,
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
}));

const useGridMenuItemStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1, 1, 1),
    flex: '0 0 auto',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
  },
}));

const useGridMenuIconStyles = makeStyles((theme) => ({
  root: {
    transition: theme.transitions.create('border-color'),
    ['.MuiListItem-button:hover &']: {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const useGridMenuTextStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    whiteSpace: 'normal',
    width: '100%',
  },
}));

const AppBarGridMenu: React.FC<AppBarActionGridMenuProps> = ({
  index,
  items,
  open,
  anchorEl,
  onClose,
}) => {
  const menuClasses = useGridMenuStyles();
  const itemClasses = useGridMenuItemStyles();
  const serviceIconClasses = useGridMenuIconStyles();
  const textClasses = useGridMenuTextStyles();

  const renderItems = items.map((tempItem, itemIndex) => {
    const key = `appBar-menuItem-${index}-${itemIndex}`;

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
        <ServiceIcon
          icon={tempItem.icon}
          className={serviceIconClasses.root}
          iconTestId={`${key}-serviceIcon`}
        />
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

/**
 * | Test ID                                                  | Description                               |
 * | -------------------------------------------------------- | ----------------------------------------- |
 * | `appBar-title`                                           | App bar title                             |
 * | `appBar-actionItem-${index}`                             | App bar action icon button                |
 * | `appBar-menuItem-${index}-${itemIndex}`                  | App bar menu item in action grid menu     |
 */
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
        setActiveMenu({ index, anchorEl: event.currentTarget }),
      icon,
    } = tempAction as AppBarActionItem;

    const IconComponent = icon;
    const key = `appBar-actionItem-${index}`;

    return (
      <MuiIconButton
        color="inherit"
        onClick={handler}
        key={key}
        data-testid={key}
      >
        <IconComponent fontSize="small" />
      </MuiIconButton>
    );
  });

  const actionMenus = actions.map((tempAction, index) => {
    if ('menuType' in tempAction) {
      const anchorEl = activeMenu?.anchorEl;
      const open = activeMenu?.index === index;
      const key = `appBar-actionMenu-${index}`;
      switch (tempAction.menuType) {
        case 'grid':
          return (
            <AppBarGridMenu
              index={index}
              items={tempAction.items}
              anchorEl={anchorEl}
              open={open}
              key={key}
              onClose={closeMenu}
            />
          );
        case 'list':
        default:
          return (
            <ListMenu
              index={index}
              items={tempAction.items}
              anchorEl={anchorEl}
              open={open}
              key={key}
              onClose={closeMenu}
            />
          );
      }
    } else {
      return null;
    }
  });

  return (
    <div className={clsx(classes.root, 'sticky', classes.grow)}>
      <MuiAppBar
        position="relative"
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
