import { atom } from 'recoil';
import { SelectorCurrency } from '../types';
import { Currency } from '../utils/constants';

export const currenciesState = atom<SelectorCurrency[]>({
  key: 'currenciesState',
  default: Object.values(Currency).map((item) => ({ item, disabled: false })),
});
