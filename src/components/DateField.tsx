import * as React from 'react';
import NumberFormat from 'react-number-format';
import { TextField } from './TextField';
export interface DateFieldProps {
  /**
   * The label content.
   */
  label?: string;
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   */
  autoComplete?: string;
  /**
   * The default value of the input element.
   */
  defaultValue?: string | number;
  /**
   * If `true`, the input element will be `disabled`.
   */
  disabled?: boolean;
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean;
  /**
   * The helper text content.
   */
  helperText?: string;
  /**
   * The `id` of the input element. Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id?: string;
  /**
   * Pass a ref to the input element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Overwrites the default `data-testid` for the input element.
   */
  inputTestId?: string;
  /**
   * Name attribute of the input element.
   */
  name?: string;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the input element will be required
   */
  required?: boolean;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: string | number;
}

export const DateField: React.FC<DateFieldProps> = (props) => {
  const handleButtonKeyPress = (event: React.KeyboardEvent) => {
    /* istanbul ignore next */
    const createNewEvent = (eventName: string) => {
      let event;
      if (typeof Event === 'function') {
        event = new Event(eventName, { bubbles: true });
      } else {
        // IE11 polyfill
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
      }
      return event;
    };

    const { key, target } = event;
    const { selectionStart, value } = target as HTMLInputElement;
    const rawValue = value.replace(/\D/g, '');
    if (key === '.' && (rawValue.length === 1 || rawValue.length === 3)) {
      event.preventDefault();
      const newValue = `${value.slice(0, selectionStart! - 1)}0${value.substr(
        selectionStart! - 1,
        value.length
      )}.`;

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )!.set;
      nativeInputValueSetter!.call(event.target, newValue);

      const e = createNewEvent('input');
      event.target.dispatchEvent(e);
    }
  };

  const formatInput = (input: string) => {
    const limitAndFill = (value: string, part: 'day' | 'month') => {
      const maxValue = part === 'day' ? '31' : '12';

      if (value.length === 1 && value[0] > maxValue[0]) {
        value = '0' + value;
      }
      if (value.length === 2 && Number(value) > Number(maxValue)) {
        value = '0' + value[0];
        if (part === 'day') {
          input = value + input.substr(1);
        }
        if (part === 'month') {
          input = input.substr(0, 2) + value + input.substr(3);
        }
      }
      return value;
    };

    const day = limitAndFill(input.substring(0, 2), 'day');
    const month = limitAndFill(input.substring(2, 4), 'month');
    const year = input.substring(4, 8);

    return (
      day + (month.length ? '.' + month : '') + (year.length ? '.' + year : '')
    );
  };

  return (
    <NumberFormat
      format={formatInput}
      onKeyDown={handleButtonKeyPress}
      customInput={TextField}
      type="text"
      {...props}
    />
  );
};
