import { Values } from '../types';

export enum Currency {
  RUB = 'RUB',
  TRY = 'TRY',
  USD = 'USD',
  NZD = 'NZD',
  EUR = 'EUR',
}

export const initState: Values = {
  amount: { value: '', isValid: false },
  date: { value: '', isValid: true },
};
