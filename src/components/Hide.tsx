import * as React from 'react';
import { default as MuiHidden } from '@material-ui/core/Hidden';

export type HideViewports = 'mobile' | 'desktop';

export interface HideProps {
  viewport?: HideViewports;
  children: React.ReactNode;
}

export const Hide: React.FC<HideProps> = (props) => {
  const { children, viewport = 'mobile' } = props;
  return viewport === 'mobile' ? (
    <MuiHidden smDown={true} implementation="css">
      {children}
    </MuiHidden>
  ) : (
    <MuiHidden mdUp={true} implementation="css">
      {children}
    </MuiHidden>
  );
};
