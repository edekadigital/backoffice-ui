import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Page, Body } from '..'; // @edekadigital/backoffice-ui
import { ReverseNavigation } from '../components/ReverseNavigation';

const Paragraph1 = () => (
  <p>
    Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  </p>
);

const Paragraph2 = () => (
  <p>
    Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus
    accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus
    et ultrices posuere cubilia Curae;
    <strong>Sed aliquam, nisi quis porttitor</strong> congue, elit erat euismod
    orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum
    elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.
    Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere.
    Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue
    blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero,
    sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse
    pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec
    pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus
    orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius
    tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis.
  </p>
);

const Content = () => (
  <Body component="div">
    <Paragraph1 />
  </Body>
);

const ContentLong = () => (
  <Body component="div">
    <Paragraph1 />
    <Paragraph2 />
    <Paragraph1 />
    <Paragraph2 />
    <Paragraph1 />
    <Paragraph2 />
    <Paragraph1 />
    <Paragraph2 />
    <Paragraph1 />
    <Paragraph2 />
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
  ))
  .add('with ReverseNavigation', () => {
    const handleBarBackClick = () => {
      console.log('handleBarBackClick');
    };

    const bar = (
      <ReverseNavigation onBackClick={handleBarBackClick}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
    );

    return (
      <Page bar={bar}>
        <ContentLong />
      </Page>
    );
  })
  .add('with ReverseNavigation (sticky + narrow)', () => {
    const handleBarBackClick = () => {
      console.log('handleBarBackClick');
    };

    const bar = (
      <ReverseNavigation variant="narrow" onBackClick={handleBarBackClick}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
    );

    return (
      <Page bar={bar} variant="narrow" stickyBar={true}>
        <ContentLong />
      </Page>
    );
  });
