import * as React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { ButtonBar } from '..';

describe('<ButtonBar />', () => {
  afterEach(cleanup);

  const testButton1 = 'button-id-1';
  const testButton2 = 'button-id-2';
  const textButton1 = 'Erster Button';
  const textButton2 = 'Zweiter Button';

  it('should render the button bar component', () => {
    const { getByTestId } = render(
      <ButtonBar>
        <div data-testid={testButton1}>{textButton1}</div>
        <div data-testid={testButton2}>{textButton2}</div>
      </ButtonBar>
    );

    const button = getByTestId(testButton1);
    expect(button).toBeTruthy();
    const button2 = getByTestId(testButton2);
    expect(button2).toBeTruthy();
  });

  it('should notice clicked button in button bar', () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    const { getByTestId } = render(
      <ButtonBar>
        <div data-testid={testButton1} onClick={handleClick}>
          {textButton1}
        </div>
      </ButtonBar>
    );

    fireEvent.click(getByTestId(testButton1));
    expect(clicked).toBe(true);
  });
});
