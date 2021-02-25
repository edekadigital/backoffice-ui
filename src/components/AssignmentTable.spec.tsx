import * as React from 'react';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import { AssignmentTable } from './AssignmentTable';

function getCheckbox(el: HTMLElement) {
  const checkbox = el.querySelector<HTMLInputElement>('input[type="checkbox"]');
  if (!checkbox) {
    throw new Error(`Unable to select input[type="checkbox"] in Element ${el}`);
  }
  return checkbox;
}

describe('<AssignmentTable />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(<AssignmentTable columns={[]} rows={[]} />);
    expect(container).toBeTruthy();
  });

  it('should render the headline', () => {
    const { getByTestId } = render(
      <AssignmentTable columns={[]} rows={[]} headline="Some headline" />
    );
    const headline = getByTestId('assignmentTable-headline');
    expect(headline.textContent).toBe('Some headline');
  });

  it('should render action item and call action handler', () => {
    const handler = jest.fn();

    const { getByTestId } = render(
      <AssignmentTable
        columns={[]}
        rows={[]}
        actions={[{ label: 'Action label', handler }]}
      />
    );

    const action = getByTestId('assignmentTable-actions-0');
    expect(action.textContent).toBe('Action label');

    expect(handler).toBeCalledTimes(0);
    userEvent.click(action);
    expect(handler).toBeCalledTimes(1);
  });

  it('should render columns and rows properly', () => {
    const { getByTestId } = render(
      <AssignmentTable
        columns={[
          { accessor: 'a', label: 'Some label (a)' },
          { accessor: 'b', label: 'Some label (b)' },
        ]}
        rows={[
          { label: 'Item 1', values: { a: true, b: false } },
          { label: 'Item 2', values: { a: false, b: true } },
        ]}
      />
    );

    const headColumn1 = getByTestId('assignmentTable-head-column-0');
    const headColumn2 = getByTestId('assignmentTable-head-column-1');
    expect(headColumn1.textContent).toBe('Some label (a)');
    expect(headColumn2.textContent).toBe('Some label (b)');

    const rowLabel1 = getByTestId('assignmentTable-row-0-label');
    const rowLabel2 = getByTestId('assignmentTable-row-1-label');
    expect(rowLabel1.textContent).toBe('Item 1');
    expect(rowLabel2.textContent).toBe('Item 2');

    const checkboxA1 = getCheckbox(
      getByTestId('assignmentTable-row-0-column-0')
    );
    const checkboxB1 = getCheckbox(
      getByTestId('assignmentTable-row-0-column-1')
    );
    const checkboxA2 = getCheckbox(
      getByTestId('assignmentTable-row-1-column-0')
    );
    const checkboxB2 = getCheckbox(
      getByTestId('assignmentTable-row-1-column-1')
    );

    expect(checkboxA1.checked).toBeTruthy();
    expect(checkboxB1.checked).toBeFalsy();

    expect(checkboxA2.checked).toBeFalsy();
    expect(checkboxB2.checked).toBeTruthy();
  });

  it('should use accessor as fallback label', () => {
    const { getByTestId } = render(
      <AssignmentTable
        columns={[{ accessor: 'a' }, { accessor: 'b' }]}
        rows={[]}
      />
    );

    const headColumn1 = getByTestId('assignmentTable-head-column-0');
    const headColumn2 = getByTestId('assignmentTable-head-column-1');
    expect(headColumn1.textContent).toBe('a');
    expect(headColumn2.textContent).toBe('b');
  });

  it('should render abbrevation', () => {
    const { getByTestId } = render(
      <AssignmentTable
        columns={[
          { accessor: 'a', abbreviation: 'A', label: 'Some label (a)' },
          { accessor: 'b', abbreviation: 'B', label: 'Some label (b)' },
        ]}
        rows={[]}
      />
    );

    const headColumn1 = getByTestId('assignmentTable-head-column-0');
    const headColumn2 = getByTestId('assignmentTable-head-column-1');
    expect(headColumn1.textContent).toBe('A');
    expect(headColumn2.textContent).toBe('B');
  });

  it('should call change handler', () => {
    const changeHandler = jest.fn();

    const { getByTestId } = render(
      <AssignmentTable
        columns={[{ accessor: 'a', label: 'Some label (a)' }]}
        rows={[
          { label: 'Item 1', values: { a: true } },
          { label: 'Item 2', values: { a: false } },
        ]}
        onChange={changeHandler}
      />
    );

    const checkboxA1 = getCheckbox(
      getByTestId('assignmentTable-row-0-column-0')
    );
    const checkboxA2 = getCheckbox(
      getByTestId('assignmentTable-row-1-column-0')
    );

    /**
     * Initial state
     */
    expect(checkboxA1.checked).toBeTruthy();
    expect(checkboxA2.checked).toBeFalsy();
    expect(changeHandler).toBeCalledTimes(0);

    /**
     * First interaction
     */
    userEvent.click(checkboxA1);
    expect(changeHandler).toBeCalledTimes(1);
    const [rowIndex1, accessor1, checked1] = changeHandler.mock.calls[0];
    expect(rowIndex1).toBe(0);
    expect(accessor1).toBe('a');
    expect(checked1).toBe(false);

    /**
     * Second interaction
     */
    userEvent.click(checkboxA2);
    expect(changeHandler).toBeCalledTimes(2);
    const [rowIndex2, accessor2, checked2] = changeHandler.mock.calls[1];
    expect(rowIndex2).toBe(1);
    expect(accessor2).toBe('a');
    expect(checked2).toBe(true);
  });
});
