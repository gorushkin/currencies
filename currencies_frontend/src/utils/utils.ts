import { CurrenciesStateType, Name } from '../types';
import { Currency, initCurrenciesSate } from './constants';

type ClassNames = (false | string | true)[];

export const cn = (...classnames: ClassNames) => classnames.filter((item) => !!item).join(' ');

export const resetCurrencies = ({
  currencies,
  currency,
  name,
  setCurrencies,
}: {
  currencies: Currency[];
  currency: Currency;
  name: Name;
  setCurrencies: (value: React.SetStateAction<CurrenciesStateType>) => void;
}) => {
  const isMissedCurrencyChecked = !currencies.map((item) => item).includes(currency);
  if (isMissedCurrencyChecked) {
    setCurrencies((state) => ({ ...state, [name]: initCurrenciesSate[name] }));
  }
};

export const roundValue = (value?: number): string => (value ? value.toFixed(3) : '');

export const storage = <T>(key: string) => {
  const set = (data: T) => {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  };

  const get = () => {
    const json = localStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json) as T;
  };

  return { get, set };
};
