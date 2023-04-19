import './App.scss';
import { Container } from '@mui/material';
import { cn } from './utils/utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppContextProvider } from './context/AppContext';
import { Currencies } from './components/Currencies/Currencies';
import { Form } from './components/Form/Form';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppContextProvider>
        <Container>
          <div className={cn('container')}>
            <Currencies />
            <Form />
          </div>
        </Container>
      </AppContextProvider>
    </LocalizationProvider>
  );
}

export default App;
