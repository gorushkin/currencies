import { atom } from 'recoil';

import { SelectorCurrency } from '../types';
import { Currency } from '../utils/constants';

export const currenciesState = atom<SelectorCurrency[]>({
  default: Object.values(Currency).map((item) => ({ disabled: false, item })),
  key: 'currenciesState',
});
