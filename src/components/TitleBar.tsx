import * as React from 'react';
import { SvgIconProps, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBack, MoreVert } from '../icons';
import { IconButton } from './IconButton';

export interface TitleBarMenuItem {
  icon?: React.ElementType<SvgIconProps>;
  label: string;
  handler: React.MouseEventHandler<HTMLElement>;
}

export interface TitleBarProps {
  /**
   * Additional action items to show, e.g. a button.
   */
  actions?: React.ReactElement;
  /**
   * Additional caption text for the action items.
   * Element(s) will be rendered in a seperated line under the action items
   */
  actionsCaption?: React.ReactElement;
  /**
   * Additional text or elements to show below the headline.
   */
  additionalContent?: React.ReactElement;
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
   * Additional menu to show.
   */
  menu?: Array<TitleBarMenuItem>;
  /**
   * Callback fired when the the back button is clicked
   * If set, a back (arrow) button will be displayed.
   */
  onBackClick?: React.MouseEventHandler;
}

const useStyles = makeStyles<Theme, TitleBarProps>((theme: Theme) => ({
  root: ({ gutterBottom, floatingBackButton = true, onBackClick }) => ({
    display: 'flex',
    flexWrap: 'nowrap',
    marginBottom: theme.spacing(gutterBottom ? 2 : 0),
    [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
      marginLeft: floatingBackButton && onBackClick ? theme.spacing(-6) : 0,
    },
  }),
  fixedButtons: {
    flex: '0 0 auto',
    marginTop: theme.spacing(-0.5),
  },
  backButton: ({ floatingBackButton = true, onBackClick }) => ({
    marginLeft: theme.spacing(-2),
    [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
      marginLeft: floatingBackButton && onBackClick ? 0 : theme.spacing(-2),
    },
  }),
  main: {
    flex: '1 1 100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  additionalContentWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  additionalContentItem: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  actionsWrapper: ({ menu }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(0.25),
    marginRight: menu ? theme.spacing(1) : 0,
  }),
  actionItem: {
    paddingBottom: theme.spacing(1),
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  actionsCaptionWrapper: ({ menu }) => ({
    marginRight: menu ? theme.spacing(1) : 0,
    float: 'right',
    display: 'flex',
  }),
}));

/**
 * | Test ID       0                           | Description                  |
 * | ---------------------------------------- | ---------------------------- |
 * | `titleBar-backButton`                    | Reverse navigation button    |
 * | `titleBar-title`                         | Title text                   |
 * | `titleBar-additionalContent`             | Additional content container |
 * | `titleBar-additionalContent-${index}`    | Additional content element   |
 * | `titleBar-actions`                       | Action buttons container     |
 * | `titleBar-actionItem-${index}`           | Action button                |
 * | `titleBar-actionMenu-${index}`           | Action grid menu             |
 * | `titleBar-menuItem-${index}-${itemIndex}`| Menu item of action grid menu|
 * | `titleBar-actionsCaption`                | Actions caption container    |
 * | `titleBar-menuButton`                    | Additional menu button       |
 */
export const TitleBar: React.FC<TitleBarProps> = (props) => {
  const {
    onBackClick,
    children,
    additionalContent,
    actions,
    actionsCaption,
    menu,
  } = props;

  const classes = useStyles(props);

  const additionalContentEl = additionalContent ? (
    <div
      className={classes.additionalContentWrapper}
      data-testid="titleBar-additionalContent"
    >
      {Array.isArray(additionalContent.props.children) ? (
        additionalContent.props.children.map(
          (item: React.ReactElement, index: number) => (
            <div className={classes.additionalContentItem} key={index}>
              <Typography
                variant="caption"
                color={'textSecondary'}
                data-testid={`titleBar-additionalContent-${index}`}
              >
                {item}
              </Typography>
            </div>
          )
        )
      ) : (
        <div
          className={classes.additionalContentItem}
          data-testid="titleBar-additionalContent-0"
        >
          <Typography variant="caption" color={'textSecondary'}>
            {additionalContent}
          </Typography>
        </div>
      )}
    </div>
  ) : null;

  const actionsContainer = actions ? (
    <div data-testid="titleBar-actions">
      <div className={classes.actionsWrapper}>
        {Array.isArray(actions.props.children) ? (
          actions.props.children.map(
            (action: React.ReactElement, index: number) => (
              <div
                key={index}
                className={classes.actionItem}
                data-testid={`titleBar-actionItem-${index}`}
              >
                {action}
              </div>
            )
          )
        ) : (
          <div
            className={classes.actionItem}
            data-testid="titleBar-actionItem-0"
          >
            {actions}
          </div>
        )}
      </div>
      {actionsCaption ? (
        <div
          className={classes.actionsCaptionWrapper}
          data-testid="titleBar-actionsCaption"
        >
          {actionsCaption}
        </div>
      ) : null}
    </div>
  ) : null;

  const backButtonContainer = onBackClick ? (
    <div className={classes.fixedButtons}>
      <IconButton
        icon={ArrowBack}
        onClick={onBackClick}
        data-testid="titleBar-backButton"
        className={classes.backButton}
      />
    </div>
  ) : null;

  const menuContainer = menu ? (
    <div className={classes.fixedButtons} data-testid="titleBar-menuButton">
      <IconButton icon={MoreVert} menu={menu} />
    </div>
  ) : null;

  return (
    <div className={classes.root}>
      {backButtonContainer}
      <div className={classes.main}>
        <div className={classes.title}>
          <Typography
            component="h2"
            variant="h4"
            data-testid="titleBar-title"
            className={classes.title}
          >
            {children}
          </Typography>
          {additionalContentEl}
        </div>
        {actionsContainer}
      </div>
      {menuContainer}
    </div>
  );
};
