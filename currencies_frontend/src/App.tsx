import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import './App.scss';
import { Container, Button } from '@mui/material';
import { Currencies } from './Currencies';
import { Currency, initState } from './constants';
import { DateInput } from './DateInput';
import { AmountInput } from './AmountInput';
import { cn } from './utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ValuesState, ValueHanlder, ActiveInput, Mode } from './types';

function App() {
  const [activeCurrency, setActiveCurrency] = useState(Currency.RUB);
  const [targetCurrency, setTargetCurrency] = useState(Currency.USD);
  const [activeInput, setActiveInput] = useState<ActiveInput>('date');
  const [mode, setMode] = useState<Mode>('inputDate');
  const [width, setWidth] = useState(0);
  const currencyRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<ValuesState>(initState);

  useLayoutEffect(() => {
    if (!currencyRef.current) return;
    const width = currencyRef.current.offsetWidth;
    setWidth(width);
  }, []);

  const handleValueChange: ValueHanlder = ({ value, name, isValid }) => {
    setValues((state) => ({ ...state, [name]: { value, isValid } }));
  };

  const handleActiveCurrencyClick = useCallback((item: Currency) => setActiveCurrency(item), []);
  const handleTargetCurrencyClick = useCallback((item: Currency) => setTargetCurrency(item), []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values.amount.value);
    console.log(values.date.value.format('YYYY-MM-DD'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <form onSubmit={handleFormSubmit}>
          <div className={cn('container')}>
            <div ref={currencyRef} className={cn('currency_wrapper', 'wrapper')}>
              <Currencies
                title='Исходная валюта'
                activeCurrency={activeCurrency}
                onClick={handleActiveCurrencyClick}
              />
            </div>
            <div className={cn('currency_wrapper', 'wrapper')}>
              <Currencies
                title='Цель'
                activeCurrency={targetCurrency}
                onClick={handleTargetCurrencyClick}
              />
            </div>
            <div style={{ width: `${width}px` }} className={cn('input_wrapper', 'wrapper')}>
              <DateInput
                isActive={activeInput === 'date'}
                value={values.date.value}
                isValid={values.date.isValid}
                onChange={handleValueChange}
              />
            </div>
            <div style={{ width: `${width}px` }} className={cn('input_wrapper', 'wrapper')}>
              <AmountInput
                isActive={activeInput === 'amount'}
                value={values.amount.value}
                isValid={values.amount.isValid}
                onChange={handleValueChange}
              />
            </div>
            <div style={{ width: `${width}px` }} className={cn('input_wrapper', 'wrapper')}>
              <Button type='submit' variant='outlined' color='primary' className='submit_button'>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
