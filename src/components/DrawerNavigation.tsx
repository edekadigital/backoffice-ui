import {
  makeStyles,
  Theme,
  createStyles,
  Hidden,
  Drawer,
  useTheme,
  Fab,
} from '@material-ui/core';
import * as React from 'react';
import { Close, Menu } from '../icons';

interface DrawerNavigationMenuItem<T> {
  label: string;
  value: T;
}

export type DrawerNavigationItem<T> =
  | DrawerNavigationMenuItem<T>
  | { label: string; items: Array<DrawerNavigationMenuItem<T>> };

export interface DrawerNavigationProps<T> {
  items: Array<DrawerNavigationItem<T>>;
  /**
   * The menu item to be selected and active.
   */
  /**
   * The link component to use. Default component is `button`
   * @default "button"
   */
  linkComponent?: React.ElementType;
  /**
   * Callback fired when a menu item is clicked.
   */
  onChange?: (event: React.ChangeEvent<{}>, value: T) => void;
  value?: T;
}

const drawerWidth = 256;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
      },
      padding: theme.spacing(4, 2, 4, 2),
    },
    drawerContent: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      },
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(4),
      left: theme.spacing(4),
      zIndex: 13000,
    },
  })
);

export function DrawerNavigation<T>(props: DrawerNavigationProps<T>) {
  const { items, linkComponent = 'button' } = props;
  const LinkComponent = linkComponent;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = React.useMemo(() => {
    if (!items || items.length < 1) return null;
    const renderLink = (item: DrawerNavigationMenuItem<T>) => (
      <LinkComponent to={item.value} value={item.value} label={item.label} />
    );
    return (
      <div className={classes.drawerContent}>
        {items.map((item) => {
          if ('items' in item) {
            <div style={{ color: 'red' }}>{item.label}</div>;
          } else {
            renderLink(item);
          }
        })}
      </div>
    );
  }, [items]);

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
        <Fab
          color={mobileOpen ? 'inherit' : 'primary'}
          className={classes.fab}
          onClick={handleDrawerToggle}
        >
          {mobileOpen ? <Close /> : <Menu />}
        </Fab>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
