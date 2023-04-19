import { Button } from '@mui/material';
import { AmountInput } from './AmountInput';
import { DateInput } from './DateInput';
import { useEffect, useState } from 'react';
import { useExportContext } from '../../context/AppContext';
import { useForm } from '../../hooks/useForm';
import { InputName } from '../../types';
import { cn } from '../../utils/utils';

export const Form = () => {
  const [activeInput, setActiveInput] = useState<InputName>('date');
  const { width } = useExportContext();

  const {
    values: { amount, date },
    handleSubmit,
    handleChange,
  } = useForm();

  useEffect(() => {
    const onKeyPresHanlder = (event: KeyboardEvent) => {
      if (event.code !== 'Enter' && event.code !== 'NumpadEnter') return;
      if (activeInput === 'date' && date.isValid) setActiveInput('amount');
      if (activeInput === 'amount' && date.isValid && amount.isValid) handleSubmit();
    };

    document.addEventListener('keypress', onKeyPresHanlder);
    return () => document.removeEventListener('keypress', onKeyPresHanlder);
  }, [amount, date, activeInput]);

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
          onClick={handleSubmit}
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
