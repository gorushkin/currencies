import { useState } from 'react';
import './App.scss';
import { Container } from '@mui/material';
import { Currencies } from './Currencies';
import { Currency } from './constants';

function App() {
  const [activeCurrency, setActiveCurrency] = useState(Currency.RUB);
  const [targetCurrency, setTargetCurrency] = useState(Currency.USD);

  const handleActiveCurrencyClick = (item: Currency) => setActiveCurrency(item);
  const handleTargetCurrencyClick = (item: Currency) => setTargetCurrency(item);

  return (
    <Container className='container' maxWidth='lg'>
      <Currencies title='Исходная валюта' activeCurrency={activeCurrency} onClick={handleActiveCurrencyClick} />
      <Currencies title='Цель' activeCurrency={targetCurrency} onClick={handleTargetCurrencyClick} />
    </Container>
  );
}

export default App;
