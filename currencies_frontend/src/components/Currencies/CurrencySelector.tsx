import { Typography, Button, ButtonGroup } from '@mui/material';
import { Currency } from '../../utils/constants';
import { CSSProperties, memo } from 'react';
import { useConverterContext } from '../../context/ConverterContext';
import style from './Currencies.module.scss';

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
    const { selectorCurrencies } = useConverterContext();

    const buttonStyle: CSSProperties = { width: `${100 / selectorCurrencies.length}%` };

    return (
      <div className={style.currencies}>
        <Typography variant='subtitle1'>{title}</Typography>
        <ButtonGroup
          className={style.buttonGroup}
          variant='contained'
          aria-label='outlined primary button group'
        >
          {selectorCurrencies.map(({ item, disabled }) => {
            const color = item === activeItem ? 'success' : 'info';
            return (
              <Button
                style={buttonStyle}
                className={style.button}
                disabled={disabled}
                onClick={() => onClick(item)}
                color={color}
                key={item}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    );
  }
);
