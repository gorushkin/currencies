import { atom } from 'recoil';
import { DATE_FORMAT } from '../utils/constants';
import dayjs from 'dayjs';

export type Values = {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
};

const date = dayjs(new Date()).format(DATE_FORMAT);

const initialValue: Values = {
  amount: { value: '', isValid: false },
  date: { value: date, isValid: !!date },
};

export const formValuesState = atom<Values>({
  key: 'formValuesState',
  default: initialValue,
});
