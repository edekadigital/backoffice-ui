import * as React from 'react';
import { Page, Body, ReverseNavigation } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Layouts|Page',
  component: Page,
};

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

export const Default = () => {
  const Content = () => (
    <Body component="p">
      Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </Body>
  );
  return (
    <Page>
      <Content />
    </Page>
  );
};

export const Narrow = () => (
  <Page variant="narrow">
    <Content />
  </Page>
);

export const WithReverseNavigation = () => {
  const clickHandler = () => {};

  return (
    <Page>
      <ReverseNavigation onBackClick={clickHandler} gutterBottom={true}>
        LoremIpsum
      </ReverseNavigation>
      <Content />
    </Page>
  );
};
