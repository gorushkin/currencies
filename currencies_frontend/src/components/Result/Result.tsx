import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useExportContext } from '../../context/AppContext';

export const Result = () => {
  const { currencies, rates, values, resultValues, width } = useExportContext();

  if (!rates) return null;

  return (
    <>
      <div style={{ width: `${width}px` }} className='result__values-wrapper'>
        <div className='result_values'>
          <span className='result__label'>Date:</span>
          <span className='result__value'>{resultValues.date}</span>
        </div>
        <div className='result_values'>
          <span className='result__label'>Amount:</span>
          <span className='result__value'>{resultValues.amount}</span>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label='simple table'>
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
    </>
  );
};
