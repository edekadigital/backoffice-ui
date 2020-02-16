import * as React from 'react';
import Container from '@material-ui/core/Container';

export type PageVariant = 'default' | 'narrow';

export type PageChildren = React.ReactNode | React.ReactNode[];

export interface PageProps {
  variant?: PageVariant;
  children: PageChildren;
}

export const Page: React.FC<PageProps> = props => {
  const { children, variant } = props;
  const maxWidth = variant === 'narrow' ? 'sm' : 'lg';
  return <Container maxWidth={maxWidth}>{children}</Container>;
};
