import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { FormRow } from '..';
import { render } from '../test-utils';

const label = 'some label';
const label2 = 'another label';
const label3 = 'some other label';
const label4 = 'and the last label';

describe('<FormRow/>', () => {
  afterEach(cleanup);

  it('should render the form row', () => {
    const { getByText } = render(
      <FormRow>
        <div>{label}</div>
        <div>{label2}</div>
      </FormRow>
    );

    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
  });

  it('should render the form row with multiple children items', () => {
    const { getByText } = render(
      <>
        <FormRow>
          <div>{label}</div>
        </FormRow>
        <FormRow>
          <div>{label2}</div>
        </FormRow>
      </>
    );

    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
  });

  it('should render the form row with width as number', () => {
    const { getByText } = render(
      <FormRow maxWidth={20} gutterBottom={true}>
        <div>{label}</div>
        <div>{label2}</div>
      </FormRow>
    );

    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
  });

  it('should render the form row with more children than layout can handle', () => {
    const { getByText } = render(
      <FormRow maxWidth={20} gutterBottom={true} gridLayout={[2, 2, 2, 2, 2]}>
        <div>{label}</div>
        <div>{label2}</div>
        <div>{label3}</div>
        <div>{label4}</div>
      </FormRow>
    );

    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
    expect(getByText(label3)!).toBeTruthy();
    expect(getByText(label4)!).toBeTruthy();
  });

  it('should render the form row with width as a string', () => {
    const { getByTestId, getByText } = render(
      <FormRow maxWidth={'md'} gutterBottom={true}>
        <div>{label}</div>
        <div>{label2}</div>
      </FormRow>
    );
    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
    expect(getByTestId('formRow-item-0').classList[4]).toContain(
      'MuiGrid-grid-md-'
    );
  });
});
