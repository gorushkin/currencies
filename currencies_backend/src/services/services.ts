import { getRateRequest } from '../api/api';
import convert from 'xml-js';
import { Currencies, CurResponse } from '../utils/types';
import AppError from '../utils/errorHandling';
import { currenciesList, errorText } from '../utils/constants';

const convertStringToNumber = (str: string) => parseFloat(str.replace(',', '.'));

const getValue = (value: string, nominal: string) => {
  return Number((convertStringToNumber(value) / convertStringToNumber(nominal)).toFixed(4));
};

export const getRate = async (date: string) => {
  const { data, ok } = await getRateRequest(date);
  if (!ok) throw new AppError(500, 'Somethings went wrong!!!!');

  const convertedData = convert.xml2js(data, { compact: true });
  const parsedData = convertedData as CurResponse;
  if (parsedData.ValCurs?._text === errorText) throw new AppError(400, 'there is an error with date format');

  const valutes = parsedData.ValCurs.Valute;
  const currencies = valutes.reduce<Currencies>((acc, item) => {
    if (!currenciesList.includes(item.CharCode._text)) return acc;

    return {
      ...acc,
      [item.CharCode._text]: {
        name: item.Name._text,
        value: getValue(item.Value._text, item.Nominal._text),
        code: item.CharCode._text,
      },
    };
  }, {} as Currencies);
  return currencies;
};
