import { Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RecoilRoot } from 'recoil';

import { useSlider } from '../../hooks/useSlider';
import { Contact } from '../Contact/Contact';
import { Currencies } from '../Currencies/Currencies';
import { ExtraButtons } from '../ExtraButtons/ExtraButtons';
import { Footer } from '../Footer/Footer';
import { WithMemo } from '../Form/Form';
import { Help } from '../Help/Help';
import { Result } from '../Result/Result';
import { Settings } from '../Settings/Settings';
import { Slider } from '../Slider/Slider';
import style from './App.module.scss';

const App = () => {
  const [isContactsOpen, openContacts, closeContacts] = useSlider();
  const [isSettingsOpen, openSettings, closeSettings] = useSlider();
  const [isHelpOpen, openHelp, closeHelp] = useSlider();

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <ExtraButtons onHelpClick={openHelp} onSettingsClick={openSettings} />
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
      <Slider direction="right" isOpen={isSettingsOpen} onClose={closeSettings} title="Settings">
        <Settings />
      </Slider>
      <Slider direction="right" isOpen={isHelpOpen} onClose={closeHelp} title="Help">
        <Help />
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
