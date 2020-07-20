import * as React from 'react';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Heading, HeadingComponent } from '../typography/Heading';

export interface ContentGroupProps {
  /**
   * The title to show
   */
  title?: string;
  /**
   * The component to be used for showing the title.
   * @default "h3"
   */
  titleComponent?: HeadingComponent;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& + &': {
      marginTop: theme.spacing(4),
    },
  },
}));

/**
 * | Test ID                           | Description          |
 * | --------------------------------- | -------------------- |
 * | `contentGroup-title`              | Title                |
 */
export const ContentGroup: React.FC<ContentGroupProps> = ({
  title,
  titleComponent = 'h3',
  children,
}) => {
  const classes = useStyles();
  const header = title ? (
    <Heading
      variant="h5"
      component={titleComponent}
      gutterBottom={true}
      data-testid="contentGroup-title"
    >
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
