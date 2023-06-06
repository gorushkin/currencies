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
import gearIcon from '../../assets/gear_icon.svg';

const App = () => {
  const { handleSubmit, isLoading } = useConverterContext();

  const [isContactsOpen, openContacts, closeContacts] = useSlider();

  if (isLoading) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <img className={style.gearIcon} width={35} height={35} alt='settings' src={gearIcon} />
        <Typography variant='h1' className={style.title}>
          Converter
        </Typography>
        <Currencies />
        <WithMemo onSubmit={handleSubmit} />
        <Result />
      </div>
      <Footer onClick={openContacts} />
      <Slider onClose={closeContacts} isOpen={isContactsOpen}>
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
