import { useRecoilValue } from 'recoil';

import { resultValuesState, selectedCurrenciesState } from '../../state';
import { fetchState } from '../../state/fetchState';
import { roundValue } from '../../utils/utils';
import style from './Result.module.scss';

export const Result = () => {
  const currencies = useRecoilValue(selectedCurrenciesState);
  const resultValues = useRecoilValue(resultValuesState);

  const { rates } = useRecoilValue(fetchState);

  if (!rates) return null;

  const targetCurrency = rates[currencies.from].find((item) => item.code === currencies.to);

  return (
    <div className={style.wrapper}>
      <div className={style.valuesWrapper}>
        <div className={style.values}>
          <span className={style.label}>Date:</span>
          <span className={style.values}>{resultValues.date.value}</span>
        </div>
        <div className={style.values}>
          <span className={style.label}>Amount:</span>
          <span className={style.value}>
            {resultValues.amount.value} {currencies.from} = {roundValue(targetCurrency?.amount)}{' '}
            {currencies.to}
          </span>
        </div>
      </div>
      <ul className={style.list}>
        {rates[currencies.from].map((rate) => (
          <li key={rate.code}>
            <div className={style.label}>{rate.code}</div>
            <div className={style.value}>{roundValue(rate.rate)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
