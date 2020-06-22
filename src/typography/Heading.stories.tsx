import * as React from 'react';
import { Heading } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Typography|Heading',
  component: Heading,
};

export const Default = () => (
  <Heading>
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const Primary = () => (
  <Heading color="primary">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const Secondary = () => (
  <Heading color="secondary">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const Center = () => (
  <Heading align="center">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const H1 = () => (
  <Heading variant="h1">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const H2 = () => (
  <Heading variant="h2">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const H3 = () => (
  <Heading variant="h3">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const H4 = () => (
  <Heading variant="h4">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const H5 = () => (
  <Heading variant="h5">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const H6 = () => (
  <Heading variant="h6">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const H1AsH2 = () => (
  <Heading variant="h1" component={'h2'}>
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const AsDivComponent = () => (
  <Heading component={'div'}>
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);
