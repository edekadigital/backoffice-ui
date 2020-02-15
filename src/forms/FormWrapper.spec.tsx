import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { FormFieldSet, FormRow, FormWrapper, TextField } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

const labelSubmit = 'submit';
const labelCancel = 'cancel';
const title = 'title';
const label = 'label';
const label2 = 'label2';

describe('<FormWrapper/>', () => {
  afterEach(cleanup);

  it('should render an empty form wrapper component', () => {
    let submit = false;
    let cancel = false;
    const onSubmit = () => {
      submit = true;
    };

    const onCancel = () => {
      cancel = true;
    };

    const { container } = render(
      <FormWrapper
        cancelLabel={labelCancel}
        onCancel={onCancel}
        submitLabel={labelSubmit}
        onSubmit={onSubmit}
      />
    );

    const buttons = container.querySelectorAll<HTMLButtonElement>('button');
    expect(buttons!.item(0).textContent).toEqual(labelSubmit);
    expect(buttons!.item(1).textContent).toEqual(labelCancel);

    userEvent.click(buttons.item(0));
    userEvent.click(buttons.item(1));
    expect(submit).toEqual(true);
    expect(cancel).toEqual(true);
  });

  it('should render an  form wrapper component with content', () => {
    let submit = false;
    let cancel = false;
    const onSubmit = () => {
      submit = true;
    };

    const onCancel = () => {
      cancel = true;
    };

    const { container } = render(
      <FormWrapper
        cancelLabel={labelCancel}
        onCancel={onCancel}
        submitLabel={labelSubmit}
        onSubmit={onSubmit}
      >
        <FormFieldSet title={title}>
          <FormRow>
            <TextField label={label} />
            <TextField label={label2} />
          </FormRow>
        </FormFieldSet>
      </FormWrapper>
    );

    const buttons = container.querySelectorAll<HTMLButtonElement>('button');
    expect(buttons!.item(0).textContent).toEqual(labelSubmit);
    expect(buttons!.item(1).textContent).toEqual(labelCancel);

    userEvent.click(buttons.item(0));
    userEvent.click(buttons.item(1));
    expect(submit).toEqual(true);
    expect(cancel).toEqual(true);
  });
});
