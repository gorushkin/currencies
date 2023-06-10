import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getRatesRequest } from '../../api/api';
import { fetchState, updateFetchState } from '../../state/fetchState';
import { formValuesState } from '../../state/formValues';
import { InputName } from '../../types';
import { DATE_FORMAT } from '../../utils/constants';
import { cn } from '../../utils/utils';
import { AmountInput } from './AmountInput';
import { DateInput } from './DateInput';
import style from './Form.module.scss';

export type HandleChangeType = <T>({ isValid, name, value }: { isValid: boolean; name: string; value: T }) => void;

export const Form = () => {
  const [activeInput, setActiveInput] = useState<InputName>('amount');
  const [values, setValues] = useRecoilState(formValuesState);
  const { isLoading } = useRecoilValue(fetchState);

  const { amount, date } = values;

  const setRates = useSetRecoilState(updateFetchState);

  const input = useRef<HTMLDivElement>(null);

  const [isOver, setIsOver] = useState(false);
  useEffect(() => {
    if (!input.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsOver((prev) => !prev);
    };

    input.current.addEventListener('mouseover', handleMouseMove);
    input.current.addEventListener('mouseleave', handleMouseMove);

    return () => {
      if (!input.current) return;
      input.current.removeEventListener('mouseover', handleMouseMove);
      input.current.removeEventListener('mouseleave', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const prevDate = dayjs(values.date.value, DATE_FORMAT);
      const currentDate = dayjs();
      const newDate = e.deltaY < 0 ? prevDate.add(1, 'day') : prevDate.subtract(1, 'day');
      const dateDiff = newDate.diff(currentDate, 'day');

      const correctDate = dateDiff >= 0 ? currentDate.format(DATE_FORMAT) : newDate.format(DATE_FORMAT);

      setValues((prev) => ({ ...prev, date: { isValid: true, value: correctDate } }));
    };

    if (!isOver) return;

    document.addEventListener('wheel', handleWheel);

    return () => document.removeEventListener('wheel', handleWheel);
  }, [isOver, setValues, values.date.value]);

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
    ({ isValid, name, value }) => {
      setValues((state) => ({ ...state, [name]: { isValid, value } }));
    },
    [setValues]
  );

  return (
    <form>
      <div className={cn(style.wrapper, isOver && style.wrapperIsOver)} ref={input}>
        <DateInput
          isActive={activeInput === 'date'}
          isValid={date.isValid}
          onChange={handleChange}
          onClick={setActiveInput}
          value={date.value}
        />
      </div>
      <div className={style.wrapper}>
        <AmountInput
          isActive={activeInput === 'amount'}
          isValid={amount.isValid}
          onChange={handleChange}
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
