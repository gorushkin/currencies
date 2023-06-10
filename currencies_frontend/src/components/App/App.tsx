import { Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RecoilRoot } from 'recoil';

import gearIcon from '../../assets/gear_icon.svg';
import { useSlider } from '../../hooks/useSlider';
import { Contact } from '../Contact/Contact';
import { Currencies } from '../Currencies/Currencies';
import { Footer } from '../Footer/Footer';
import { WithMemo } from '../Form/Form';
import { Result } from '../Result/Result';
import { Settings } from '../Settings/Settings';
import { Slider } from '../Slider/Slider';
import style from './App.module.scss';

const App = () => {
  const [isContactsOpen, openContacts, closeContacts] = useSlider();
  const [isSettingsOpen, openSettings, closeSettings] = useSlider();

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <button className={style.gearIcon} onClick={openSettings}>
          <img alt="settings" height={35} src={gearIcon} width={35} />
          <div className={style.gearIconHoverShadow}></div>
        </button>
        <Typography className={style.title} variant="h1">
          Converter
        </Typography>
        <Currencies />
        <WithMemo />
        <Result />
      </div>
      <Footer onClick={openContacts} />
      <Slider isOpen={isContactsOpen} onClose={closeContacts} title="Converter">
        <Contact />
      </Slider>
      <Slider isOpen={isSettingsOpen} onClose={closeSettings} title="Settings">
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
