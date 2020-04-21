import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';

export type PageVariant = 'default' | 'narrow';

export type PageChildren = React.ReactNode | React.ReactNode[];

export interface PageProps {
  variant?: PageVariant;
  children: PageChildren;
  paddingBottom?: boolean;
}

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingBottom: '100px',
  },
}));

export const Page: React.FC<PageProps> = props => {
  const classes = useStyles();
  const { children, variant, paddingBottom } = props;
  const maxWidth = variant === 'narrow' ? 'sm' : 'lg';
  return (
    <Container
      maxWidth={maxWidth}
      classes={paddingBottom ? { root: classes.root } : {}}
    >
      {children}
    </Container>
  );
};
