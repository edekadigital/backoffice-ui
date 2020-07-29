import * as React from 'react';
import { cleanup } from '@testing-library/react';

import { render } from '../../test-utils';
import { ArrowBack } from '../../icons';
import { ServiceIcon } from './ServiceIcon';

describe('<ServiceIcon />', () => {
  afterEach(cleanup);

  it('should render the ServiceIcon component', () => {
    const { container } = render(<ServiceIcon icon={ArrowBack} />);
    expect(container).toBeTruthy();
  });

  it('should render the ServiceIcon component with svg', () => {
    const { getByTestId } = render(
      <ServiceIcon icon={ArrowBack} iconTestId={'serviceIcon'} />
    );
    expect(getByTestId('serviceIcon-icon')).toBeVisible();
  });

  it('should render the ServiceIcon component with image', () => {
    const { getByTestId } = render(
      <ServiceIcon
        icon={
          'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        }
        iconTestId={'serviceIcon'}
      />
    );
    const image = getByTestId('serviceIcon-img') as HTMLImageElement;
    expect(image.src).toBe(
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
  });

  it('should add className to element', () => {
    const { getByTestId } = render(
      <ServiceIcon
        icon={ArrowBack}
        className="my-class-name"
        iconTestId={'serviceIcon'}
      />
    );
    expect(getByTestId('serviceIcon')).toHaveClass('my-class-name');
  });
});
