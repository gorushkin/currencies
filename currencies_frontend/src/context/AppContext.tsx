import { ReactElement, createContext, useContext, useMemo, useState, useCallback } from 'react';
import {
  CurrencyRates,
  CurrenciesStateType,
  Values,
  HandleChangeType,
  HandleClickType,
  ResultValues,
  SelectorCurrency,
  Name,
} from '../types';
import { Currency, initCurrenciesSate, initState } from '../utils/constants';
import { resetCurrencies } from '../utils/utils';

export type Context = {
  width: number;
  currencies: CurrenciesStateType;
  handleClick: HandleClickType;
  updateWidth: (width: number) => void;
  updateRates: (rates: CurrencyRates) => void;
  rates: CurrencyRates;
  values: Values;
  handleChange: HandleChangeType;
  resultValues: ResultValues;
  updateResultValues: (values: ResultValues) => void;
  selectorCurrencies: SelectorCurrency[];
};

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [width, setWidth] = useState(0);

  const [currencies, setCurrencies] = useState<CurrenciesStateType>(initCurrenciesSate);

  const [selectorCurrencies, setSelectorCurrencies] = useState<SelectorCurrency[]>(
    Object.values(Currency).map((item) => ({ item, disabled: false }))
  );

  const [rates, setRates] = useState<CurrencyRates>(null);

  const [values, setValues] = useState<Values>(initState);
  const [resultValues, setResultValues] = useState<ResultValues>({ amount: '', date: '' });

  const handleClick: HandleClickType = useCallback(
    (type) => (item) => setCurrencies((state) => ({ ...state, [type]: item })),
    []
  );

  const updateWidth = useCallback((width: number) => setWidth(width), []);

  const updateRates = useCallback(
    (rates: CurrencyRates) => {
      setRates(rates);
      setResultValues({ amount: values.amount.value, date: values.date.value });
      if (!rates) return;
      const resultRates = Object.keys(rates) as Currency[];

      Object.entries(currencies).forEach(([name, currency]) => {
        resetCurrencies({
          currencies: resultRates,
          currency,
          name: name as Name,
          setCurrencies,
        });
      });

      setSelectorCurrencies((state) =>
        state.map((item) => ({
          ...item,
          disabled: !resultRates.includes(item.item),
        }))
      );
    },
    [values]
  );

  const updateResultValues = useCallback((values: ResultValues) => setResultValues(values), []);

  const handleChange: HandleChangeType = useCallback(({ name, value, isValid }) => {
    setValues((state) => ({ ...state, [name]: { value, isValid } }));
  }, []);

  const context = useMemo(
    () => ({
      width,
      currencies,
      handleClick,
      updateWidth,
      rates,
      updateRates,
      values,
      handleChange,
      resultValues,
      updateResultValues,
      selectorCurrencies,
    }),
    [width, currencies, rates, values, resultValues, selectorCurrencies]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useExportContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { AppContextProvider, useExportContext };
