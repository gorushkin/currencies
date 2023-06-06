import style from './Settings.module.scss';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type InputSettings = 'text' | 'datePicker';

export const Settings = () => {
  const { readSettings, saveSettings } = useLocalStorage<InputSettings>('input_settings');
  const [dateInput, setDateInput] = useState<InputSettings>('text');

  useLayoutEffect(() => {
    const settings = readSettings() || 'text';
    setDateInput(settings);
  }, [readSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as InputSettings;
    setDateInput(value);
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
        value={dateInput}
        onChange={handleChange}
      >
        <FormControlLabel value='text' control={<Radio />} label='As an usual input' />
        <FormControlLabel value='datePicker' control={<Radio />} label='As a date picker' />
      </RadioGroup>
    </FormControl>
  );
};
