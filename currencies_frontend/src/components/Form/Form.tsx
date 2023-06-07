import { Button } from '@mui/material';
import { AmountInput } from './AmountInput';
import { DateInput } from './DateInput';
import { memo, useCallback, useEffect, useState } from 'react';
import style from './Form.module.scss';
import { getRatesRequest } from '../../api/api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { updateFetchState } from '../../state/fetchState';
import { InputName } from '../../types';
import { formValuesState } from '../../state/formValues';

export type HandleChangeType = <T>({
  name,
  value,
  isValid,
}: {
  name: string;
  value: T;
  isValid: boolean;
}) => void;

export const Form = () => {
  const [activeInput, setActiveInput] = useState<InputName>('amount');
  const [values, setValues] = useRecoilState(formValuesState);

  const { amount, date } = values;

  const setRates = useSetRecoilState(updateFetchState);

  const handleSubmit = useCallback(() => {
    const getRates = async () => {
      setRates((prev) => ({ ...prev, isLoading: true }));
      const response = await getRatesRequest(values.date.value, values.amount.value);
      const rates = response.ok ? response.data.rates : null;
      setRates({ isLoading: false, rates });
    };
    getRates();
  }, [setRates, values.amount.value, values.date.value]);

  useEffect(() => {
    const onKeyPresHandler = (event: KeyboardEvent) => {
      if (event.code !== 'Enter' && event.code !== 'NumpadEnter') return;
      if (activeInput === 'date' && date.isValid) setActiveInput('amount');
      if (activeInput === 'amount' && date.isValid && amount.isValid) handleSubmit();
    };

    document.addEventListener('keypress', onKeyPresHandler);
    return () => document.removeEventListener('keypress', onKeyPresHandler);
  }, [amount, date, activeInput, handleSubmit]);

  const handleChange: HandleChangeType = useCallback(
    ({ name, value, isValid }) => {
      setValues((state) => ({ ...state, [name]: { value, isValid } }));
    },
    [setValues]
  );

  return (
    <form>
      <div className={style.wrapper}>
        <DateInput
          value={date.value}
          isValid={date.isValid}
          isActive={activeInput === 'date'}
          onChange={handleChange}
          onClick={setActiveInput}
        />
      </div>
      <div className={style.wrapper}>
        <AmountInput
          value={amount.value}
          isValid={amount.isValid}
          isActive={activeInput === 'amount'}
          onChange={handleChange}
          onClick={setActiveInput}
        />
      </div>
      <div className={style.wrapper}>
        <Button
          disabled={!amount.isValid || !date.isValid}
          onClick={handleSubmit}
          variant='outlined'
          color='primary'
          className={style.submitButton}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export const WithMemo = memo(Form);
