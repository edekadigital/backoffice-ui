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
});
