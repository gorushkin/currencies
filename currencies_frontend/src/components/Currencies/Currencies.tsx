import { useRef } from 'react';

import style from './Currencies.module.scss';
import { CurrencySelector } from './CurrencySelector';

export const Currencies = () => {
  const currencyRef = useRef<HTMLDivElement>(null);

  return (
    <div className={style.currenciesWrapper}>
      <div className={style.wrapper} ref={currencyRef}>
        <CurrencySelector type="from" />
      </div>
      <div className={style.wrapper}>
        <CurrencySelector type="to" />
      </div>
    </div>
  );
};
