import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Page } from '..';
import { render } from '../test-utils';

const pageContent = 'test content';

describe('<Page />', () => {
  afterEach(cleanup);

  it('should render the page component with content', () => {
    const { getByText } = render(
      <Page paddingBottom>
        <p>{pageContent}</p>
      </Page>
    );

    expect(getByText(pageContent)).toBeTruthy();
  });

  it('should not render the page component without content', () => {
    const { queryByTestId } = render(<Page data-testid="page" />);

    expect(queryByTestId('page')).toBeFalsy();
  });

  it('should render the page component as narrow variant', () => {
    const { getByText, container } = render(
      <Page variant="narrow">
        <p>{pageContent}</p>
      </Page>
    );

    expect(getByText(pageContent)!).toBeTruthy();
    const narrowDiv = container.querySelectorAll<HTMLDivElement>('div');
    expect(narrowDiv.item(0)!.classList).toContain('MuiContainer-maxWidthLg');
  });

  it('should render the page component as narrowest variant', () => {
    const { getByText, container } = render(
      <Page variant="narrowest">
        <p>{pageContent}</p>
      </Page>
    );

    expect(getByText(pageContent)!).toBeTruthy();
    const narrowDiv = container.querySelectorAll<HTMLDivElement>('div');
    expect(narrowDiv.item(0)!.classList).toContain('MuiContainer-maxWidthSm');
  });
});
