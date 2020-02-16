import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Button, ButtonBar, Page, PageWrapper } from '..';
import { render } from '../test-utils';

const pageContent = 'test content';
const label = 'label';

describe('<PageWrapper />', () => {
  afterEach(cleanup);

  it('should render the page wrapper component with page as content', () => {
    const { container } = render(
      <PageWrapper>
        <Page>
          <p>{pageContent}</p>
        </Page>
      </PageWrapper>
    );

    const inputLabel = container.querySelector<HTMLParagraphElement>('p');
    expect(inputLabel!.textContent).toEqual(pageContent);
  });

  it('should render the page wrapper component with page and button bar as content', () => {
    const { container } = render(
      <Page variant="narrow">
        <ButtonBar>
          <Button>{label}</Button>
        </ButtonBar>
        <p>{pageContent}</p>
      </Page>
    );

    const buttonResult = container.querySelector<HTMLButtonElement>('button');
    expect(buttonResult).toBeTruthy();
    expect(buttonResult!.textContent).toEqual(label);
    const narrowDiv = container.querySelectorAll<HTMLDivElement>('div');
    expect(narrowDiv.item(0)!.classList).toContain('MuiContainer-maxWidthSm');
  });
});
