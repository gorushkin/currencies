import { useExportContext } from '../../context/AppContext';
import styles from './Result.module.scss';

export const Result = () => {
  const { currencies, rates, resultValues } = useExportContext();

  if (!rates) return null;

  const targetCurrency = rates[currencies.from].find((item) => item.code === currencies.to);

  return (
    <div className={styles.wrapper}>
      <div className={styles.valuesWrapper}>
        <div className={styles.values}>
          <span className={styles.label}>Date:</span>
          <span className={styles.values}>{resultValues.date}</span>
        </div>
        <div className={styles.values}>
          <span className={styles.label}>Amount:</span>
          <span className={styles.value}>
            {resultValues.amount} {currencies.from} = {targetCurrency?.amount.toFixed(2)}{' '}
            {currencies.to}
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {rates[currencies.from].map((rate) => (
          <li key={rate.code}>
            <div className={styles.label}>{rate.code}</div>
            <div className={styles.value}>{rate.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
