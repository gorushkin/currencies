import { Button } from '@mui/material';
import { AmountInput } from './AmountInput';
import { DateInput } from './DateInput';
import { useForm } from './useForm';
import { cn } from './utils';
import { InputName } from './types';
import { useEffect, useState } from 'react';
import { useExportContext } from './AppContext';

export const Form = () => {
  const [activeInput, setActiveInput] = useState<InputName>('date');
  const { width } = useExportContext();

  const {
    values: { amount, date },
    handleSubmit: handleFormSubmit,
    handleChange: handleValueChange,
  } = useForm();

  useEffect(() => {
    const onKeyPresHanlder = (event: KeyboardEvent) => {
      if (event.code !== 'Enter' && event.code !== 'NumpadEnter') return;
      if (activeInput === 'date' && date.isValid) setActiveInput('amount');
      if (activeInput === 'amount' && date.isValid && amount.isValid) handleFormSubmit();
    };

    document.addEventListener('keypress', onKeyPresHanlder);
    return () => document.removeEventListener('keypress', onKeyPresHanlder);
  }, [amount, date, activeInput]);

  const handleChange = <T,>({
    name,
    value,
    isValid,
  }: {
    value: T;
    name: string;
    isValid: boolean;
  }) => {
    handleValueChange({ value, name, isValid });
  };

  return (
    <form>
      <div style={{ width: `${width}px` }} className={cn('input_wrapper', 'wrapper')}>
        <DateInput
          value={date.value}
          isValid={date.isValid}
          isActive={activeInput === 'date'}
          onChange={handleChange}
          onClick={setActiveInput}
        />
      </div>
      <div style={{ width: `${width}px` }} className={cn('input_wrapper', 'wrapper')}>
        <AmountInput
          value={amount.value}
          isValid={amount.isValid}
          isActive={activeInput === 'amount'}
          onChange={handleChange}
          onClick={setActiveInput}
        />
      </div>
      <div style={{ width: `${width}px` }} className={cn('input_wrapper', 'wrapper')}>
        <Button
          disabled={!amount.isValid || !date.isValid}
          onClick={handleFormSubmit}
          variant='outlined'
          color='primary'
          className='submit_button'
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
