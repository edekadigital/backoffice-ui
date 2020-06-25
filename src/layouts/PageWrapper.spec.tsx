import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Button, ButtonBar, Page, PageWrapper } from '..';
import { render } from '../test-utils';

const pageContent = 'test content';
const label = 'label';
const buttonTestId = 'button-test-id';

describe('<PageWrapper />', () => {
  afterEach(cleanup);

  it('should render the page wrapper component with page as content', () => {
    const { getByText } = render(
      <PageWrapper>
        <Page>
          <p>{pageContent}</p>
        </Page>
      </PageWrapper>
    );

    expect(getByText(pageContent)!).toBeTruthy();
  });

  it('should render the page wrapper component with page and button bar as content', () => {
    const { getByTestId, container } = render(
      <Page variant="narrow" data-testid="pagetestid">
        <ButtonBar>
          <Button data-testid={buttonTestId}>{label}</Button>
        </ButtonBar>
        <p>{pageContent}</p>
      </Page>
    );

    expect(getByTestId(buttonTestId)!).toBeTruthy();
    expect(getByTestId(buttonTestId)!.textContent).toEqual(label);
    const narrowDiv = container.querySelectorAll<HTMLDivElement>('div');
    expect(narrowDiv.item(0)!.classList).toContain('MuiContainer-maxWidthLg');
  });
});
