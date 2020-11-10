import * as React from 'react';
import {
  SvgIconProps,
  Theme,
  IconButton as MuiIconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBack } from '../icons';
import { IconButton } from './IconButton';
import { Button, ListMenu } from '..';

export interface TitleBarActionItem {
  icon: React.ElementType<SvgIconProps>;
  label?: string;
  handler: React.MouseEventHandler<HTMLElement>;
}

export interface TitleBarActionListMenuItem extends TitleBarActionItem {
  label: string;
}

export interface TitleBarActionListMenu {
  icon: React.ElementType<SvgIconProps>;
  label?: string;
  items: TitleBarActionListMenuItem[];
}

export type TitleBarActions = (TitleBarActionItem | TitleBarActionListMenu)[];

interface TitleBarActionListMenuProps {
  index: number;
  items: TitleBarActionListMenuItem[];
  open: boolean;
  anchorEl?: HTMLElement;
  onClose: Function;
}

export interface TitleBarProps {
  /**
   * Additional action items to show, e.g. a button.
   */
  actions?: TitleBarActions;
  /**
   * Additional text or elements to show below the headline.
   */
  additionalContent?: React.ReactNode;
  /**
   * The title to show.
   */
  children: React.ReactNode;
  /**
   * If `true`, the back button will be floating left. Default is set to `true`.
   * @default true
   */
  floatingBackButton?: boolean;
  /**
   * If `true`, the title bar will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * Additional info text next to the title, e.g. a save confirmation or status chip
   */
  info?: React.ReactNode;
  /**
   * Callback fired when the the back button is clicked
   * If set, a back (arrow) button will be displayed.
   */
  onBackClick?: React.MouseEventHandler;
}

const useStyles = makeStyles<Theme, TitleBarProps>((theme: Theme) => ({
  root: ({ gutterBottom, floatingBackButton = true, onBackClick }) => ({
    marginBottom: theme.spacing(gutterBottom ? 3 : 0),
    [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
      marginLeft: floatingBackButton && onBackClick ? theme.spacing(-5.5) : 0,
    },
    display: 'flex',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }),
  wrapper: {
    [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  titleWrapper: {
    minHeight: 60,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up(theme.breakpoints.width('sm'))]: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 0,
    },
  },
  title: {
    marginRight: theme.spacing(2),
  },
  backButton: {
    marginLeft: theme.spacing(-2),
    [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
      marginLeft: theme.spacing(-1.5),
    },
    marginRight: theme.spacing(),
  },
  additionalContent: ({ onBackClick, floatingBackButton = true }) => ({
    [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
      marginLeft: floatingBackButton && onBackClick ? theme.spacing(5.5) : 0,
    },
    width: '100%',
  }),
  info: {
    [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(0.5),
    },
  },
  actionsWrapper: {
    alignSelf: 'start',
    lineHeight: '60px',
  },
}));

/**
 * | Test ID       0                           | Description                  |
 * | ---------------------------------------- | ---------------------------- |
 * | `titleBar-backButton`                    | Reverse navigation button    |
 * | `titleBar-title`                         | Title text                   |
 * | `titleBar-info`                          | Info container               |
 * | `titleBar-additionalContent`             | Additional content container |
 * | `titleBar-actions`                       | Action buttons container     |
 * | `titleBar-actionItem-${index}`           | Action button                |
 * | `titleBar-actionMenu-${index}`           | Action grid menu             |
 * | `titleBar-menuItem-${index}-${itemIndex}`| Menu item of action grid menu|
 */
export const TitleBar: React.FC<TitleBarProps> = (props) => {
  const {
    onBackClick,
    children,
    additionalContent,
    actions = [],
    info,
  } = props;

  const [activeMenu, setActiveMenu] = React.useState<{
    anchorEl: HTMLElement;
    index: number;
  } | null>(null);

  const classes = useStyles(props);

  const additionalContentEl = additionalContent ? (
    <div className={classes.additionalContent}>
      <Typography
        variant="caption"
        color={'textSecondary'}
        data-testid="titleBar-additionalContent"
      >
        {additionalContent}
      </Typography>
    </div>
  ) : null;

  const backButton = onBackClick ? (
    <IconButton
      icon={ArrowBack}
      onClick={onBackClick}
      data-testid="titleBar-backButton"
      className={classes.backButton}
    />
  ) : null;

  const infoEl = info ? (
    <div className={classes.info}>
      <Typography
        variant="caption"
        color={'textSecondary'}
        data-testid="titleBar-info"
      >
        {info}
      </Typography>
    </div>
  ) : null;

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const actionItems = actions.map((tempAction, index) => {
    const {
      handler = (event: React.MouseEvent<HTMLElement>) =>
        setActiveMenu({ index, anchorEl: event.currentTarget }),
      icon,
    } = tempAction as TitleBarActionItem;
    const key = `titleBar-actionItem-${index}`;

    const renderActionButton = tempAction.label ? (
      <Button
        icon={icon}
        variant="outlined"
        color={'primary'}
        data-testid={key}
        key={key}
        onClick={handler}
      >
        {tempAction.label}
      </Button>
    ) : (
      <MuiIconButton
        color="inherit"
        onClick={handler}
        key={key}
        data-testid={key}
      >
        <tempAction.icon fontSize="small" />
      </MuiIconButton>
    );

    return renderActionButton;
  });

  const actionMenus = actions.map((tempAction, index) => {
    if ('items' in tempAction) {
      const anchorEl = activeMenu?.anchorEl;
      const open = activeMenu?.index === index;

      return (
        <ListMenu
          index={index}
          items={tempAction.items}
          anchorEl={anchorEl}
          open={open}
          key={index}
          onClose={closeMenu}
        />
      );
    } else return null;
  });

  const actionsEl =
    actions.length > 0 ? (
      <div data-testid="titleBar-actions" className={classes.actionsWrapper}>
        {actionItems}
        {actionMenus}
      </div>
    ) : null;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.titleWrapper}>
          {backButton}
          <Typography
            component="h2"
            variant="h4"
            data-testid="titleBar-title"
            className={classes.title}
          >
            {children}
          </Typography>
        </div>
        {infoEl}
        {additionalContentEl}
      </div>
      {actionsEl}
    </div>
  );
};
