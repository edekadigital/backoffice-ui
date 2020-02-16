import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Heading } from '..';

const headingContent = 'test content';

describe('<Heading />', () => {
  afterEach(cleanup);

  it('should render the heading component', () => {
    const { container } = render(
      <Heading>
        {headingContent}
      </Heading>
    );

    const content = container.querySelector<HTMLHeadingElement>('h2');
    expect(content!.textContent).toEqual(headingContent);
  });

  it('should render the heading component with secondary color', () => {
    const { container } = render(
      <Heading color={'secondary'}>
        {headingContent}
      </Heading>
    );

    const bodyContent = container.querySelector<HTMLHeadingElement>('h2');
    expect(bodyContent!.textContent).toEqual(headingContent);
    expect(bodyContent!.classList).toContain('MuiTypography-colorSecondary');
  });

  it('should render the heading component with variant h3', () => {
    const { container } = render(
      <Heading variant="h3">
        {headingContent}
      </Heading>
    );

    const bodyContent = container.querySelector<HTMLHeadingElement>('h2');
    expect(bodyContent!.textContent).toEqual(headingContent);
    expect(bodyContent!.classList).toContain('MuiTypography-h3');
  });
});
