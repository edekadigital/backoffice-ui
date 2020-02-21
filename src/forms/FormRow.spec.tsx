import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { FormRow, TextField } from '..';
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
        <TextField label={label} />
        <TextField label={label2} />
      </FormRow>
    );

    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
  });

  it('should render the form row with multiple children items', () => {
    const { getByText } = render(
      <>
        <FormRow>
          <TextField label={label} />
        </FormRow>
        <FormRow>
          <TextField label={label2} />
        </FormRow>
      </>
    );

    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
  });

  it('should render the form row with width as number', () => {
    const { getByText } = render(
      <FormRow maxWidth={20} gutterBottom={true}>
        <TextField label={label} />
        <TextField label={label2} />
      </FormRow>
    );

    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
  });

  it('should render the form row with more children than layout can handle', () => {
    const { getByText } = render(
      <FormRow maxWidth={20} gutterBottom={true} gridLayout={[2, 2, 2, 2, 2]}>
        <TextField label={label} />
        <TextField label={label2} />
        <TextField label={label3} />
        <TextField label={label4} />
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
        <TextField label={label} />
        <TextField label={label2} />
      </FormRow>
    );
    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
    expect(getByTestId('formRow-item-0').classList[4]).toContain(
      'MuiGrid-grid-md-'
    );
  });
});
