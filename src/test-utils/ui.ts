import { render as renderOrig } from '@testing-library/react';
import { ReactElement } from 'react';
import { BackofficeUiProvider } from '..';

export const render = (ui: ReactElement) =>
  renderOrig(ui, { wrapper: BackofficeUiProvider });
