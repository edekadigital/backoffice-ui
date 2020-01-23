import * as React from 'react';
import { addDecorator } from '@storybook/react';
import { BackofficeUiProvider } from '../src';

const ThemeDecorator = (storyFn: () => React.ReactNode) => (
  <BackofficeUiProvider>{storyFn()}</BackofficeUiProvider>
);
addDecorator(ThemeDecorator);
