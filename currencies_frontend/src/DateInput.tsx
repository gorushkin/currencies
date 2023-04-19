import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { InputType } from './types';
import { useEffect, useRef } from 'react';

/*
  Awaited<>
  ReturnType<typeof func>
  ConstructorParameters<typeof String>
  InstanceType<typeof String>
  Paremeters<typeof func>
  ReadonlyArray<string>
  Readonly<string>
  Partial<{ a: string }>
  Required<{ a?: string }>
  NonNullable<string | null>
*/

export const DateInput: InputType<Dayjs> = ({ value, onChange, isActive }) => {
  const handleChange = (event: Dayjs | null) => {
    if (!event) return;
    const isValueValid = dayjs(event).isValid();
    console.log('isValueValid: ', isValueValid);
    onChange({ value: event, name: 'date', isValid: isValueValid });
  };

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input.current || !isActive) return;
    input.current.focus();
  }, [isActive]);

  return (
    <DatePicker
      disableFuture
      label='Date'
      onChange={handleChange}
      className='input_date'
      value={value}
      inputRef={input}
    />
  );
};
