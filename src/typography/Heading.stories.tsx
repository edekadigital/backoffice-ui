import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Heading } from '..'; // @edekadigital/backoffice-ui

storiesOf('Typography|Heading', module)
  .add('default', () => (
    <Heading>
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('primary', () => (
    <Heading color="primary">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('secondary', () => (
    <Heading color="secondary">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('center', () => (
    <Heading align="center">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('h1', () => (
    <Heading variant="h1">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('h2', () => (
    <Heading variant="h2">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('h3', () => (
    <Heading variant="h3">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('h4', () => (
    <Heading variant="h4">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('h5', () => (
    <Heading variant="h5">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ))
  .add('h6', () => (
    <Heading variant="h6">
      Lorem ipsum dolor <strong>sit amet</strong>
    </Heading>
  ));
