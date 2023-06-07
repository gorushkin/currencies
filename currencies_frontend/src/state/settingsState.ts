import { atom } from 'recoil';
import { InputSettings } from '../components/Settings/Settings';
import { storage } from '../utils/utils';

const storageHandler = storage<InputSettings>('input_settings');

export const settingsState = atom<InputSettings>({
  key: 'settings',
  default: 'text',
  effects: [
    ({ setSelf }) => {
      const savedSettings = storageHandler.get() ?? 'text';
      setSelf(savedSettings);
    },
    ({ onSet }) => {
      onSet((settings) => storageHandler.set(settings));
    },
  ],
});
