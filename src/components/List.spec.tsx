import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ListItem, List } from '..';

describe('<List/>', () => {
  afterEach(cleanup);

  it('should render the List component', () => {
    const { getByTestId } = render(
      <List>
        <ListItem text="Foo" />
      </List>
    );

    expect(getByTestId('list')).toBeTruthy();
    expect(getByTestId('listItem')).toBeTruthy();
  });
});
