import * as React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test-utils';
import { Button, TitleBar } from '..';

describe('<TitleBar/>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId, queryByTestId } = render(
      <TitleBar gutterBottom>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-title').textContent).toBe('lorem');
    expect(queryByTestId('titleBar-backButton')).toBeFalsy();
    expect(queryByTestId('titleBar-info')).toBeFalsy();
    expect(queryByTestId('titleBar-additionalContent')).toBeFalsy();
    expect(queryByTestId('titleBar-actions')).toBeFalsy();
  });

  it('should render with floating reverse navigation', () => {
    const onBackClickFn = jest.fn();
    const { getByTestId } = render(
      <TitleBar onBackClick={onBackClickFn}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-title').textContent).toBe('lorem');
    expect(getByTestId('titleBar-backButton')).toBeTruthy();
    userEvent.click(getByTestId('titleBar-backButton'));
    expect(onBackClickFn).toHaveBeenCalledTimes(1);
  });

  it('should render without floating reverse navigation', () => {
    const onBackClickFn = jest.fn();
    const { getByTestId } = render(
      <TitleBar onBackClick={onBackClickFn} floatingBackButton={false}>
        lorem
      </TitleBar>
    );
    expect(getByTestId('titleBar-title').textContent).toBe('lorem');
    expect(getByTestId('titleBar-backButton')).toBeTruthy();
    userEvent.click(getByTestId('titleBar-backButton'));
    expect(onBackClickFn).toHaveBeenCalledTimes(1);
  });

  it('should render with single additional content element', () => {
    const additionalContent = <div data-testid="node" />;
    const { getByTestId } = render(
      <TitleBar additionalContent={additionalContent}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-additionalContent')).toBeTruthy();
    expect(getByTestId('node')).toBeTruthy();
  });

  it('should render with multiple additional content elements', () => {
    const additionalContent = (
      <>
        <div data-testid="element1" />
        <div data-testid="element2" />
      </>
    );
    const { getByTestId } = render(
      <TitleBar additionalContent={additionalContent}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-additionalContent')).toBeTruthy();
    expect(getByTestId('element1')).toBeTruthy();
    expect(getByTestId('element2')).toBeTruthy();
  });
  it('should render with single action item', () => {
    const clickFn = jest.fn();
    const label = 'label';
    const actions = (
      <Button onClick={clickFn} data-testid="actionButton">
        {label}
      </Button>
    );
    const { getByTestId } = render(
      <TitleBar actions={actions}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-actions')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0')).toBeTruthy();
    expect(getByTestId('actionButton')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0').textContent).toBe(label);
    userEvent.click(getByTestId('actionButton'));
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  it('should render with multiple action items', () => {
    const clickFn1 = jest.fn();
    const clickFn2 = jest.fn();
    const label1 = 'label1';
    const label2 = 'label2';
    const actions = (
      <>
        <Button onClick={clickFn1} data-testid="actionButton1">
          {label1}
        </Button>
        <Button onClick={clickFn2} data-testid="actionButton2">
          {label2}
        </Button>
      </>
    );
    const { getByTestId } = render(
      <TitleBar actions={actions}>lorem</TitleBar>
    );
    expect(getByTestId('titleBar-actions')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-1')).toBeTruthy();
    expect(getByTestId('actionButton1')).toBeTruthy();
    expect(getByTestId('actionButton2')).toBeTruthy();
    expect(getByTestId('titleBar-actionItem-0').textContent).toBe(label1);
    expect(getByTestId('titleBar-actionItem-1').textContent).toBe(label2);
    userEvent.click(getByTestId('actionButton1'));
    userEvent.click(getByTestId('actionButton2'));
    expect(clickFn1).toHaveBeenCalledTimes(1);
    expect(clickFn2).toHaveBeenCalledTimes(1);
  });

  it('should render with action items caption element', () => {
    const label = 'label';
    const actions = (
      <Button onClick={jest.fn()} data-testid="actionButton">
        {label}
      </Button>
    );

    const actionsCaption = <div data-testid="actionsCaption" />;
    const { getByTestId } = render(
      <TitleBar actions={actions} actionsCaption={actionsCaption}>
        lorem
      </TitleBar>
    );
    expect(getByTestId('titleBar-actions')).toBeTruthy();
    expect(getByTestId('titleBar-actionsCaption')).toBeTruthy();
    expect(getByTestId('actionButton')).toBeTruthy();
  });
});
