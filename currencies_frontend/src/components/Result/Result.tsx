import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useExportContext } from '../../context/AppContext';

export const Result = () => {
  const { currencies, rates, values } = useExportContext();

  if (!rates) return null;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rates[currencies.from].map((rate) => (
            <TableRow key={rate.code} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {rate.code}
              </TableCell>
              <TableCell align='right'>{rate.rate * Number(values.amount.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
