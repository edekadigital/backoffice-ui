import {
  makeStyles,
  Theme,
  createStyles,
  Hidden,
  Drawer,
  useTheme,
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
   * The menu items to show
   */
  items: Array<DrawerNavigationItem<T>>;
  /**
   * The link component to use. Default component is `button`
   * @default "button"
   */
  linkComponent?: React.ElementType;
  /**
   * Callback fired when a menu item is clicked.
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
        padding: theme.spacing(4, 2, 4, 2),
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
      position: 'absolute',
      bottom: theme.spacing(4),
      left: theme.spacing(4),
      zIndex: 13000,
    },
  })
);

export function DrawerNavigation<T>(props: DrawerNavigationProps<T>) {
  const { items, linkComponent = 'button', value, onChange } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (e: React.ChangeEvent, val: T) => {
    onChange && onChange(e, val);
    setMobileOpen(false);
  };

  const drawer = React.useMemo(() => {
    if (!items || items.length < 1) return null;
    const renderLink = (item: DrawerNavigationMenuItem<T>, index: number) => (
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
      >
        {item.icon ? (
          <item.icon fontSize="small" className={classes.navIcon} />
        ) : null}
        <ListItemText primary={item.label} />
      </ListItem>
    );
    return (
      <List className={classes.navList}>
        {items.map((item, index) => {
          if ('items' in item) {
            return (
              <div key={index} className={classes.navListSubContainer}>
                <Typography variant={'overline'} color={'textSecondary'}>
                  {item.label}
                </Typography>
                {item.items.map((subItem, subIndex) =>
                  renderLink(subItem, subIndex)
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
    <nav>
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
