import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Body } from '..';

const bodyContent = 'test content';

describe('<Body />', () => {
  afterEach(cleanup);

  it('should render the body component', () => {
    const { container } = render(
      <Body>
        <p>{bodyContent}</p>
      </Body>
    );

    const content = container.querySelector<HTMLParagraphElement>('p');
    expect(content!.textContent).toEqual(bodyContent);
  });

  it('should render the body component with primary color', () => {
    const { container } = render(
      <Body color={'primary'}>
        <p>{bodyContent}</p>
      </Body>
    );

    const bodyResult = container.querySelector<HTMLParagraphElement>('p');
    expect(bodyResult!.textContent).toEqual(bodyContent);
    expect(bodyResult!.classList).toContain('MuiTypography-colorPrimary');
  });
});
