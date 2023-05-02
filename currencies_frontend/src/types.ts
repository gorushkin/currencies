import { Currency } from './utils/constants';

export type InputName = 'date' | 'amount';

export type Mode = 'inputDate' | 'inputAmount' | 'submit';

export type Values = {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
};

export type ResultValues = {
  amount: string;
  date: string;
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

export type Name = 'from' | 'to';

export type CurrenciesStateType = Record<Name, Currency>;

export type HandleChangeType = <T>({
  name,
  value,
  isValid,
}: {
  name: string;
  value: T;
  isValid: boolean;
}) => void;

export type HandleClickType = (type: 'to' | 'from') => (item: Currency) => void;

export type SelectorCurrency = { item: Currency; disabled: boolean };

export type Rate = {
  code: Currency;
  rate: number;
};

export type CurrencyRates = Record<Currency, Rate[]> | null;

export type MODE = 'production' | 'development'
