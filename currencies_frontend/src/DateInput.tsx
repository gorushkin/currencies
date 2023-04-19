import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
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

export const DateInput: InputType<Dayjs | null> = ({ value, onChange, isActive, onClick }) => {
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (event: Dayjs | null) => {
    if (!event) return;
    const isInputValid = event.isValid();
    onChange({ isValid: isInputValid, value: event, name: 'date' });
  };

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
