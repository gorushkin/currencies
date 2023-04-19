import './App.scss';
import { Container } from '@mui/material';
import { cn } from './utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Form } from './Form';
import { Currencies } from './Currencies';
import { AppContextProvider } from './AppContext';

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
