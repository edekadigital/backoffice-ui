import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Page } from '..';
import { render } from '../test-utils';

const pageContent = 'test content';

describe('<Page />', () => {
  afterEach(cleanup);

  it('should render the page component with content', () => {
    const { getByText } = render(
      <Page>
        <p>{pageContent}</p>
      </Page>
    );

    expect(getByText(pageContent)!).toBeTruthy();
  });

  it('should render the page component with narrow content', () => {
    const { getByText, container } = render(
      <Page variant="narrow">
        <p>{pageContent}</p>
      </Page>
    );

    expect(getByText(pageContent)!).toBeTruthy();
    const narrowDiv = container.querySelectorAll<HTMLDivElement>('div');
    expect(narrowDiv.item(0)!.classList).toContain('MuiContainer-maxWidthLg');
  });
});
