import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';

export type PageVariant = 'default' | 'narrow';

export type PageChildren = React.ReactNode | React.ReactNode[];

export interface PageProps {
  /**
   * The page variant to use, while `narrow` will set a maximum width (static).
   */
  variant?: PageVariant;
  /**
   * If `true`, the page will have a bottom padding.
   */
  paddingBottom?: boolean;
}

const useStyles = makeStyles<Theme, { paddingBottom?: boolean }>(
  (theme: Theme) => ({
    root: ({ paddingBottom }) => ({
      paddingBottom: paddingBottom ? theme.spacing(10) : theme.spacing(0),
      [theme.breakpoints.up(theme.breakpoints.width('xs'))]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      [theme.breakpoints.up(theme.breakpoints.width('sm'))]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      [theme.breakpoints.up(theme.breakpoints.width('lg'))]: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
      },
    }),
  })
);

export const Page: React.FC<PageProps> = (props) => {
  const { children, variant, paddingBottom } = props;
  const classes = useStyles({ paddingBottom });
  const maxWidth = variant === 'narrow' ? 'lg' : false;

  return children ? (
    <Container
      maxWidth={maxWidth}
      disableGutters={true}
      classes={{ root: classes.root }}
    >
      {children}
    </Container>
  ) : (
    <></>
  );
};
