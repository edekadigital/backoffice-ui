import * as React from 'react';
import { List as MuiList } from '@material-ui/core';

import { Divider } from '..';

export const List: React.FC = (props) => {
  const { children } = props;
  return (
    <MuiList dense={true} data-testid="list">
      <Divider />
      {children}
    </MuiList>
  );
};
