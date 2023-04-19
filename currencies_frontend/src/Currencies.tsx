import { Container, Typography, Button, ButtonGroup } from '@mui/material';
import { Currency } from './constants';

export const Currencies = ({
  activeCurrency: activeItem,
  onClick,
  title,
}: {
  activeCurrency: any;
  onClick: (item: Currency) => void;
  title: string;
}) => {
  return (
    <Container>
      <Typography variant='subtitle1'>{title}</Typography>
      <ButtonGroup variant='contained' aria-label='outlined primary button group'>
        {Object.values(Currency).map((item) => {
          const color = item === activeItem ? 'success' : 'info';
          return (
            <Button onClick={() => onClick(item)} color={color} key={item}>
              {item}
            </Button>
          );
        })}
      </ButtonGroup>
    </Container>
  );
};
