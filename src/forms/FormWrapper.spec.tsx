import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { FormRow, FormWrapper, TextField } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

const labelSubmit = 'submit';
const labelCancel = 'cancel';
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

    const { getByTestId } = render(
      <FormWrapper
        cancelLabel={labelCancel}
        onCancel={onCancel}
        submitLabel={labelSubmit}
        onSubmit={onSubmit}
      />
    );

    expect(getByTestId('formWrapper-submit').textContent).toEqual(labelSubmit);
    expect(getByTestId('formWrapper-cancel').textContent).toEqual(labelCancel);

    userEvent.click(getByTestId('formWrapper-submit'));
    userEvent.click(getByTestId('formWrapper-cancel'));
    expect(submit).toEqual(true);
    expect(cancel).toEqual(true);
  });

  it('should render a form wrapper component with content', () => {
    let submit = false;
    const onSubmit = () => {
      submit = true;
    };

    const { getByTestId } = render(
      <FormWrapper
        cancelLabel={labelCancel}
        submitLabel={labelSubmit}
        onSubmit={onSubmit}
      >
        <FormRow>
          <TextField label={label} />
          <TextField label={label2} />
        </FormRow>
      </FormWrapper>
    );

    expect(getByTestId('formWrapper-submit').textContent).toEqual(labelSubmit);

    userEvent.click(getByTestId('formWrapper-submit'));
    expect(submit).toEqual(true);
  });
});
