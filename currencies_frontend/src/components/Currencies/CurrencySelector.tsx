import { Typography, Button, ButtonGroup } from '@mui/material';
import { Currency } from '../../utils/constants';
import { memo } from 'react';
import { useExportContext } from '../../context/AppContext';
import styles from './Currencies.module.scss';

export const CurrencySelector = memo(
  ({
    activeCurrency: activeItem,
    onClick,
    title,
  }: {
    activeCurrency: any;
    onClick: (item: Currency) => void;
    title: string;
  }) => {
    const { selectorCurrencies } = useExportContext();

    return (
      <div className={styles.currencies}>
        <Typography variant='subtitle1'>{title}</Typography>
        <ButtonGroup
          className='button_group'
          variant='contained'
          aria-label='outlined primary button group'
        >
          {selectorCurrencies.map(({ item, disabled }) => {
            const color = item === activeItem ? 'success' : 'info';
            return (
              <Button disabled={disabled} onClick={() => onClick(item)} color={color} key={item}>
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    );
  }
);
