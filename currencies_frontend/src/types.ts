import React from 'react';

import { Currency } from './utils/constants';

export type InputName = 'amount' | 'date';

export type Mode = 'inputAmount' | 'inputDate' | 'submit';

export type OnChange<T> = ({
  isValid,
  name,
  value,
}: {
  isValid: boolean;
  name: InputName;
  value: T;
}) => void;

export type InputType<T> = ({
  isActive,
  isValid,
  onChange,
  onClick,
  value,
}: {
  isActive: boolean;
  isValid: boolean;
  onChange: OnChange<T>;
  onClick: React.Dispatch<React.SetStateAction<InputName>>;
  value: T;
}) => React.JSX.Element;

export type Name = 'from' | 'to';

export type CurrenciesStateType = Record<Name, Currency>;

export type HandleClickType = (type: 'from' | 'to') => (item: Currency) => void;

export type SelectorCurrency = { disabled: boolean; item: Currency };

export type Rate = {
  amount: number;
  code: Currency;
  rate: number;
};

export type CurrencyRates = null | Record<Currency, Rate[]>;

export type MODE = 'development' | 'production';
