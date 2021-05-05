import * as React from 'react';
import { ListItem, Image, List, TextField, Switch } from '..';
import { Info } from '../icons';

const action = {
  icon: Info,
  handler: () => {},
};

const bullet = (
  <Image
    mode="contain"
    src="https://via.placeholder.com/61x34/fdec70/303030"
    alt="Some alt text"
  />
);

export default {
  title: 'Components/ListItem',
  component: ListItem,
};

export const Default = () => {
  return (
    <List>
      <ListItem text="Lorem" subText="ipsum" />
    </List>
  );
};

export const WithAction = () => {
  return (
    <List>
      <ListItem text="Lorem" subText="ipsum" action={action} />
    </List>
  );
};

export const WithBullet = () => {
  return (
    <List>
      <ListItem text="Lorem" subText="ipsum" bullet={bullet} />
    </List>
  );
};

export const Disabled = () => {
  return (
    <List>
      <ListItem text="Lorem" subText="ipsum" disabled={true} />
    </List>
  );
};

export const WithComponentAsContent = () => {
  const text = <TextField placeholder="Lorem" />;
  const subtext = <Switch label="ipsum" />;
  return (
    <List>
      <ListItem text={text} subText={subtext} />
    </List>
  );
};
