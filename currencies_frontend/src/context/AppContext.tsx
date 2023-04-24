import { ReactElement, createContext, useContext, useMemo, useState, useCallback } from 'react';
import {
  Context,
  CurrencyRates,
  CurrenciesStateType,
  Values,
  HandleChangeType,
  HandleClickType,
  ResultValues,
} from '../types';
import { Currency, initState } from '../utils/constants';

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [width, setWidth] = useState(0);

  const [currencies, setCurrencies] = useState<CurrenciesStateType>({
    from: Currency.RUB,
    to: Currency.USD,
  });

  const [rates, setRates] = useState<CurrencyRates>(null);

  const [values, setValues] = useState<Values>(initState);
  const [resultValues, setResultValues] = useState<ResultValues>({ amount: '', date: '' });

  const handleClick: HandleClickType = useCallback(
    (type) => (item) => setCurrencies((state) => ({ ...state, [type]: item })),
    []
  );

  const updateWidth = useCallback((width: number) => setWidth(width), []);

  const updateRates = useCallback((rates: CurrencyRates) => {
    setRates(rates);
    setResultValues({ amount: values.amount.value, date: values.date.value });
  }, [values]);

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
    }),
    [width, currencies, rates, values, resultValues]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useExportContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { AppContextProvider, useExportContext };
