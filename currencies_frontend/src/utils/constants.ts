/* eslint-disable perfectionist/sort-enums */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { CurrenciesStateType } from '../types';
dayjs.extend(customParseFormat);

export enum Currency {
  RUB = 'RUB',
  TRY = 'TRY',
  USD = 'USD',
  NZD = 'NZD',
  EUR = 'EUR',
}

export const DATE_FORMAT = 'DD/MM/YYYY';

export const initCurrenciesSate: CurrenciesStateType = {
  from: Currency.RUB,
  to: Currency.USD,
};

export const MOBILE_QUERY = '(max-width: 480px)';
export const TABLET_QUERY = '(max-width: 980px) and (min-width: 481px)';
export const DESKTOP_QUERY = '(min-width: 981px)';

type Link = { href: string; title: string };

export const links: Link[] = [
  { href: 'https://www.linkedin.com/in/gorushkin/', title: 'Linkedin' },
  { href: 'https://github.com/gorushkin', title: 'Github' },
  { href: 'https://t.me/artyomgorushkin', title: 'Telegram' },
];
