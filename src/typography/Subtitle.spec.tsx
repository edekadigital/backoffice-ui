import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Subtitle } from '..';

const subtitleContent = 'test content';
const subtitleId = 'subtitle-test-id';

describe('<Subtitle/>', () => {
  afterEach(cleanup);

  it('should render the subtitle component', () => {
    const { getByText } = render(<Subtitle>{subtitleContent}</Subtitle>);

    expect(getByText(subtitleContent)!).toBeTruthy();
  });

  it('should render the subtitle component with secondary color', () => {
    const { getByTestId } = render(
      <Subtitle
        color="secondary"
        data-testid={subtitleId}
      >
        {subtitleContent}
      </Subtitle>
    );

    expect(getByTestId(subtitleId)!.textContent).toEqual(subtitleContent);
    expect(getByTestId(subtitleId)!.classList).toContain('MuiTypography-colorSecondary');
  });

  it('should render the subtitle component with align center', () => {
    const { getByTestId } = render(
      <Subtitle
        align="center"
        data-testid={subtitleId}
      >
        {subtitleContent}
      </Subtitle>
    );

    expect(getByTestId(subtitleId)!.textContent).toEqual(subtitleContent);
    expect(getByTestId(subtitleId)!.classList).toContain('MuiTypography-alignCenter');
  });
});
