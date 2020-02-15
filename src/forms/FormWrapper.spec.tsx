import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { FormFieldSet, FormRow, TextField } from '..';
import { render } from '../test-utils';

const title = 'some title';
const label = 'another label';
const label2 = 'some label';

describe('<Form/>', () => {
  afterEach(cleanup);

  it('should render the form field set with title', () => {
    const { container } = render(
      <FormFieldSet title={title}>
        <FormRow>
          <TextField label={label} />
          <TextField label={label2} />
        </FormRow>
      </FormFieldSet>
    );

    const result = container.querySelectorAll<HTMLLabelElement>('label');
    expect(result!.item(0).textContent).toEqual(label);
    expect(result!.item(1).textContent).toEqual(label2);

    const titleResult = container.querySelectorAll<HTMLDivElement>('div');
    expect(titleResult!.item(1).className).toContain(
      'MuiTypography-root makeStyles-title-'
    );
  });
});
