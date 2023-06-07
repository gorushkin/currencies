import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { InputType } from '../../types';
import style from './Form.module.scss';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DATE_FORMAT, MOBILE_QUERY } from '../../utils/constants';
import { MobileDatePicker, DatePicker } from '@mui/x-date-pickers';
import { cn } from '../../utils/utils';
import { useRecoilValue } from 'recoil';
import { settingsState } from '../../state';

/*
  Awaited<>
  ReturnType<typeof func>
  ConstructorParameters<typeof String>
  InstanceType<typeof String>
  Paremeters<typeof func>
  ReadonlyArray<string>
  Readonly<string>
  Partial<{ a: string }>
  Required<{ a?: string }>
  NonNullable<string | null>
*/

export const DateInput: InputType<string> = ({ value, onChange, isActive, isValid, onClick }) => {
  const input = useRef<HTMLInputElement>(null);
  const settings = useRecoilValue(settingsState);

  const isMobile = useMediaQuery(MOBILE_QUERY);

  const handleDesktopChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const date = dayjs(value, DATE_FORMAT);
    const isInputValid = date.isValid();
    onChange({ isValid: isInputValid, value, name: 'date' });
  };

  const handleMobileDatePickerChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;
    const isInputValid = date.isValid();
    const value = date.format(DATE_FORMAT);
    onChange({ isValid: isInputValid, value, name: 'date' });
  };

  useEffect(() => {
    if (!input.current || !isActive) return;
    input.current.focus();
  }, [isActive]);

  if (isMobile) {
    return (
      <MobileDatePicker
        onChange={handleMobileDatePickerChange}
        className={cn(style.input, style.inputMobile)}
        label='Date'
        disableFuture
        format={DATE_FORMAT}
        value={dayjs(value, DATE_FORMAT)}
      />
    );
  }

  if (settings === 'datePicker') {
    return (
      <DatePicker
        label='Date'
        className={cn(style.input, style.inputDatePicker)}
        disableFuture
        format={DATE_FORMAT}
        value={dayjs(value, DATE_FORMAT)}
        inputRef={input}
      />
    );
  }

  return (
    <TextField
      label='Date'
      inputProps={{
        style: { fontSize: '3rem', textAlign: 'center', padding: '0px 14px', height: '60px' },
      }}
      size='medium'
      className={style.input}
      error={!isValid}
      variant='outlined'
      value={value}
      onChange={handleDesktopChange}
      inputRef={input}
      placeholder='DD/MM/YYYY'
    />
  );
};
