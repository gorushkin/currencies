import { atom } from 'recoil';
import { InputSettings } from '../components/Settings/Settings';

export const settingsState = atom<InputSettings>({ key: 'settings', default: 'text' });
