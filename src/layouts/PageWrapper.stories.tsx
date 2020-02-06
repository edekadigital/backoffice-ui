import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { PageWrapper, Page, Body, ReverseNavigation, AppBar } from '..'; // @edekadigital/backoffice-ui

const Content = () => (
  <Body component="p">
    Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  </Body>
);

const noop = () => {};

storiesOf('Layouts|PageWrapper', module).add('default', () => (
  <PageWrapper>
    <AppBar gutterBottom={true}>
      <strong>Lorem</strong>Ipsum
    </AppBar>
    <Page>
      <ReverseNavigation onBackClick={noop} gutterBottom={true}>
        LoremIpsum
      </ReverseNavigation>
      <Content />
    </Page>
  </PageWrapper>
));
