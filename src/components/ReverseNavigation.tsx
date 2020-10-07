import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBack } from '../icons';
import { IconButton } from './IconButton';

export interface ReverseNavigationProps {
  /**
   * Callback fired when the the back button is clicked
   */
  onBackClick: React.MouseEventHandler;
  /**
   * Additional action items to show, e.g. a button.
   */
  action?: React.ReactNode;
  /**
   * If `true`, the back button will be floating left. Default is set to `true`.
   * @default true
   */
  floatingBackButton?: boolean;
  /**
   * If `true`, the reverse navigation will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * Additional text to show.
   */
  infoBarContent?: React.ReactNode;
}

const useStyles = makeStyles<Theme, ReverseNavigationProps>((theme: Theme) => ({
  root: ({ gutterBottom, floatingBackButton = true }) => ({
    marginBottom: theme.spacing(gutterBottom ? 3 : 0),
    [theme.breakpoints.up(theme.breakpoints.width('lg') + theme.spacing(2))]: {
      marginLeft: floatingBackButton ? theme.spacing(-5.5) : 0,
    },
  }),
  inner: {
    display: 'flex',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: theme.spacing(-1.5),
    marginRight: theme.spacing(),
  },
  infoBar: {
    paddingLeft: theme.spacing(),
    marginLeft: theme.spacing(4.5),
    paddingBottom: theme.spacing(1),
  },
}));

/**
 * | Test ID                    | Description          |
 * | -------------------------- | -------------------- |
 * | `reverseNavigation-back`   | Back button          |
 * | `reverseNavigation-title`  | Title                |
 * | `reverseNavigation-infoBar`| Info bar container   |
 * | `reverseNavigation-actions`| Actions container    |
 * @deprecated Use `TitleBar` instead
 */
export const ReverseNavigation: React.FC<ReverseNavigationProps> = (props) => {
  const { onBackClick, children, infoBarContent, action } = props;
  const classes = useStyles(props);

  const title = children ? (
    <Typography
      component="h2"
      variant="h5"
      data-testid="reverseNavigation-title"
    >
      {children}
    </Typography>
  ) : null;

  const infoBar = infoBarContent ? (
    <div className={classes.infoBar} data-testid="reverseNavigation-infoBar">
      {infoBarContent}
    </div>
  ) : null;

  const actions = action ? (
    <div data-testid="reverseNavigation-actions">{action}</div>
  ) : null;

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.wrapper}>
          <IconButton
            icon={ArrowBack}
            onClick={onBackClick}
            data-testid="reverseNavigation-back"
            className={classes.backButton}
          />
          {title}
        </div>
        {actions}
      </div>
      {infoBar}
    </div>
  );
};
