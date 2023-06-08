import { atom, selector } from 'recoil';
import { CurrencyRates, Name } from '../types';
import { Currency, initCurrenciesSate } from '../utils/constants';
import { currenciesState, formValuesState, resultValuesState, selectedCurrenciesState } from '.';

export type FetchState = {
  isLoading: boolean;
  rates: CurrencyRates;
};

const initialFetchState: FetchState = { isLoading: false, rates: null };

export const fetchState = atom<FetchState>({ key: 'fetchState', default: initialFetchState });

export const updateFetchState = selector({
  key: 'updateFetchState',
  get: ({ get }) => get(fetchState),
  set: ({ set, get }, payload) => {
    const rates = payload as FetchState;
    if (!rates.rates) return;
    const resultRates = Object.keys(rates.rates) as Currency[];
    const currencies = get(selectedCurrenciesState);
    Object.entries(currencies).forEach(([name, currency]) => {
      const isMissedCurrencyChecked = !resultRates.map((item) => item).includes(currency);
      if (isMissedCurrencyChecked) {
        set(selectedCurrenciesState, (state) => ({
          ...state,
          [name]: initCurrenciesSate[name as Name],
        }));
      }
    });

    const values = get(formValuesState);

    set(resultValuesState, values);

    set(currenciesState, (prev) =>
      prev.map((item) => ({ ...item, disabled: !resultRates.includes(item.item) }))
    );

    set(fetchState, payload);
  },
});
