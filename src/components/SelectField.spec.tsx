import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { SelectField } from '..';
import { render } from '../test-utils';

const label = 'Some Label';
const items = [
  { value: '', label: 'Keine Angabe' },
  { value: 'n1', label: 'Manuel Neuer' },
  { value: 't6', label: 'Thiago' },
  { value: 'r9', label: 'Robert Lewandowski' },
];

const emptyItems = [{ value: '', label: '' }];

describe('<SelectField/>', () => {
  afterEach(cleanup);

  it('should render the select field component', () => {
    const { container } = render(
      <SelectField label={label} menuItems={items} />
    );

    const labelResult = container.querySelector<HTMLLabelElement>('label');
    expect(labelResult!.textContent).toEqual(label);
  });

  it('should render the select field component in disabled mode', () => {
    const { container } = render(
      <SelectField label={label} menuItems={items} disabled={true} />
    );

    const diabledInput = container.querySelector<HTMLInputElement>('input');
    expect(diabledInput!.type).toEqual('hidden');
  });

  it('should render the select field component with preselected item and disabled', () => {
    const { container } = render(
      <SelectField
        label={label}
        menuItems={items}
        value={'t6'}
        disabled={true}
      />
    );

    const preselectedValue = container.querySelectorAll<HTMLDivElement>('div');
    expect(preselectedValue.item(2)!.textContent).toEqual(items[2].label);
  });

  it('should render the select field component without items', () => {
    const { container } = render(
      <SelectField label={label} menuItems={emptyItems} />
    );

    const labelResult = container.querySelector<HTMLLabelElement>('label');
    expect(labelResult!.textContent).toEqual(label);
  });
});
