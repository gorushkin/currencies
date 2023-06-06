import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ConverterContextProvider, useConverterContext } from '../../context/ConverterContext';
import { Currencies } from '../Currencies/Currencies';
import { WithMemo } from '../Form/Form';
import { Result } from '../Result/Result';
import style from './App.module.scss';
import { Footer } from '../Footer/Footer';
import { Contact } from '../Contact/Contact';
import { Typography } from '@mui/material';
import { Slider } from '../Slider/Slider';
import { useSlider } from '../../hooks/useSlider';

const App = () => {
  const { handleSubmit, isLoading } = useConverterContext();

  const [isContactsOpen, openContacts, closeContacts] = useSlider();

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
      <Footer onClick={openContacts} />
      <Slider isOpen={isContactsOpen}>
        <Contact onClose={closeContacts} />
      </Slider>
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
