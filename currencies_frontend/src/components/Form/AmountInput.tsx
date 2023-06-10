import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';

import { InputType } from '../../types';
import style from './Form.module.scss';

export const AmountInput: InputType<string> = ({
  isActive,
  isValid,
  onChange,
  value,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isInputValid = !!e.target.value && !!Number(e.target.value);
    onChange({ isValid: isInputValid, name: 'amount', value: e.target.value });
  };

  useEffect(() => {
    if (!input.current || !isActive) return;
    input.current.focus();
  }, [isActive]);

  return (
    <TextField
      inputProps={{
        style: {
          fontSize: '3rem',
          height: '60px',
          padding: '0px 14px',
          textAlign: 'center',
        },
      }}
      className={style.input}
      error={!isValid}
      inputRef={input}
      label="Amount"
      onChange={handleChange}
      size="medium"
      type="tel"
      value={value}
      variant="outlined"
    />
  );
};
