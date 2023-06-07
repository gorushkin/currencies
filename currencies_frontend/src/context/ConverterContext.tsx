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

type HandleSubmit = ({ date, amount }: { date: string; amount: string }) => Promise<void>;

export type ConverterContextType = {
  currencies: CurrenciesStateType;
  handleClick: HandleClickType;
  handleSubmit: HandleSubmit;
  rates: CurrencyRates;
  resultValues: ResultValues;
  updateResultValues: (values: ResultValues) => void;
  selectorCurrencies: SelectorCurrency[];
  isLoading: boolean;
};

const ConverterContext = createContext<ConverterContextType | null>(null);

const ConverterContextProvider = ({ children }: { children: ReactElement }) => {
  const [saveSettings, getSettings] = useLocalStorage<CurrenciesStateType>('settings');
  const [isLoading, setIsLoading] = useState(true);

  const [currencies, setCurrencies] = useState<CurrenciesStateType>(initCurrenciesSate);

  useLayoutEffect(() => {
    const settings = getSettings() ?? initCurrenciesSate;
    setIsLoading(false);
    setCurrencies(settings);
  }, [getSettings]);

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
      currencies,
      handleClick,
      rates,
      handleSubmit,
      updateResultValues,
      selectorCurrencies,
      resultValues,
      isLoading,
    }),
    [
      currencies,
      handleClick,
      rates,
      handleSubmit,
      updateResultValues,
      selectorCurrencies,
      resultValues,
      isLoading,
    ]
  );

  return <ConverterContext.Provider value={context}>{children}</ConverterContext.Provider>;
};

const useConverterContext = () => {
  const context = useContext(ConverterContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { ConverterContextProvider, useConverterContext };
