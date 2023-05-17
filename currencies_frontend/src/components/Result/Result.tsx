import { useConverterContext } from '../../context/ConverterContext';
import style from './Result.module.scss';

export const Result = () => {
  const { currencies, rates, resultValues } = useConverterContext();

  if (!rates) return null;

  const targetCurrency = rates[currencies.from].find((item) => item.code === currencies.to);

  return (
    <div className={style.wrapper}>
      <div className={style.valuesWrapper}>
        <div className={style.values}>
          <span className={style.label}>Date:</span>
          <span className={style.values}>{resultValues.date}</span>
        </div>
        <div className={style.values}>
          <span className={style.label}>Amount:</span>
          <span className={style.value}>
            {resultValues.amount} {currencies.from} = {targetCurrency?.amount.toFixed(2)}{' '}
            {currencies.to}
          </span>
        </div>
      </div>
      <ul className={style.list}>
        {rates[currencies.from].map((rate) => (
          <li key={rate.code}>
            <div className={style.label}>{rate.code}</div>
            <div className={style.value}>{rate.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
