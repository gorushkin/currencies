import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import { InputType } from '../../types';
import style from './Form.module.scss';

export const AmountInput: InputType<string> = ({ value, onChange, isValid, isActive }) => {
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const isInputValid = !!e.target.value;
    onChange({ isValid: isInputValid, value: e.target.value, name: 'amount' });
  };

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
      className={style.input}
      error={!isValid}
      variant='outlined'
      value={value}
      onChange={handleChange}
      inputRef={input}
      type='number'
    />
  );
};
