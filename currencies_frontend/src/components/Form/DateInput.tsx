import { TextField } from '@mui/material';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { settingsState } from '../../state';
import { InputType } from '../../types';
import { DATE_FORMAT, MOBILE_QUERY } from '../../utils/constants';
import { cn } from '../../utils/utils';
import style from './Form.module.scss';

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

export const DateInput: InputType<string> = ({
  isActive,
  isValid,
  onChange,
  value,
}) => {
  const input = useRef<HTMLInputElement>(null);
  const settings = useRecoilValue(settingsState);

  const isMobile = useMediaQuery(MOBILE_QUERY);

  const handleDesktopChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const isInputValid = dayjs(value, DATE_FORMAT, true).isValid();
    onChange({ isValid: isInputValid, name: 'date', value });
  };

  const handleMobileDatePickerChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;
    const isInputValid = date.isValid();
    const value = date.format(DATE_FORMAT);
    onChange({ isValid: isInputValid, name: 'date', value });
  };

  useEffect(() => {
    if (!input.current || !isActive) return;
    input.current.focus();
  }, [isActive]);

  if (isMobile) {
    return (
      <MobileDatePicker
        className={cn(style.input, style.inputMobile)}
        disableFuture
        format={DATE_FORMAT}
        inputRef={input}
        label="Date"
        onChange={handleMobileDatePickerChange}
        value={dayjs(value, DATE_FORMAT)}
      />
    );
  }

  if (settings === 'datePicker') {
    return (
      <DatePicker
        className={cn(style.input, style.inputDatePicker)}
        disableFuture
        format={DATE_FORMAT}
        inputRef={input}
        label="Date"
        value={dayjs(value, DATE_FORMAT)}
      />
    );
  }

  return (
    <TextField
      inputProps={{
        style: {
          fontSize: '3rem',
          height: '60px',
          padding: '0px 14px',
          textAlign: 'center',
        },
      }}
      className={cn(style.input)}
      error={!isValid}
      inputRef={input}
      label="Date"
      onChange={handleDesktopChange}
      placeholder="DD/MM/YYYY"
      size="medium"
      value={value}
      variant="outlined"
    />
  );
};
