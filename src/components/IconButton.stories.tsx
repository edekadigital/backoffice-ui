import * as React from 'react';

import { IconButton, ArrowForward, Button } from '..'; // @edekadigital/backoffice-ui
import { CloudDownload } from '../icons';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  subcomponents: { Button },
};

export const Default = () => <IconButton icon={ArrowForward} />;
export const DefaultDisabled = () => (
  <IconButton icon={ArrowForward} disabled={true} />
);
export const Primary = () => <IconButton color="primary" icon={ArrowForward} />;
export const PrimaryDisabled = () => (
  <IconButton color="primary" icon={ArrowForward} disabled={true} />
);
export const Download = () => (
  <IconButton
    color="primary"
    icon={CloudDownload}
    href="data:text/plain;base64,TG9yZW0gSXBzdW0="
    download="file.txt"
  />
);
export const Progress = () => (
  <IconButton color="primary" icon={ArrowForward} showProgress={true} />
);
