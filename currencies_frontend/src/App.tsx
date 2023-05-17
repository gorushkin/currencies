import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ConverterContextProvider, useConverterContext } from './context/ConverterContext';
import { Currencies } from './components/Currencies/Currencies';
import { WithMemo } from './components/Form/Form';
import { Result } from './components/Result/Result';
import style from './App.module.scss';
import { Footer } from './components/Footer/Footer';

const App = () => {
  const { handleSubmit, isLoading } = useConverterContext();

  if (isLoading) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1 className={style.title}>Converter</h1>
        <Currencies />
        <WithMemo onSubmit={handleSubmit} />
        <Result />
      </div>
      <Footer/>
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
