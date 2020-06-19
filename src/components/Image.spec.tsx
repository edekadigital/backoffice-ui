import * as React from 'react';
import { render } from '../test-utils';
import { cleanup } from '@testing-library/react';
import { Image } from '..';

const src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

describe('<Image />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const altText = 'Some alt text';
    const { container } = render(<Image src={src} alt={altText} />);
    const imageElement = container.querySelector<HTMLImageElement>('img');
    expect(imageElement!.alt).toEqual(altText);
  });

  it('should render the component (with multiple sources)', () => {
    const alt = 'Some alt text';

    const ImageProps = {
      src,
      alt,
      sources: [
        {
          srcSet: `${src} 2x, ${src}`,
        },
      ],
    };

    const { container } = render(<Image {...ImageProps} />);
    const imageElement = container.querySelector<HTMLImageElement>('img');
    const sourceElement = container.querySelector<HTMLSourceElement>('source');
    expect(imageElement!.alt).toEqual(alt);
    expect(imageElement!.src).toEqual(src);
    expect(sourceElement!.srcset).toEqual(ImageProps.sources[0].srcSet);
  });
});
