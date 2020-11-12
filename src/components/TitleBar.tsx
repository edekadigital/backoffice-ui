import * as React from 'react';
import { SvgIconProps, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBack } from '../icons';
import { IconButton } from './IconButton';

export interface TitleBarActionItem {
  icon: React.ElementType<SvgIconProps>;
  label?: string;
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }),
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
  additionalContentWrapper: ({ onBackClick, floatingBackButton = true }) => ({
    [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
      marginLeft: floatingBackButton && onBackClick ? theme.spacing(5.5) : 0,
    },

    width: '100%',
    display: 'flex',
    alignItems: 'center',
  }),
  additionalContentItem: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  actionsWrapper: {
    display: 'flex',
    lineHeight: '60px',
  },
  actionItem: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  actionsCaption: {
    [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
      float: 'right',
    },
    display: 'flex',
  },
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
 */
export const TitleBar: React.FC<TitleBarProps> = (props) => {
  const {
    onBackClick,
    children,
    additionalContent,
    actions,
    actionsCaption,
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

  const actionsEl = actions ? (
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
          className={classes.actionsCaption}
          data-testid="titleBar-actionsCaption"
        >
          {actionsCaption}
        </div>
      ) : null}
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

  return (
    <div className={classes.root}>
      <div>
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
        {additionalContentEl}
      </div>
      {actionsEl}
    </div>
  );
};
