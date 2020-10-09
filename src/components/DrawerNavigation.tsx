import {
  makeStyles,
  Theme,
  createStyles,
  Hidden,
  Drawer,
  Fab,
  ListItem,
  List,
  Typography,
  SvgIconProps,
  ListItemText,
} from '@material-ui/core';
import * as React from 'react';
import { Close, Menu } from '../icons';

interface DrawerNavigationMenuItem<T> {
  label: string;
  value: T;
  icon?: React.ElementType<SvgIconProps>;
}

export type DrawerNavigationItem<T> =
  | DrawerNavigationMenuItem<T>
  | { label: string; items: Array<DrawerNavigationMenuItem<T>> };

export interface DrawerNavigationProps<T> {
  /**
   * The elements (children) to be rendered next to the navigation
   */
  children?: React.ReactNode;
  /**
   * The menu items to show
   */
  items: Array<DrawerNavigationItem<T>>;
  /**
   * The link component to use. Default component is `button`
   * You can provide a routers link component, e.g. if you use reach router
   * @default "button"
   */
  linkComponent?: React.ElementType;
  /**
   * Callback fired when a menu item is clicked.
   * Only use this if you do not want to use a router (e.g. reach) and want to use an external react state instead
   */
  onChange?: (event: React.ChangeEvent<{}>, value: T) => void;
  /**
   * The menu item to be selected and active.
   */
  value: T;
}

const drawerWidth = 256;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: '75%',
      padding: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        padding: theme.spacing(12, 2, 4, 2),
      },
    },
    navList: {
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    navListItem: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: -theme.spacing(2),
        paddingLeft: theme.spacing(2),
        width: `calc(100% + ${theme.spacing(4)}px)`,
      },
    },
    navListItemActive: {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent!important',
    },
    navListSubContainer: {
      ['&:not(:first-child)']: {
        marginTop: theme.spacing(4),
      },
    },
    navIcon: {
      marginRight: theme.spacing(1),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(4),
      left: theme.spacing(4),
      zIndex: theme.zIndex.modal + 1,
    },
    content: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
      },
    },
  })
);

/**
 * | Test ID                                    | Description                                                |
 * | ------------------------------------------ | ---------------------------------------------------------- |
 * | `drawerNavigation-drawer`                  | navigation drawer container for large viewports            |
 * | `drawerNavigation-mobileDrawer`            | navigation drawer container for mobile viewports           |
 * | `drawerNavigation-mobileMenuButton`        | button to toggle the navigation drawer on mobile viewports |
 * | `drawerNavigation-list`                    | navigation items list wrapper                              |
 * | `drawerNavigation-linkItem-${index}`       | link item                                                  |
 * | `drawerNavigation-linkItem-${index}-icon`  | icon of link item                                          |
 * | `drawerNavigation-linkItem-${index}-label` | label of link item                                         |
 * | `drawerNavigation-subLabel-${index}`       | label (title) of a given link subgroup                     |
 */
export function DrawerNavigation<T>(props: DrawerNavigationProps<T>) {
  const { children, items, linkComponent = 'button', value, onChange } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (e: React.ChangeEvent, val: T) => {
    onChange && onChange(e, val);
    setMobileOpen(false);
  };

  const drawer = React.useMemo(() => {
    const renderLink = (
      item: DrawerNavigationMenuItem<T>,
      index: number | string
    ) => (
      <ListItem
        classes={{
          button: classes.navListItem,
          selected: classes.navListItemActive,
        }}
        selected={value === item.value}
        button={true}
        key={index}
        component={linkComponent}
        href={!onChange ? item.value : null}
        to={!onChange ? item.value : null}
        onClick={(e: React.ChangeEvent) => handleItemClick(e, item.value)}
        disableGutters
        data-testid={`drawerNavigation-linkItem-${index}`}
      >
        {item.icon ? (
          <item.icon
            fontSize="small"
            className={classes.navIcon}
            data-testid={`drawerNavigation-linkItem-${index}-icon`}
          />
        ) : null}
        <ListItemText
          primary={item.label}
          data-testid={`drawerNavigation-linkItem-${index}-label`}
        />
      </ListItem>
    );
    return (
      <List
        className={classes.navList}
        data-testid="drawerNavigation-list"
        disablePadding
      >
        {items.map((item, index) => {
          if ('items' in item) {
            return (
              <div key={index} className={classes.navListSubContainer}>
                <Typography
                  variant={'overline'}
                  color={'textSecondary'}
                  data-testid={`drawerNavigation-subLabel-${index}`}
                >
                  {item.label}
                </Typography>
                {item.items.map((subItem, subIndex) =>
                  renderLink(subItem, `${index}-${subIndex}`)
                )}
              </div>
            );
          } else {
            return renderLink(item, index);
          }
        })}
      </List>
    );
  }, [items]);

  return (
    <>
      <Hidden smUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          data-testid="drawerNavigation-mobileDrawer"
        >
          {drawer}
        </Drawer>
        <Fab
          color={mobileOpen ? 'inherit' : 'primary'}
          className={classes.fab}
          onClick={handleDrawerToggle}
          data-testid="drawerNavigation-mobileMenuButton"
        >
          {mobileOpen ? <Close /> : <Menu />}
        </Fab>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
          data-testid="drawerNavigation-drawer"
        >
          {drawer}
        </Drawer>
      </Hidden>
      <div className={classes.content}>{children}</div>
    </>
  );
}
