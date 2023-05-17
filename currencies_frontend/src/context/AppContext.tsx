import {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  CurrencyRates,
  CurrenciesStateType,
  HandleClickType,
  ResultValues,
  SelectorCurrency,
  Name,
} from '../types';
import { Currency, initCurrenciesSate } from '../utils/constants';
import { resetCurrencies } from '../utils/utils';
import { getRatesRequest } from '../api/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

type HandleSubmit = ({ date, amount }: { date: string; amount: string }) => void;

export type Context = {
  width: number;
  currencies: CurrenciesStateType;
  handleClick: HandleClickType;
  updateWidth: (width: number) => void;
  handleSubmit: HandleSubmit;
  rates: CurrencyRates;
  resultValues: ResultValues;
  updateResultValues: (values: ResultValues) => void;
  selectorCurrencies: SelectorCurrency[];
  isLoading: boolean;
};

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [width, setWidth] = useState(0);
  const { readSettings, saveSettings } = useLocalStorage<CurrenciesStateType>('settings');
  const [isLoading, setIsLoading] = useState(true);

  const [currencies, setCurrencies] = useState<CurrenciesStateType>(initCurrenciesSate);

  useLayoutEffect(() => {
    const settings = readSettings() || initCurrenciesSate;
    setIsLoading(false);
    setCurrencies(settings);
  }, [readSettings]);

  const [selectorCurrencies, setSelectorCurrencies] = useState<SelectorCurrency[]>(
    Object.values(Currency).map((item) => ({ item, disabled: false }))
  );

  const [rates, setRates] = useState<CurrencyRates>(null);

  const [resultValues, setResultValues] = useState<ResultValues>({ amount: '', date: '' });

  const handleClick: HandleClickType = useCallback(
    (type) => (item) => {
      setCurrencies((state) => ({ ...state, [type]: item }));
    },
    []
  );

  useEffect(() => {
    saveSettings(currencies);
  }, [currencies, saveSettings]);

  const updateWidth = useCallback((width: number) => setWidth(width), []);

  const updateRates = useCallback(
    (rates: CurrencyRates, amount: string, date: string) => {
      setRates(rates);
      setResultValues({ amount, date });
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
    [currencies]
  );

  const handleSubmit: HandleSubmit = useCallback(
    async ({ amount, date }) => {
      const { rates } = await getRatesRequest(date, amount);
      updateRates(rates, amount, date);
    },
    [updateRates]
  );

  const updateResultValues = useCallback((values: ResultValues) => setResultValues(values), []);

  const context = useMemo(
    () => ({
      width,
      currencies,
      handleClick,
      updateWidth,
      rates,
      handleSubmit,
      updateResultValues,
      selectorCurrencies,
      resultValues,
      isLoading,
    }),
    [
      width,
      currencies,
      handleClick,
      updateWidth,
      rates,
      handleSubmit,
      updateResultValues,
      selectorCurrencies,
      resultValues,
      isLoading,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useExportContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { AppContextProvider, useExportContext };
