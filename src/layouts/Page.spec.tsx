import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Page } from '..';
import { render } from '../test-utils';

const pageContent = 'test content';

describe('<Page />', () => {
  afterEach(cleanup);

  it('should render the page component with content', () => {
    const { container } = render(
      <Page>
        <p>{pageContent}</p>
      </Page>
    );

    const inputLabel = container.querySelector<HTMLParagraphElement>('p');
    expect(inputLabel!.textContent).toEqual(pageContent);
  });

  it('should render the page component with narrow content', () => {
    const { container } = render(
      <Page variant="narrow">
        <p>{pageContent}</p>
      </Page>
    );

    const inputLabel = container.querySelector<HTMLParagraphElement>('p');
    expect(inputLabel!.textContent).toEqual(pageContent);
    const narrowDiv = container.querySelectorAll<HTMLDivElement>('div');
    expect(narrowDiv.item(0)!.classList).toContain('MuiContainer-maxWidthSm');
  });
});
