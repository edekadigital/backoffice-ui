import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { BackofficeUiProvider } from '../src';

const ThemeDecorator = storyFn => (
  <BackofficeUiProvider>{storyFn()}</BackofficeUiProvider>
);
addDecorator(ThemeDecorator);

function loadStories() {
  const req = require.context('../src', true, /\.stories\.(ts|tsx)?$/);
  req.keys().forEach(file => req(file));
}

configure(loadStories, module);
