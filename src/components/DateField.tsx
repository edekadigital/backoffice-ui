import * as React from 'react';
import NumberFormat from 'react-number-format';
import { TextField, TextFieldProps } from './TextField';

export type DateFieldProps = Omit<TextFieldProps, 'type' | 'adornment'>;

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
