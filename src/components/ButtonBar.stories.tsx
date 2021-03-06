import * as React from 'react';
import { Button, ButtonBar } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components/ButtonBar',
  component: ButtonBar,
};

export const Default = () => (
  <ButtonBar>
    <Button>Lorem ipsum</Button>
    <Button variant="text">Lorem ipsum</Button>
  </ButtonBar>
);

export const RightAligned = () => (
  <ButtonBar align={'right'}>
    <Button>Lorem ipsum</Button>
    <Button variant="text">Lorem ipsum</Button>
  </ButtonBar>
);

export const CenterAligned = () => (
  <ButtonBar align={'center'}>
    <Button>Lorem ipsum</Button>
    <Button variant="text">Lorem ipsum</Button>
  </ButtonBar>
);
