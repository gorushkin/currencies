import axios from 'axios';
import { CurrencyRates } from '../types';

const baseURL = 'http://127.0.0.1:3000';

const instance = axios.create({
  baseURL,
});

export const getRatesRequest = async (date: string) => {
  // TODO: add error handler
  const { data } = (await instance.post('', { date })) as {
    data: { date: string; rates: CurrencyRates };
  };
  return data;
};
