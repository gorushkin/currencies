import { Dayjs } from 'dayjs';

export type ActiveInput = 'date' | 'amount';

export type Mode = 'inputDate' | 'inputAmount' | 'submit';

export type ValuesState = {
  amount: { value: string; isValid: boolean };
  date: { value: Dayjs; isValid: boolean };
};

export type Values<T> = { value: T; name: string; isValid: boolean };

export type ValueHanlder = ({
  value,
  name,
  isValid,
}: {
  value: string | Dayjs;
  name: string;
  isValid: boolean;
}) => void;

export type InputType<T> = ({
  value,
  isValid,
  onChange,
  isActive,
}: {
  value: T;
  isActive: boolean;
  isValid: boolean;
  onChange: ({ value, name }: Values<T>) => void;
}) => JSX.Element;
