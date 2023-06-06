import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CurrenciesStateType, Values } from '../types';
dayjs.extend(customParseFormat);

export enum Currency {
  RUB = 'RUB',
  TRY = 'TRY',
  USD = 'USD',
  NZD = 'NZD',
  EUR = 'EUR',
}

export const DATE_FORMAT = 'DD/MM/YYYY';
const date = dayjs(new Date()).format(DATE_FORMAT);

export const initState: Values = {
  amount: { value: '', isValid: false },
  date: { value: date, isValid: !!date },
};

export const initCurrenciesSate: CurrenciesStateType = {
  from: Currency.RUB,
  to: Currency.USD,
};

export const MOBILE_QUERY = '(max-width: 480px)';
export const TABLET_QUERY = '(max-width: 980px) and (min-width: 481px)';
export const DESKTOP_QUERY = '(min-width: 981px)';

type Link = { title: string; href: string };

export const links: Link[] = [
  { href: 'https://www.linkedin.com/in/gorushkin/', title: 'Linkedin' },
  { href: 'https://github.com/gorushkin', title: 'Github' },
  { href: 'https://t.me/artyomgorushkin', title: 'Telegram' },
];
