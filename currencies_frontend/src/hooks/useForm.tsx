import { useState } from 'react';
import { initState } from '../utils/constants';
import { ValuesState } from '../types';

export const useForm = () => {
  const [values, setValues] = useState<ValuesState>(initState);

  const handleChange = <T,>({
    name,
    value,
    isValid,
  }: {
    name: string;
    value: T;
    isValid: boolean;
  }) => {
    setValues((state) => ({ ...state, [name]: { value, isValid } }));
  };

  const handleSubmit = () => {
    if (!values.date.value) return;
    console.log(values.amount.value);
    console.log(values.date.value.format('YYYY-MM-DD'));
  };

  return { values, handleChange, handleSubmit };
};
