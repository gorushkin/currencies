import { TextField } from '@mui/material';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { formValuesState, settingsState } from '../../state';
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

type SelectedPart = 'day' | 'month' | 'year' | null;
type HandleChangeType = ({ isValid, value }: { isValid: boolean; value: string }) => void;

const dayStart = 0;
const dayEnd = 2;
const monthStart = 3;
const monthEnd = 5;
const yearStart = 6;
const yearEnd = 10;

export const DateInput: InputType<string> = ({ isActive, isValid, value }) => {
  const input = useRef<HTMLInputElement>(null);
  const settings = useRecoilValue(settingsState);
  const [selectedPart, setSelectedPart] = useState<SelectedPart>(null);
  const [values, setValues] = useRecoilState(formValuesState);

  const isMobile = useMediaQuery(MOBILE_QUERY);

  useEffect(() => {
    if (!selectedPart) return;
  }, [selectedPart]);

  const handleChange: HandleChangeType = ({ isValid, value }) => {
    setValues((state) => ({ ...state, date: { isValid, value } }));
  };

  const handleDesktopChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const isValid = dayjs(value, DATE_FORMAT, true).isValid();
    handleChange({ isValid, value });
  };

  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (!input.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsOver((prev) => !prev);
    };

    input.current.addEventListener('mouseover', handleMouseMove);
    input.current.addEventListener('mouseleave', handleMouseMove);

    return () => {
      if (!input.current) return;
      input.current.removeEventListener('mouseover', handleMouseMove);
      input.current.removeEventListener('mouseleave', handleMouseMove);
    };
  }, []);

  const handleMobileDatePickerChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;
    const isValid = date.isValid();
    const value = date.format(DATE_FORMAT);
    handleChange({ isValid, value });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!selectedPart) return;
      const prevDate = dayjs(values.date.value, DATE_FORMAT);
      const currentDate = dayjs();
      const newDate = e.deltaY < 0 ? prevDate.add(1, selectedPart) : prevDate.subtract(1, selectedPart);
      const dateDiff = newDate.diff(currentDate, 'day');

      const correctDate = dateDiff >= 0 ? currentDate.format(DATE_FORMAT) : newDate.format(DATE_FORMAT);

      setValues((prev) => ({ ...prev, date: { isValid: true, value: correctDate } }));
    };

    if (!isOver) return;

    document.addEventListener('wheel', handleWheel);

    return () => document.removeEventListener('wheel', handleWheel);
  }, [isOver, selectedPart, setValues, values.date.value]);

  useEffect(() => {
    if (!isValid || !input.current) return;

    input.current.select();

    const findPosition = () => {
      const position = input.current?.selectionStart;
      if (!position) return setSelectedPart('day');
      if (position >= dayStart && position <= dayEnd) {
        input.current.setSelectionRange(dayStart, dayEnd);
        setSelectedPart('day');
      }
      if (position >= monthStart && position <= monthEnd) {
        input.current.setSelectionRange(monthStart, monthEnd);
        setSelectedPart('month');
      }
      if (position >= yearStart && position <= yearEnd) {
        input.current.setSelectionRange(yearStart, yearEnd);
        setSelectedPart('year');
      }
    };

    input.current?.addEventListener('click', findPosition);
    input.current?.addEventListener('blur', findPosition);
  }, [isValid]);

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
      className={cn(style.input, style.inputDatePicker)}
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
