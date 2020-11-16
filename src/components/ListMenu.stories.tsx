import * as React from 'react';
import { Add } from '../icons';
import { Button } from './Button';

import { ListMenu, ListMenuItem } from './ListMenu';

export default {
  title: 'Components/ListMenu',
  component: ListMenu,
};

export const Default = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const items: Array<ListMenuItem> = [
    { handler: () => {}, label: 'Foo Bar' },
    { handler: () => {}, label: 'Lorem ipsum', icon: Add },
  ];

  return (
    <>
      <Button onClick={handleOpen}>Open Menu</Button>
      <ListMenu
        items={items}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      />
    </>
  );
};
