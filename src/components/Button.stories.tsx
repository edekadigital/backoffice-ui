import * as React from 'react';

import { Button, Delete, ArrowForward, CloudDownload } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components|Button',
  component: Button,
};

export const Contained = () => <Button>Some Label</Button>;
export const ContainedAndDisabled = () => (
  <Button disabled={true}>Some Label</Button>
);
export const ContainedWithIcon = () => (
  <Button variant="contained" icon={Delete}>
    Some Label
  </Button>
);
export const ContainedWithIconRight = () => (
  <Button variant="contained" icon={ArrowForward} iconPosition="right">
    Some Label
  </Button>
);
export const Text = () => <Button variant="text">Some Label</Button>;
export const TextDisabled = () => (
  <Button variant="text" disabled={true}>
    Some Label
  </Button>
);
export const TextWithIcon = () => (
  <Button variant="text" icon={Delete}>
    Some Label
  </Button>
);
export const TextWithIconRight = () => (
  <Button variant="text" icon={ArrowForward} iconPosition="right">
    Some Label
  </Button>
);
export const Outlined = () => <Button variant="outlined">Some Label</Button>;
export const OutlinedDisbaled = () => (
  <Button variant="outlined" disabled={true}>
    Some Label
  </Button>
);
export const OutlinedWithIcon = () => (
  <Button variant="outlined" icon={Delete}>
    Some Label
  </Button>
);
export const OutlinedWithIconRight = () => (
  <Button variant="outlined" icon={ArrowForward} iconPosition="right">
    Some Label
  </Button>
);
export const Download = () => (
  <Button
    variant="text"
    icon={CloudDownload}
    href="data:text/plain;base64,TG9yZW0gSXBzdW0="
    download="file.txt"
  >
    Some Label
  </Button>
);

export const Progress = () => (
  <Button variant="text" showProgress={true}>
    Some Label
  </Button>
);
