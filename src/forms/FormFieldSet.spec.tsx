import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { FormFieldSet, FormRow, TextField } from '..';
import { render } from '../test-utils';

const title = 'some title';
const label = 'another label';
const label2 = 'some label';

describe('<FormFieldSet/>', () => {
  afterEach(cleanup);

  it('should render the form field set with title', () => {
    const { getByText, container } = render(
      <FormFieldSet title={title}>
        <FormRow>
          <TextField label={label} />
          <TextField label={label2} />
        </FormRow>
      </FormFieldSet>
    );

    expect(getByText(title)!).toBeTruthy();
    expect(getByText(label)!).toBeTruthy();
    expect(getByText(label2)!).toBeTruthy();
    const titleResult = container.querySelectorAll<HTMLDivElement>('div');
    expect(titleResult!.item(1).className).toContain(
      'MuiTypography-root makeStyles-title-'
    );
  });

  it('should render multiple form field sets', () => {
    const { queryByText } = render(
      <div>
        <FormFieldSet title={title}>
          <FormRow>
            <TextField label={'label'} />
            <TextField label={label} />
          </FormRow>
          <FormRow>
            <TextField label={'label'} />
            <TextField label={'label'} />
          </FormRow>
        </FormFieldSet>
        <FormFieldSet>
          <FormRow>
            <TextField label={'label2'} />
            <TextField label={'label2'} />
          </FormRow>
          <FormRow>
            <TextField label={'label2'} />
            <TextField label={label2} />
          </FormRow>
        </FormFieldSet>
      </div>
    );

    expect(queryByText(title)!).toBeTruthy();
    expect(queryByText(label)!).toBeTruthy();
    expect(queryByText(label2)!).toBeTruthy();
  });
});
