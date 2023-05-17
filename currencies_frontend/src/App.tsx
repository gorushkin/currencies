import './App.scss';
import { cn } from './utils/utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppContextProvider, useExportContext } from './context/AppContext';
import { Currencies } from './components/Currencies/Currencies';
import { WithMemo } from './components/Form/Form';
import { Result } from './components/Result/Result';

const App = () => {
  const { width, handleSubmit } = useExportContext();

  return (
    <div className={cn('container')}>
      <Currencies />
      <WithMemo width={width} onSubmit={handleSubmit} />
      <Result />
    </div>
  );
};

const Provider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </LocalizationProvider>
);

export default Provider;
