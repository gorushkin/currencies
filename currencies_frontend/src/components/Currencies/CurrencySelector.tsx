import { Typography, Button, ButtonGroup } from '@mui/material';
import { Currency } from '../../utils/constants';
import { CSSProperties, FC, memo } from 'react';
import style from './Currencies.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currenciesState, selectedCurrenciesState } from '../../state';

type SelectorType = 'from' | 'to';

type CurrencySelectorProps = { type: 'from' | 'to' };

const titleMapping: Record<SelectorType, string> = { from: 'From:', to: 'To:' };

export const CurrencySelector: FC<CurrencySelectorProps> = memo(({ type }) => {
  const [currencies, setCurrencies] = useRecoilState(selectedCurrenciesState);
  const selectorCurrencies = useRecoilValue(currenciesState);

  const buttonStyle: CSSProperties = { width: `${100 / selectorCurrencies.length}%` };

  const handleClick = (item: Currency) => {
    setCurrencies((prev) => ({ ...prev, [type]: item }));
  };

  return (
    <div className={style.currencies}>
      <Typography variant='subtitle1'>{titleMapping[type]}</Typography>
      <ButtonGroup
        className={style.buttonGroup}
        variant='contained'
        aria-label='outlined primary button group'
      >
        {selectorCurrencies.map(({ item, disabled }) => {
          const color = item === currencies[type] ? 'success' : 'info';
          return (
            <Button
              style={buttonStyle}
              className={style.button}
              disabled={disabled}
              onClick={() => handleClick(item)}
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
});
