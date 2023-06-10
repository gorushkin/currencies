import dayjs from 'dayjs';
import { atom } from 'recoil';

import { DATE_FORMAT } from '../utils/constants';

export type Values = {
  amount: { isValid: boolean, value: string },
  date: { isValid: boolean, value: string },
};

const date = dayjs(new Date()).format(DATE_FORMAT);

const initialValue: Values = {
  amount: { isValid: false, value: '' },
  date: { isValid: !!date, value: date },
};

export const formValuesState = atom<Values>({
  default: initialValue,
  key: 'formValuesState',
});

export const resultValuesState = atom<Values>({
  default: initialValue,
  key: 'resultValuesState',
});
