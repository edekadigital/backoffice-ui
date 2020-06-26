import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ContentGroup, FormRow, TextField } from '..';
import { render } from '../test-utils';

describe('<ContentGroup/>', () => {
  afterEach(cleanup);

  const title = 'test title';
  const label = 'test label';
  const label2 = 'test label2';

  it('should render the content group component with title', () => {
    const { getByTestId } = render(
      <ContentGroup title={title}>
        <div>test</div>
      </ContentGroup>
    );

    expect(getByTestId('contentGroup-title').textContent).toEqual(title);
  });

  it('should render the content group component title tag', () => {
    const { getByTestId } = render(
      <ContentGroup>
        <div data-testid="title-id">{title}</div>
      </ContentGroup>
    );

    expect(getByTestId('title-id').textContent).toEqual(title);
  });

  it('should render content group with children items and title', () => {
    const { getByTestId } = render(
      <ContentGroup title={title}>
        <FormRow>
          <div data-testid="label1">{label}</div>
        </FormRow>
        <FormRow>
          <div data-testid="label2">{label2}</div>
        </FormRow>
      </ContentGroup>
    );

    expect(getByTestId('label1').textContent).toEqual(label);
    expect(getByTestId('label2').textContent).toEqual(label2);
    expect(getByTestId('contentGroup-title').textContent).toEqual(title);
  });
});
