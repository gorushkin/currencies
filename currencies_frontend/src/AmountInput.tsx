import { TextField } from '@mui/material';
import { InputType } from './types';
import { useEffect, useRef } from 'react';
import { cn } from './utils';

export const AmountInput: InputType<string> = ({ value, onChange, isActive, isValid }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const isInputValid = !!e.target.value;
    onChange({ value: e.target.value, name: 'amount', isValid: isInputValid });
  };

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input.current || !isActive) return;
    input.current.focus();
  }, [isActive]);

  return (
    <TextField
      label='Amount'
      inputProps={{
        style: { fontSize: '3rem', textAlign: 'center', padding: '0px 14px', height: '60px' },
      }}
      size='medium'
      className={cn('input_amount', !isValid && 'input_amount-Invalid')}
      variant='outlined'
      value={value}
      onChange={handleChange}
      inputRef={input}
    />
  );
};
