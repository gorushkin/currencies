import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { CurrencySelector } from './CurrencySelector';
import { Currency } from '../../utils/constants';
import { cn } from '../../utils/utils';
import { useExportContext } from '../../context/AppContext';

export const Currencies = () => {
  const [activeCurrency, setActiveCurrency] = useState(Currency.RUB);
  const [targetCurrency, setTargetCurrency] = useState(Currency.USD);

  const currencyRef = useRef<HTMLDivElement>(null);

  const { setWidth } = useExportContext();

  useLayoutEffect(() => {
    if (!currencyRef.current) return;
    const width = currencyRef.current.offsetWidth;
    setWidth(width);
  }, []);

  const handleActiveCurrencyClick = useCallback((item: Currency) => setActiveCurrency(item), []);
  const handleTargetCurrencyClick = useCallback((item: Currency) => setTargetCurrency(item), []);
  return (
    <>
      <div ref={currencyRef} className={cn('currency_wrapper', 'wrapper')}>
        <CurrencySelector
          title='Исходная валюта'
          activeCurrency={activeCurrency}
          onClick={handleActiveCurrencyClick}
        />
      </div>
      <div className={cn('currency_wrapper', 'wrapper')}>
        <CurrencySelector
          title='Цель'
          activeCurrency={targetCurrency}
          onClick={handleTargetCurrencyClick}
        />
      </div>
    </>
  );
};
