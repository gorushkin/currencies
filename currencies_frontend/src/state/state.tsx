import { atom } from 'recoil';
import { InputSettings } from '../components/Settings/Settings';
import { CurrencyRates } from '../types';

export const settingsState = atom<InputSettings>({ key: 'settings', default: 'text' });

export type FetchState = {
  isLoading: boolean;
  rates: CurrencyRates;
};

const initialFetchState: FetchState = { isLoading: false, rates: null };

export const fetchState = atom({ key: 'fetchState', default: initialFetchState });
