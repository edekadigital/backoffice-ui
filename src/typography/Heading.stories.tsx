import * as React from 'react';
import { Heading } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Typography|Heading',
  component: Heading,
};

Heading.defaultProps = {
  variant: 'h2',
  component: 'h2',
};

export const Default = () => (
  <Heading>
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const ColorTextPrimary = () => (
  <Heading color="textPrimary">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const ColorTextSecondary = () => (
  <Heading color="textSecondary">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const ColorPrimary = () => (
  <Heading color="primary">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const AlignCenter = () => (
  <Heading align="center">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const VariantH1 = () => (
  <Heading variant="h1">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const VariantH2 = () => (
  <Heading variant="h2">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const VariantH3 = () => (
  <Heading variant="h3">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const VariantH4 = () => (
  <Heading variant="h4">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const VariantH5 = () => (
  <Heading variant="h5">
    Lorem ipsum dolor <strong>sit amet</strong>
  </Heading>
);

export const VariantH6 = () => (
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
