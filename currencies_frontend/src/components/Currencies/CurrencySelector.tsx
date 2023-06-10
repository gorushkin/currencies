import { Button, ButtonGroup, Typography } from '@mui/material';
import { CSSProperties, FC, memo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { currenciesState, selectedCurrenciesState } from '../../state';
import { Currency } from '../../utils/constants';
import style from './Currencies.module.scss';

type SelectorType = 'from' | 'to';

type CurrencySelectorProps = { type: 'from' | 'to' };

const titleMapping: Record<SelectorType, string> = { from: 'From:', to: 'To:' };

export const CurrencySelector: FC<CurrencySelectorProps> = memo(({ type }) => {
  const [currencies, setCurrencies] = useRecoilState(selectedCurrenciesState);
  const selectorCurrencies = useRecoilValue(currenciesState);

  const buttonStyle: CSSProperties = {
    width: `${100 / selectorCurrencies.length}%`,
  };

  const handleClick = (item: Currency) => {
    setCurrencies((prev) => ({ ...prev, [type]: item }));
  };

  return (
    <div className={style.currencies}>
      <Typography variant="subtitle1">{titleMapping[type]}</Typography>
      <ButtonGroup
        aria-label="outlined primary button group"
        className={style.buttonGroup}
        variant="contained"
      >
        {selectorCurrencies.map(({ disabled, item }) => {
          const color = item === currencies[type] ? 'success' : 'info';
          return (
            <Button
              className={style.button}
              color={color}
              disabled={disabled}
              key={item}
              onClick={() => handleClick(item)}
              style={buttonStyle}
            >
              {item}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
});
