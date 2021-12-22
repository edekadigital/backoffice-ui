import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ConnectedBoxesList } from './ConnectedBoxesList';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('<ConnectedBoxesList />', () => {
  afterEach(cleanup);

  it('should render a basic setup.', () => {
    const { getByTestId, getAllByTestId } = render(
      <ConnectedBoxesList
        boxesContents={[
          <div key={1} data-testid="content1">
            Hello
          </div>,
          <div key={2} data-testid="content2">
            Hello
          </div>,
        ]}
        addButtonLabel="Hinzufügen"
        connectBoxes
        connectionLabel="und"
        testId="connected-boxes"
        onAdd={() => {}}
        onRemove={() => {}}
      />
    );

    expect(getByTestId('connected-boxes')).not.toBeNull();
    expect(getByTestId('box-add')).not.toBeNull();
    expect(getAllByTestId('box-remove')).toHaveLength(2);
    expect(getAllByTestId('box-connector')).toHaveLength(2);
    expect(getByTestId('content1')).not.toBeNull();
    expect(getByTestId('content2')).not.toBeNull();
  });

  it('should be able to not render the connector boxes, if disabled.', () => {
    const { queryByTestId } = render(
      <ConnectedBoxesList
        boxesContents={[
          <div key={1} data-testid="content1">
            Hello
          </div>,
          <div key={2} data-testid="content2">
            Hello
          </div>,
        ]}
        addButtonLabel="Hinzufügen"
        connectBoxes={false}
        connectionLabel="und"
        testId="connected-boxes"
        onAdd={() => {}}
        onRemove={() => {}}
      />
    );

    expect(queryByTestId('box-connector')).toBeNull();
  });

  it('should be able to not render the add button, if disabled.', () => {
    const { queryAllByTestId } = render(
      <ConnectedBoxesList
        boxesContents={[
          <div key={1} data-testid="content1">
            Hello
          </div>,
          <div key={2} data-testid="content2">
            Hello
          </div>,
        ]}
        addButtonLabel="Hinzufügen"
        connectionLabel="und"
        testId="connected-boxes"
        onAdd={() => {}}
        onRemove={() => {}}
        hideAddButton
      />
    );

    expect(queryAllByTestId('box-connector')).toHaveLength(1);
  });

  it('should render the connector boxes, if not specifically set.', () => {
    const { queryAllByTestId } = render(
      <ConnectedBoxesList
        boxesContents={[
          <div key={1} data-testid="content1">
            Hello
          </div>,
          <div key={2} data-testid="content2">
            Hello
          </div>,
        ]}
        addButtonLabel="Hinzufügen"
        connectionLabel="und"
        testId="connected-boxes"
        onAdd={() => {}}
        onRemove={() => {}}
      />
    );

    expect(queryAllByTestId('box-connector')).toHaveLength(2);
  });

  it('calls the respective callbacks on click', () => {
    const handleAddCallback = jest.fn();
    const handleRemoveCallback = jest.fn();

    const { getByTestId } = render(
      <ConnectedBoxesList
        boxesContents={[
          <div key={1} data-testid="content1">
            Hello
          </div>,
        ]}
        addButtonLabel="Hinzufügen"
        connectBoxes
        connectionLabel="und"
        testId="connected-boxes"
        onAdd={handleAddCallback}
        onRemove={handleRemoveCallback}
      />
    );

    const addButton = getByTestId('box-add');
    const removeButton = getByTestId('box-remove');

    userEvent.click(addButton);
    userEvent.click(removeButton);

    expect(handleAddCallback).toHaveBeenCalled();
    expect(handleRemoveCallback).toHaveBeenCalled();
  });
});
