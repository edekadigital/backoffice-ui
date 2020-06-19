import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Body } from '..';

const bodyContent = 'test content';
const bodyId = 'body-test-id';

describe('<Body />', () => {
  afterEach(cleanup);

  it('should render the body component', () => {
    const { getByText } = render(
      <Body data-testid={bodyId}>{bodyContent}</Body>
    );

    expect(getByText(bodyContent)!).toBeTruthy();
  });

  it('should render the body component with primary color', () => {
    const { getByTestId } = render(
      <Body color={'primary'} data-testid={bodyId}>
        {bodyContent}
      </Body>
    );

    expect(getByTestId(bodyId)!.classList).toContain(
      'MuiTypography-colorPrimary'
    );
  });
});
