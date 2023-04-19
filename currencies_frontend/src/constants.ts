import dayjs from "dayjs";

export enum Currency {
  RUB = 'RUB',
  TRY = 'TRY',
  USD = 'USD',
  NZD = 'NZD',
  EUR = 'EUR',
}

export const initState = {
  amount: { value: '', isValid: false },
  date: { value: dayjs(), isValid: false },
}
