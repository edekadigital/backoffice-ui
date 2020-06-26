import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { FormFieldSet, FormRow } from '..';
import { render } from '../test-utils';

const title = 'some title';
const label = 'another label';
const label2 = 'some label';

describe('<FormFieldSet/>', () => {
  afterEach(cleanup);

  it('should render the form field set with title', () => {
    const { getByText } = render(
      <FormFieldSet title={title}>
        <FormRow>
          <div>{label}</div>
          <div>{label2}</div>
        </FormRow>
      </FormFieldSet>
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(label)).toBeTruthy();
    expect(getByText(label2)).toBeTruthy();
  });

  it('should render multiple form field sets', () => {
    const { getAllByText } = render(
      <div>
        <FormFieldSet title={title}>
          <FormRow>
            <div>{label}</div>
            <div>{label}</div>
          </FormRow>
          <FormRow>
            <div>{label}</div>
            <div>{label}</div>
          </FormRow>
        </FormFieldSet>
        <FormFieldSet>
          <FormRow>
            <div>{label2}</div>
            <div>{label2}</div>
          </FormRow>
          <FormRow>
            <div>{label2}</div>
            <div>{label2}</div>
          </FormRow>
        </FormFieldSet>
      </div>
    );

    expect(getAllByText(title)).toHaveLength(1);
    expect(getAllByText(label)).toHaveLength(4);
    expect(getAllByText(label2)).toHaveLength(4);
  });
});
