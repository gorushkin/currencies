import { Dayjs } from 'dayjs';

export type InputName = 'date' | 'amount';

export type Mode = 'inputDate' | 'inputAmount' | 'submit';

export type ValuesState = {
  amount: { value: string; isValid: boolean };
  date: { value: Dayjs | null; isValid: boolean };
};

export type OnChange<T> = ({
  value,
  name,
  isValid,
}: {
  value: T;
  name: InputName;
  isValid: boolean;
}) => void;

export type InputType<T> = ({
  onChange,
  isActive,
  value,
  isValid,
  onClick,
}: {
  isActive: boolean;
  value: T;
  onChange: OnChange<T>;
  onClick: React.Dispatch<React.SetStateAction<InputName>>;
  isValid: boolean;
}) => JSX.Element;

export type Context = { width: number; setWidth: React.Dispatch<React.SetStateAction<number>> };
