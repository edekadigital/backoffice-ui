import * as React from 'react';
import { Delete, List, ListItem } from '..';

const action = {
  icon: Delete,
  handler: () => {},
};

export default {
  title: 'Components/List',
  component: List,
};

export const Default = () => {
  return (
    <List>
      <ListItem
        text="ListItem 1"
        subText="subText of ListItem 1"
        action={action}
      />
      <ListItem
        text="ListItem 2"
        subText="subText of ListItem 2"
        action={action}
      />
      <ListItem
        text="ListItem 3"
        subText="subText of ListItem 3"
        action={action}
      />
      <ListItem
        text="ListItem 4"
        subText="subText of ListItem 4"
        action={action}
      />
    </List>
  );
};
