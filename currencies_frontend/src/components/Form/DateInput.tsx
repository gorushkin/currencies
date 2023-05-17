import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { InputType } from '../../types';
import { cn } from '../../utils/utils';
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

export const DateInput: InputType<string> = ({ value, onChange, isActive, isValid, onClick }) => {
  const input = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const date = dayjs(value, 'DD/MM/YYYY');
    const isInputValid = date.isValid();
    onChange({ isValid: isInputValid, value, name: 'date' });
  };

  useEffect(() => {
    if (!input.current || !isActive) return;
    input.current.focus();
  }, [isActive]);

  return (
    <TextField
      label='Date'
      inputProps={{
        style: { fontSize: '3rem', textAlign: 'center', padding: '0px 14px', height: '60px' },
      }}
      size='medium'
      className={cn('input_amount')}
      error={!isValid}
      variant='outlined'
      value={value}
      onChange={handleChange}
      inputRef={input}
      placeholder='DD/MM/YYYY'
    />
  );
};
