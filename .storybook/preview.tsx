import * as React from 'react';
import { addDecorator } from '@storybook/react';
import { BackofficeUiProvider } from '../src';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const ThemeDecorator = (storyFn: () => React.ReactNode) => (
  <BackofficeUiProvider>{storyFn()}</BackofficeUiProvider>
);
addDecorator(ThemeDecorator);
export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
};
