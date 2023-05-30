import { MODE } from '../types';

const mode: MODE = (import.meta.env.MODE as MODE) || 'production';

interface Config {
  API_BASE_URL: string;
  ORIGIN: string;
}

const development = {
  API_BASE_URL: '/api',
  ORIGIN: 'http://localhost:3005/currencies',
};

const production = {
  API_BASE_URL: '/api',
  ORIGIN: 'https://api.gorushkin.com/currencies',
};

const urlMapping: Record<MODE, Config> = {
  development,
  production,
};

const BASE_URL = urlMapping[mode];

export const config = { BASE_URL };
