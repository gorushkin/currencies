import { useExportContext } from '../../context/AppContext';

export const Result = () => {
  const { currencies, rates, resultValues } = useExportContext();

  if (!rates) return null;

  return (
    <div className='result__wrapper'>
      <div className='result__values-wrapper'>
        <div className='result__values'>
          <span className='result__label'>Date:</span>
          <span className='result__value'>{resultValues.date}</span>
        </div>
        <div className='result__values'>
          <span className='result__label'>Amount:</span>
          <span className='result__value'>{resultValues.amount}</span>
        </div>
      </div>
      <ul className='result__list'>
        {rates[currencies.from].map((rate) => (
          <li key={rate.code}>
            <div className='result__label'>{rate.code}</div>
            <div className='result__value'>{rate.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
