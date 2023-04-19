import { Typography, Button, ButtonGroup } from '@mui/material';
import { Currency } from '../../utils/constants';
import { memo } from 'react';

export const CurrencySelector = memo(
  ({
    activeCurrency: activeItem,
    onClick,
    title,
  }: {
    activeCurrency: any;
    onClick: (item: Currency) => void;
    title: string;
  }) => (
    <div className='currencies'>
      <Typography variant='subtitle1'>{title}</Typography>
      <ButtonGroup
        className='button_group'
        variant='contained'
        aria-label='outlined primary button group'
      >
        {Object.values(Currency).map((item) => {
          const color = item === activeItem ? 'success' : 'info';
          return (
            <Button onClick={() => onClick(item)} color={color} key={item}>
              {item}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  )
);
