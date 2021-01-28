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
    const { getByTestId } = render(
      <SelectField label={label} menuItems={items} />
    );

    expect(getByTestId('textField-label').textContent).toEqual(label);
  });

  it('should render the select field component in disabled mode', () => {
    const { getByTestId } = render(
      <SelectField label={label} menuItems={items} disabled={true} />
    );
    expect(getByTestId('textField-input').parentElement?.classList).toContain(
      'Mui-disabled'
    );
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
    const { getByTestId } = render(
      <SelectField label={label} menuItems={emptyItems} />
    );

    expect(getByTestId('textField-label').textContent).toEqual(label);
  });

  it('should render the select field component with default value', () => {
    const { getByTestId } = render(
      <SelectField
        label={label}
        menuItems={items}
        defaultValue={items[1].value}
      />
    );

    expect(getByTestId('textField-input').textContent).toBe(items[1].label);
  });
});
