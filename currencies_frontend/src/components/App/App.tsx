import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import { Settings } from '../Settings/Settings';
import { RecoilRoot } from 'recoil';

const App = () => {
  const [isContactsOpen, openContacts, closeContacts] = useSlider();
  const [isSettingsOpen, openSettings, closeSettings] = useSlider();

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <button onClick={openSettings} className={style.gearIcon}>
          <img width={35} height={35} alt='settings' src={gearIcon} />
          <div className={style.gearIconHoverShadow}></div>
        </button>
        <Typography variant='h1' className={style.title}>
          Converter
        </Typography>
        <Currencies />
        <WithMemo />
        <Result />
      </div>
      <Footer onClick={openContacts} />
      <Slider title='Converter' onClose={closeContacts} isOpen={isContactsOpen}>
        <Contact />
      </Slider>
      <Slider title='Settings' onClose={closeSettings} isOpen={isSettingsOpen}>
        <Settings />
      </Slider>
    </div>
  );
};

const Provider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </LocalizationProvider>
);

export default Provider;
