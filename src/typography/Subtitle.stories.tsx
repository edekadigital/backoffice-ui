import * as React from 'react';
import { Subtitle } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Typography|Subtitle',
  component: Subtitle,
};

Subtitle.defaultProps = {
  variant: 'subtitle1',
  component: 'p',
};

export const Default = () => (
  <Subtitle>
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const ColorTextPrimary = () => (
  <Subtitle color="textPrimary">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const ColorTextSecondary = () => (
  <Subtitle color="textSecondary">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const ColorPrimary = () => (
  <Subtitle color="primary">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const AlignCenter = () => (
  <Subtitle align="center">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const VariantSubtitle1 = () => (
  <Subtitle variant="subtitle1">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const VariantSubtitle2 = () => (
  <Subtitle variant="subtitle2">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const Subtitle2AsDiv = () => (
  <Subtitle variant="subtitle2" component={'div'}>
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);
