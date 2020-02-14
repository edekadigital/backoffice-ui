import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ContentGroup, FormRow, TextField } from '..';
import { render } from '../test-utils';

describe('<ContentGroup />', () => {
  afterEach(cleanup);

  const title = 'test title';
  const label = 'test label';
  const label2 = 'test label2';

  it('should render the content group component with title', () => {
    const { container } = render(<ContentGroup title={title} />);

    const result = container.querySelector<HTMLHeadingElement>('h3');
    expect(result!.textContent).toEqual(title);
  });

  it('should render the content group component title tag', () => {
    const { container } = render(
      <ContentGroup>
        <div>{title}</div>
        <title>{title}</title>
      </ContentGroup>
    );

    const resultTitle = container.querySelector<HTMLTitleElement>('title');
    expect(resultTitle!.textContent).toEqual(title);
    const resultDiv = container.querySelector<HTMLDivElement>('div');
    expect(resultDiv!.textContent).toEqual(title + title);
  });

  it('should render content group with children items and title', () => {
    const { container } = render(
      <ContentGroup title={title}>
        <FormRow widths={[10, 4]}>
          <TextField label={label} />
        </FormRow>
        <FormRow widths={[8, 3]}>
          <TextField label={label2}>blablub</TextField>
        </FormRow>
      </ContentGroup>
    );
    const result = container.querySelectorAll<HTMLLabelElement>('label');
    expect(result!.item(0).textContent).toEqual(label);
    expect(result!.item(1).textContent).toEqual(label2);

    const resultTitle = container.querySelector<HTMLHeadingElement>('h3');
    expect(resultTitle!.textContent).toEqual(title);
  });
  /*
  it('should render content group with fallback title', function () {
    const { container } = render(
      <ContentGroup>test</ContentGroup>
    );

    const result = container.querySelector<HTMLHeadingElement>('h5');
    result

  });*/
});
