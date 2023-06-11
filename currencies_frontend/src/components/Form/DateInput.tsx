import { TextField } from '@mui/material';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
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

const selectedParts: SelectedPart[] = ['day', 'month', 'year'];

type HandleChangeType = ({ isValid, value }: { isValid: boolean; value: string }) => void;

enum Limits {
  dayEnd = 2,
  dayStart = 0,
  monthEnd = 5,
  monthStart = 3,
  yearEnd = 10,
  yearStart = 6,
}

enum Keys {
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
}

type Mapping = Record<Exclude<SelectedPart, null>, (event: EventTarget & HTMLInputElement) => void>;

const resetSelection = (event: EventTarget & HTMLInputElement) => event.setSelectionRange(0, 0);

const selectionMapping: Mapping = {
  day: (event) => {
    resetSelection(event);
    event.setSelectionRange(Limits.dayStart, Limits.dayEnd);
  },
  month: (event) => {
    resetSelection(event);
    event.setSelectionRange(Limits.monthStart, Limits.monthEnd);
  },
  year: (event) => {
    resetSelection(event);
    event.setSelectionRange(Limits.yearStart, Limits.yearEnd);
  },
};

export const DateInput: InputType<string> = ({ isActive, isValid, value }) => {
  const input = useRef<HTMLInputElement>(null);
  const mode = useRef<'selectionDisabled' | 'selectionEnabled'>('selectionEnabled');

  const settings = useRecoilValue(settingsState);
  const [values, setValues] = useRecoilState(formValuesState);
  const [selectedPart, setSelectedPart] = useState<SelectedPart>(null);
  const [isInputActive, setIsInputActive] = useState(false);

  const isMobile = useMediaQuery(MOBILE_QUERY);

  useEffect(() => {
    if (!selectedPart || !input.current || mode.current === 'selectionDisabled') return;
    selectionMapping[selectedPart](input.current);
  }, [selectedPart, values.date.value]);

  const handleChange: HandleChangeType = ({ isValid, value }) => {
    setValues((state) => ({ ...state, date: { isValid, value } }));
  };

  const handleDesktopChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    mode.current = 'selectionDisabled';
    const date = dayjs(value, DATE_FORMAT, true);
    const currentDate = dayjs();
    const datesDiff = date.diff(currentDate);
    const isValid = date.isValid() && datesDiff <= 0;
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

  const handleDatePickerChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;
    const isValid = date.isValid();
    const value = date.format(DATE_FORMAT);
    handleChange({ isValid, value });
  };

  const updateDate = useCallback(
    (direction: number) => {
      if (!selectedPart) return;
      mode.current = 'selectionEnabled';
      const prevDate = dayjs(values.date.value, DATE_FORMAT);
      const currentDate = dayjs();
      const newDate = direction < 0 ? prevDate.add(1, selectedPart) : prevDate.subtract(1, selectedPart);
      const dateDiff = newDate.diff(currentDate, 'day');

      const correctDate = dateDiff >= 0 ? currentDate.format(DATE_FORMAT) : newDate.format(DATE_FORMAT);

      setValues((prev) => ({ ...prev, date: { isValid: true, value: correctDate } }));
    },
    [selectedPart, setValues, values.date.value]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const direction = e.deltaY;
      updateDate(direction);
    };

    if (!isOver) return;

    document.addEventListener('wheel', handleWheel);

    return () => document.removeEventListener('wheel', handleWheel);
  }, [isOver, selectedPart, setValues, updateDate, values.date.value]);

  useEffect(() => {
    if (!isInputActive) return;

    const handleChangePosition = (code: string) => {
      const currentIndex = selectedParts.indexOf(selectedPart);
      const direction = code === Keys.ArrowLeft ? -1 : 1;
      const nextPreIndex = direction + currentIndex;
      const nextIndex = direction < 0 ? Math.max(0, nextPreIndex) : Math.min(selectedParts.length - 1, nextPreIndex);
      setSelectedPart(selectedParts[nextIndex]);
    };

    const handleUpdateDate = (code: string) => {
      const direction = code === Keys.ArrowUp ? -1 : 1;
      updateDate(direction);
    };

    const keys = Object.keys(Keys);

    const handlePressButton = (e: KeyboardEvent) => {
      if (!keys.includes(e.code) || mode.current === 'selectionDisabled') return;
      e.preventDefault();
      if (e.code === Keys.ArrowLeft || e.code === Keys.ArrowRight) handleChangePosition(e.code);
      if (e.code === Keys.ArrowUp || e.code === Keys.ArrowDown) handleUpdateDate(e.code);
    };

    document.addEventListener('keydown', handlePressButton);

    return () => document.removeEventListener('keydown', handlePressButton);
  }, [isInputActive, selectedPart, updateDate]);

  useEffect(() => {
    if (!input.current || !isActive) return;
    input.current.focus();
  }, [isActive]);

  const updateSelection = useCallback((position: null | number, event: EventTarget & HTMLInputElement) => {
    if (!position) {
      selectionMapping['day'](event);
      return setSelectedPart('day');
    }
    if (position >= Limits.dayStart && position <= Limits.dayEnd) {
      selectionMapping['day'](event);
      setSelectedPart('day');
    }
    if (position >= Limits.monthStart && position <= Limits.monthEnd) {
      selectionMapping['month'](event);
      setSelectedPart('month');
    }
    if (position >= Limits.yearStart && position <= Limits.yearEnd) {
      selectionMapping['year'](event);
      setSelectedPart('year');
    }
  }, []);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      mode.current = 'selectionEnabled';
      const event = e as unknown as React.FocusEvent<HTMLInputElement>;
      if (!isValid || !input.current) return;
      const position = event.target.selectionStart;
      updateSelection(position, input.current);
    },
    [isValid, updateSelection]
  );

  const handleInputFocus = useCallback((event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    mode.current = 'selectionEnabled';
    if (event.type === 'blur') setIsInputActive(false);
    if (event.type === 'focus') setIsInputActive(true);
  }, []);

  if (isMobile) {
    return (
      <MobileDatePicker
        className={cn(style.input, style.inputMobile)}
        disableFuture
        format={DATE_FORMAT}
        inputRef={input}
        label="Date"
        onChange={handleDatePickerChange}
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
        onChange={handleDatePickerChange}
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
      onBlur={handleInputFocus}
      onChange={handleDesktopChange}
      onClick={handleInputClick}
      onFocus={handleInputFocus}
      placeholder="DD/MM/YYYY"
      size="medium"
      value={value}
      variant="outlined"
    />
  );
};
