import style from './Settings.module.scss';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRecoilState } from 'recoil';
import { settingsState } from '../../state/state';

export type InputSettings = 'text' | 'datePicker';

export const Settings = () => {
  const [settings, setSettings] = useRecoilState(settingsState);

  const { readSettings, saveSettings } = useLocalStorage<InputSettings>('input_settings');

  useLayoutEffect(() => {
    const savedSettings = readSettings() || 'text';
    setSettings(savedSettings);
  }, [readSettings, setSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as InputSettings;
    setSettings(value);
    saveSettings(value);
  };

  return (
    <FormControl component='fieldset'>
      <FormLabel className={style.legend} component='legend'>
        How should input work
      </FormLabel>
      <RadioGroup
        className={style.radioGroup}
        aria-label='gender'
        name='gender'
        value={settings}
        onChange={handleChange}
      >
        <FormControlLabel value='text' control={<Radio />} label='As an usual input' />
        <FormControlLabel value='datePicker' control={<Radio />} label='As a date picker' />
      </RadioGroup>
    </FormControl>
  );
};
