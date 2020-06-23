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

export const Primary = () => (
  <Subtitle color="primary">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const Secondary = () => (
  <Subtitle color="secondary">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const Center = () => (
  <Subtitle align="center">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const Subtitle1 = () => (
  <Subtitle variant="subtitle1">
    Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Subtitle>
);

export const Subtitle2 = () => (
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
