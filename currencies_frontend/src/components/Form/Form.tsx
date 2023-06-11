import { Button } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getRatesRequest } from '../../api/api';
import { fetchState, updateFetchState } from '../../state/fetchState';
import { formValuesState } from '../../state/formValues';
import { InputName } from '../../types';
import { AmountInput } from './AmountInput';
import { CurrentDateButton } from './CurrentDateButton';
import { DateInput } from './DateInput';
import style from './Form.module.scss';

export type HandleChangeType = <T>({ isValid, name, value }: { isValid: boolean; name: string; value: T }) => void;

export const Form = () => {
  const [activeInput, setActiveInput] = useState<InputName>('amount');
  const values = useRecoilValue(formValuesState);
  const { isLoading } = useRecoilValue(fetchState);

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

  return (
    <form>
      <div className={style.wrapper}>
        <DateInput
          isActive={activeInput === 'date'}
          isValid={date.isValid}
          onClick={setActiveInput}
          value={date.value}
        />
        <CurrentDateButton />
      </div>
      <div className={style.wrapper}>
        <AmountInput
          isActive={activeInput === 'amount'}
          isValid={amount.isValid}
          onClick={setActiveInput}
          value={amount.value}
        />
      </div>
      <div className={style.wrapper}>
        <Button
          className={style.submitButton}
          color="primary"
          disabled={!amount.isValid || !date.isValid || isLoading}
          onClick={handleSubmit}
          variant="outlined"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export const WithMemo = memo(Form);
