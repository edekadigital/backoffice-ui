import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { TabNavigation } from '..';
import { render } from '../test-utils';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

const naviItems = [
  { value: 1, label: 'Manuel Neuer', disabled: true },
  { value: 2, label: 'Thiago' },
  { value: 3, label: 'Robert Lewandowski' },
];

describe('<TabNavigation/>', () => {
  afterEach(cleanup);

  it('should render the tab navigation field component', () => {
    const handleChange = jest.fn();

    const TestComponent = () => {
      const [value, setValue] = useState(1);

      handleChange.mockImplementation(
        (event: React.ChangeEvent<{}>, newValue: number) => {
          setValue(newValue);
        }
      );

      return (
        <div>
          <TabNavigation
            value={value}
            items={naviItems}
            gutterBottom={true}
            onChange={handleChange}
          />
          <div hidden={naviItems[1].value !== 1}>Tab 1</div>
          <div hidden={naviItems[1].value !== 2}>Tab 2</div>
          <div hidden={naviItems[1].value !== 3}>Tab 3</div>
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('Manuel Neuer').closest('button')).toBeDisabled();
    expect(getByText('Thiago').closest('button')).toBeEnabled();
    expect(getByText('Robert Lewandowski').closest('button')).toBeEnabled();

    userEvent.click(getByText('Manuel Neuer'));
    expect(handleChange).toBeCalledTimes(0);

    userEvent.click(getByText('Thiago'));
    expect(handleChange).toBeCalledTimes(1);

    userEvent.click(getByText('Robert Lewandowski'));
    expect(handleChange).toBeCalledTimes(2);
  });

  it('should render the tab navigation field component without gutter bottom', () => {
    const handleChange = jest.fn();

    const TestComponent = () => {
      const [value, setValue] = useState(1);

      handleChange.mockImplementation(
        (event: React.ChangeEvent<{}>, newValue: number) => {
          setValue(newValue);
        }
      );

      return (
        <div>
          <TabNavigation
            value={value}
            items={naviItems}
            onChange={handleChange}
          />
          <div hidden={naviItems[1].value !== 1}>Tab 1</div>
          <div hidden={naviItems[1].value !== 2}>Tab 2</div>
          <div hidden={naviItems[1].value !== 3}>Tab 3</div>
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);
    userEvent.click(getByText('Thiago'));
    expect(handleChange).toBeCalledTimes(1);
  });
});
