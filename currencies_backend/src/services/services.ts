import { getRateRequest } from '../api/api';
import convert from 'xml-js';
import { Currencies, CurResponse, Rate } from '../utils/types';
import AppError from '../utils/errorHandling';
import { currenciesList, errorText, rub } from '../utils/constants';

const convertStringToNumber = (str: string) => parseFloat(str.replace(',', '.'));

const getValue = (value: string, nominal: string) => {
  return Number((convertStringToNumber(value) / convertStringToNumber(nominal)).toFixed(4));
};

export const getRate = async (date: string, amount: string) => {
  const { data, ok } = await getRateRequest(date);
  if (!ok) throw new AppError(500, 'Somethings went wrong!!!!');

  const convertedData = convert.xml2js(data, { compact: true });
  const parsedData = convertedData as CurResponse;
  if (parsedData.ValCurs?._text === errorText) throw new AppError(400, 'there is an error with date format');

  const valutes = parsedData.ValCurs.Valute;

  const rates = valutes
    .filter((item) => currenciesList.includes(item.CharCode._text))
    .map((item) => ({
      code: item.CharCode._text,
      rate: 1 / getValue(item.Value._text, item.Nominal._text),
    }));

  const withRubRates = [...rates, rub];

  const currencies = currenciesList.reduce<Currencies>((acc, item) => {
    const fromRate = withRubRates.find((rate) => rate.code === item) as Rate;
    if (!fromRate) return acc;
    const toRates = withRubRates
      .filter((rate) => rate.code !== item)
      .map((rate) => ({
        code: rate.code,
        rate: rate.rate / fromRate.rate,
        amount: (Number(amount) * rate.rate) / fromRate.rate,
      }));
    return { ...acc, [fromRate.code]: toRates };
  }, {} as Currencies);

  return currencies;
};
