import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Subtitle } from '..';

const subtitleContent = 'test content';

describe('<Subtitle />', () => {
  afterEach(cleanup);

  it('should render the subtitle component', () => {
    const { container } = render(<Subtitle>{subtitleContent}</Subtitle>);

    const content = container.querySelector<HTMLParagraphElement>('p');
    expect(content!.textContent).toEqual(subtitleContent);
  });

  it('should render the subtitle component with secondary color', () => {
    const { container } = render(
      <Subtitle color="secondary">{subtitleContent}</Subtitle>
    );

    const bodyResult = container.querySelector<HTMLParagraphElement>('p');
    expect(bodyResult!.textContent).toEqual(subtitleContent);
    expect(bodyResult!.classList).toContain('MuiTypography-colorSecondary');
  });

  it('should render the subtitle component with align center', () => {
    const { container } = render(
      <Subtitle align="center">{subtitleContent}</Subtitle>
    );

    const bodyResult = container.querySelector<HTMLParagraphElement>('p');
    expect(bodyResult!.textContent).toEqual(subtitleContent);
    expect(bodyResult!.classList).toContain('MuiTypography-alignCenter');
  });
});
