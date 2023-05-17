import { useRef } from 'react';
import { CurrencySelector } from './CurrencySelector';
import { useConverterContext } from '../../context/ConverterContext';
import style from './Currencies.module.scss';

export const Currencies = () => {
  const currencyRef = useRef<HTMLDivElement>(null);

  const { currencies, handleClick } = useConverterContext();

  return (
    <div className={style.currenciesWrapper}>
      <div ref={currencyRef} className={style.wrapper}>
        <CurrencySelector
          title='From:'
          activeCurrency={currencies.from}
          onClick={handleClick('from')}
        />
      </div>
      <div className={style.wrapper}>
        <CurrencySelector title='To:' activeCurrency={currencies.to} onClick={handleClick('to')} />
      </div>
    </div>
  );
};
