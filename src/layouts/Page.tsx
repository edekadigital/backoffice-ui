import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

export type PageVariant = 'default' | 'narrow';

export type PageChildren = React.ReactNode | React.ReactNode[];

export interface PageProps {
  variant?: PageVariant;
  children: PageChildren;
  paddingBottom?: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: '85px',
  },
}));

export const Page: React.FC<PageProps> = (props) => {
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
