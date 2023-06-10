import { atom } from 'recoil';

import { CurrenciesStateType } from '../types';
import { Currency, initCurrenciesSate } from '../utils/constants';
import { storage } from '../utils/utils';

const initialSelectedCurrencies: CurrenciesStateType = {
  from: Currency.USD,
  to: Currency.RUB,
};

const storageHandler = storage<CurrenciesStateType>('settings');

export const selectedCurrenciesState = atom<CurrenciesStateType>({
  default: initialSelectedCurrencies,
  effects: [
    ({ setSelf }) => {
      const settings = storageHandler.get() ?? initCurrenciesSate;
      setSelf(settings);
    },
    ({ onSet }) => {
      onSet((settings) => storageHandler.set(settings));
    },
  ],
  key: 'selectedCurrenciesState',
});
