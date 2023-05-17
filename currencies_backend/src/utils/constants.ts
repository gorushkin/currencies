import { Currency, Rate } from './types';

export const currenciesList: Currency[] = ['TRY', 'USD', 'NZD', 'EUR', 'RUB'];

export const errorText = '\r\nError in parameters\r\n';

export const rub: Omit<Rate, 'amount'> = { code: 'RUB', rate: 1 };
