import { CurrenciesStateType, Name } from '../types';
import { Currency, initCurrenciesSate } from './constants';

type ClassNames = (string | true | false)[];

export const cn = (...classnames: ClassNames) => classnames.filter((item) => !!item).join(' ');

export const resetCurrencies = ({
  currency,
  name,
  currencies,
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
