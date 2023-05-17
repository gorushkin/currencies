import { Button } from '@mui/material';
import { AmountInput } from './AmountInput';
import { DateInput } from './DateInput';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { HandleChangeType, InputName, Values } from '../../types';
import { cn } from '../../utils/utils';
import { initState } from '../../utils/constants';

interface FormProps {
  onSubmit: ({ date, amount }: { date: string; amount: string }) => void;
  width: number;
}

export const Form: FC<FormProps> = ({ onSubmit, width }) => {
  const [activeInput, setActiveInput] = useState<InputName>('amount');
  const [values, setValues] = useState<Values>(initState);
  const { amount, date } = values;

  const handleSubmit = useCallback(() => {
    onSubmit({ amount: values.amount.value, date: values.date.value });
  }, [onSubmit, values.amount.value, values.date.value]);

  useEffect(() => {
    const onKeyPresHandler = (event: KeyboardEvent) => {
      if (event.code !== 'Enter' && event.code !== 'NumpadEnter') return;
      if (activeInput === 'date' && date.isValid) setActiveInput('amount');
      if (activeInput === 'amount' && date.isValid && amount.isValid) handleSubmit();
    };

    document.addEventListener('keypress', onKeyPresHandler);
    return () => document.removeEventListener('keypress', onKeyPresHandler);
  }, [amount, date, activeInput, handleSubmit]);

  const handleChange: HandleChangeType = useCallback(({ name, value, isValid }) => {
    setValues((state) => ({ ...state, [name]: { value, isValid } }));
  }, []);

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

export const WithMemo = memo(Form);
