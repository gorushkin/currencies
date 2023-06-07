import { useRef } from 'react';
import { CurrencySelector } from './CurrencySelector';
import style from './Currencies.module.scss';

export const Currencies = () => {
  const currencyRef = useRef<HTMLDivElement>(null);

  return (
    <div className={style.currenciesWrapper}>
      <div ref={currencyRef} className={style.wrapper}>
        <CurrencySelector type='from' />
      </div>
      <div className={style.wrapper}>
        <CurrencySelector type='to' />
      </div>
    </div>
  );
};
