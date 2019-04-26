import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Page, Body } from '..'; // @edekadigital/backoffice-ui

const Content = () => (
  <Body>
    Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  </Body>
);

storiesOf('Layouts|Page', module)
  .add('default (1 item)', () => (
    <Page>
      <Content />
    </Page>
  ))
  .add('default (2 items)', () => (
    <Page>
      <Content />
      <Content />
    </Page>
  ))
  .add('default (3 items)', () => (
    <Page>
      <Content />
      <Content />
      <Content />
    </Page>
  ))
  .add('default (4 items)', () => (
    <Page>
      <Content />
      <Content />
      <Content />
      <Content />
    </Page>
  ))
  .add('narrow (1 item)', () => (
    <Page variant="narrow">
      <Content />
    </Page>
  ))
  .add('narrow (2 items)', () => (
    <Page variant="narrow">
      <Content />
      <Content />
    </Page>
  ));
