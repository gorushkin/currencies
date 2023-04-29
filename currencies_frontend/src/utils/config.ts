import { MODE } from '../types';

const mode: MODE = (import.meta.env.MODE as MODE) || 'production';

const urlMapping: Record<MODE, string> = {
  development: 'http://127.0.0.1:3000',
  production: 'http://46.19.64.117/currencies/api',
};

const BASE_URL = urlMapping[mode];

export const config = { BASE_URL };
