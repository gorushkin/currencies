import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ConverterContextProvider, useConverterContext } from '../../context/ConverterContext';
import { Currencies } from '../Currencies/Currencies';
import { WithMemo } from '../Form/Form';
import { Result } from '../Result/Result';
import style from './App.module.scss';
import { Footer } from '../Footer/Footer';
import { Contact } from '../Contact/Contact';
import { useState } from 'react';
import { Typography } from '@mui/material';

const App = () => {
  const { handleSubmit, isLoading } = useConverterContext();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  if (isLoading) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Typography variant='h1' className={style.title}>
          Converter
        </Typography>
        <Currencies />
        <WithMemo onSubmit={handleSubmit} />
        <Result />
      </div>
      <Footer handleClick={setIsInfoOpen} />
      <Contact handleClick={setIsInfoOpen} isInfoOpen={isInfoOpen} />
    </div>
  );
};

const Provider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ConverterContextProvider>
      <App />
    </ConverterContextProvider>
  </LocalizationProvider>
);

export default Provider;
