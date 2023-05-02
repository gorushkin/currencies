import axios from 'axios';
import { CurrencyRates } from '../types';
import { config } from '../utils/config';

const instance = axios.create({
  baseURL: config.BASE_URL.ORIGIN + config.BASE_URL.API_BASE_URL,
});

export const getRatesRequest = async (date: string) => {
  // TODO: add error handler
  const { data } = (await instance.post('', { date })) as {
    data: { date: string; rates: CurrencyRates };
  };
  return data;
};
