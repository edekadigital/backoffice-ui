import * as React from 'react';
import { Spacer } from '..'; // @edekadigital/backoffice-ui
import { Body } from '../typography/Body';

export default {
  title: 'Components/Spacer',
  component: Spacer,
};

export const Vertical = () => (
  <>
    <Body>Content before Spacer</Body>
    <Spacer vertical={4} />
    <Body>Content after Spacer</Body>
  </>
);
