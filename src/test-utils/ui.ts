import { render as renderOrig } from '@testing-library/react';
import { ReactElement } from 'react';
import { BackofficeUiProvider } from '..';
import * as mediaQuery from 'css-mediaquery';

export const render = (ui: ReactElement) =>
  renderOrig(ui, { wrapper: BackofficeUiProvider });

/**
 * see: https://material-ui.com/components/use-media-query/#testing
 */
function createMatchMedia(width: number) {
  return (query: string) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

export const setMatchMedia = (viewport: 'desktop' | 'mobile' = 'desktop') =>
  (window.matchMedia = createMatchMedia(
    viewport === 'desktop' ? window.innerWidth : 400
  ) as never);
