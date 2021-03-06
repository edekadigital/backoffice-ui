import * as React from 'react';

import { IconButton, ArrowForward, Button } from '..'; // @edekadigital/backoffice-ui
import { CloudDownload, MoreVert } from '../icons';

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
export const Sucess = () => <IconButton color="success" icon={ArrowForward} />;
export const Error = () => <IconButton color="error" icon={ArrowForward} />;
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

export const Menu = () => (
  <IconButton
    color="primary"
    icon={MoreVert}
    menu={[
      { handler: () => console.log('Clicked lorem'), label: 'Lorem' },
      { handler: () => console.log('Clicked ipsum'), label: 'Ipsum' },
    ]}
  />
);
