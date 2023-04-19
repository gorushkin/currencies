import { ValuesState } from '../types';

export enum Currency {
  RUB = 'RUB',
  TRY = 'TRY',
  USD = 'USD',
  NZD = 'NZD',
  EUR = 'EUR',
}

export const initState: ValuesState = {
  amount: { value: '', isValid: false },
  date: { value: null, isValid: true },
};
