import axios from 'axios';
import { CurrencyRates } from '../types';
import { config } from '../utils/config';

const instance = axios.create({
  baseURL: config.BASE_URL.ORIGIN + config.BASE_URL.API_BASE_URL,
});

type ApiResponse = { date: string; rates: CurrencyRates };

type Request = (
  date: string,
  amount: string
) => Promise<{ data: ApiResponse; ok: true } | { error: string; ok: false }>;

export const getRatesRequest: Request = async (date, amount) => {
  try {
    const { data } = await instance.post<ApiResponse>('', { date, amount });
    return { data, ok: true };
  } catch (error) {
    return { error: 'There is an error', ok: false };
  }
};
