import { Dayjs } from 'dayjs';
import { Currency } from './utils/constants';

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

export type CurrenciesStateType = { from: Currency; to: Currency };

export type HandleChangeType = <T>({
  name,
  value,
  isValid,
}: {
  name: string;
  value: T;
  isValid: boolean;
}) => void;

export type HandleClickType = (type: 'to' | 'from') => (item: Currency) => void

export type Context = {
  width: number;
  currencies: CurrenciesStateType;
  handleClick: HandleClickType;
  updateWidth: (width: number) => void;
  updateRates: (rates: CurrencyRates) => void;
  rates: CurrencyRates;
  values: ValuesState;
  handleChange: HandleChangeType;
};

export type Rate = {
  code: Currency;
  rate: number;
};

export type CurrencyRates = Record<Currency, Rate[]> | null;
