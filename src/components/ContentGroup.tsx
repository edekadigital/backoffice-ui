import * as React from 'react';

import { Heading, HeadingComponent } from '../typography/Heading';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

export interface ContentGroupProps {
  title?: string;
  titleComponent?: HeadingComponent;
  children: React.ReactNode;
}

const contentGroupStyles = createStyles((theme: Theme) => ({
  root: {
    '& + &': {
      marginTop: theme.spacing.unit * 4,
    },
  },
}));

const ContentGroupComponent: React.FC<ContentGroupProps & WithStyles> = ({
  title,
  titleComponent = 'h3',
  children,
  classes,
}) => {
  const header = title ? (
    <Heading variant="h5" component={titleComponent} gutterBottom={true}>
      {title}
    </Heading>
  ) : null;
  return (
    <div className={classes.root}>
      {header}
      {children}
    </div>
  );
};

export const ContentGroup = withStyles(contentGroupStyles)(
  ContentGroupComponent
);
