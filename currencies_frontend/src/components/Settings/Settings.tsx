import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useRecoilState } from 'recoil';

import { settingsState } from '../../state';
import style from './Settings.module.scss';

export type InputSettings = 'datePicker' | 'text';

export const Settings = () => {
  const [settings, setSettings] = useRecoilState(settingsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as InputSettings;
    setSettings(value);
  };

  return (
    <FormControl component='fieldset'>
      <FormLabel className={style.legend} component='legend'>
        How should input work
      </FormLabel>
      <RadioGroup
        aria-label='gender'
        className={style.radioGroup}
        name='gender'
        onChange={handleChange}
        value={settings}
      >
        <FormControlLabel control={<Radio />} label='As an usual input' value='text' />
        <FormControlLabel control={<Radio />} label='As a date picker' value='datePicker' />
      </RadioGroup>
    </FormControl>
  );
};
