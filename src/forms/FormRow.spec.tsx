import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { FormRow, TextField } from '..';
import { render } from '../test-utils';

const label = 'some label';
const label2 = 'another label';

describe('<FormRow/>', () => {
  afterEach(cleanup);

  it('should render the form row', () => {
    const { container } = render(
      <FormRow>
        <TextField label={label} />
        <TextField label={label2} />
      </FormRow>
    );

    const result = container.querySelectorAll<HTMLLabelElement>('label');
    expect(result!.item(0).textContent).toEqual(label);
    expect(result!.item(1).textContent).toEqual(label2);
  });

  it('should render the form row with multiple children items', () => {
    const { container } = render(
      <>
        <FormRow>
          <TextField label={label} />
        </FormRow>
        <FormRow>
          <TextField label={label2} />
        </FormRow>
      </>
    );

    const result = container.querySelectorAll<HTMLLabelElement>('label');
    expect(result!.item(0).textContent).toEqual(label);
    expect(result!.item(1).textContent).toEqual(label2);
  });

  it('should render the form row with width as number', () => {
    const { container } = render(
      <FormRow maxWidth={20} gutterBottom={true}>
        <TextField label={label} />
        <TextField label={label2} />
      </FormRow>
    );

    const result = container.querySelectorAll<HTMLLabelElement>('label');
    expect(result!.item(0).textContent).toEqual(label);
    expect(result!.item(1).textContent).toEqual(label2);
  });

  it('should render the form row with more children than layout can handle', () => {
    const { container } = render(
      <FormRow maxWidth={20} gutterBottom={true} gridLayout={[2, 2, 2, 2, 2]}>
        <TextField label={label} />
        <TextField label={label2} />
        <TextField label={label} />
        <TextField label={label2} />
      </FormRow>
    );

    const result = container.querySelectorAll<HTMLLabelElement>('label');
    expect(result!.item(0).textContent).toEqual(label);
    expect(result!.item(1).textContent).toEqual(label2);
    expect(result!.item(2).textContent).toEqual(label);
    expect(result!.item(3).textContent).toEqual(label2);
  });

  it('should render the form row with width as a string', () => {
    const { getByTestId, container } = render(
      <FormRow maxWidth={'md'} gutterBottom={true}>
        <TextField label={label} />
        <TextField label={label2} />
      </FormRow>
    );

    const result = container.querySelectorAll<HTMLLabelElement>('label');
    expect(result!.item(0).textContent).toEqual(label);
    expect(result!.item(1).textContent).toEqual(label2);

    expect(getByTestId('formRow-item-0').classList[4]).toContain(
      'MuiGrid-grid-md-'
    );
  });
});
