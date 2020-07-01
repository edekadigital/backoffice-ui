import * as React from 'react';
import { addDecorator } from '@storybook/react';
import { BackofficeUiProvider } from '../src';
import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withPropsTable } from 'storybook-addon-react-docgen';

const ThemeDecorator = (storyFn: () => React.ReactNode) => (
  <BackofficeUiProvider>{storyFn()}</BackofficeUiProvider>
);
addDecorator(ThemeDecorator);
const propsTableOption = {
  propTablesExclude: [BackofficeUiProvider],
};
addDecorator(withPropsTable(propsTableOption as any) as any);
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
});
