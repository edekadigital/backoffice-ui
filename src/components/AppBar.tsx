import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface AppBarAction {
  icon: React.ElementType<SvgIconProps>;
  handler: () => void;
}

export interface AppBarProps {
  children?: React.ReactNode;
  actions?: AppBarAction[];
  gutterBottom?: boolean;
}

const useStyles = makeStyles<Theme, AppBarProps>(theme => ({
  root: ({ gutterBottom }) => ({
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(gutterBottom ? 3 : 0),
  }),
  outer: {
    margin: '0 auto',
    display: 'flex',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: '1 1 100%',
    overflow: 'hidden',
  },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  actionsWrapper: {
    flex: '0 0 auto',
    display: 'flex',
    overflow: 'hidden',
  },
}));

export const AppBar: React.FC<AppBarProps> = props => {
  const { actions = [], children } = props;
  const classes = useStyles(props);

  const actionItems = actions.map(({ icon, handler }, index) => {
    const IconComponent = icon;
    const handleClick = () => handler();
    return (
      <div key={`action-item-${index}`}>
        <MuiIconButton color="default" onClick={handleClick}>
          <IconComponent fontSize="small" />
        </MuiIconButton>
      </div>
    );
  });

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <div className={classes.outer}>
          <div className={classes.titleWrapper}>
            <Typography
              component="h1"
              variant="h6"
              className={classes.title}
              data-testid="appBar-title"
            >
              {children}
            </Typography>
          </div>
          <div className={classes.actionsWrapper}>{actionItems}</div>
        </div>
      </Container>
    </div>
  );
};
