import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { IconButton, ArrowForward } from '..'; // @edekadigital/backoffice-ui
import { CloudDownload } from '../icons';

storiesOf('Components|IconButton', module)
  .add('default', () => <IconButton icon={ArrowForward} />)
  .add('default (disabled)', () => (
    <IconButton icon={ArrowForward} disabled={true} />
  ))
  .add('primary', () => <IconButton color="primary" icon={ArrowForward} />)
  .add('primary (disabled)', () => (
    <IconButton color="primary" icon={ArrowForward} disabled={true} />
  ))
  .add('download', () => (
    <IconButton
      color="primary"
      icon={CloudDownload}
      href="data:text/plain;base64,TG9yZW0gSXBzdW0="
      download="file.txt"
    />
  ));
