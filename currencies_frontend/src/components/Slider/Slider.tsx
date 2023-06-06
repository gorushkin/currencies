import { Button, Typography } from '@mui/material';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DESKTOP_QUERY } from '../../utils/constants';
import { cn } from '../../utils/utils';
import style from './Slider.module.scss';
import { FC } from 'react';

type SliderProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const Slider: FC<SliderProps> = ({ children, isOpen, onClose, title }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  const wrapperStyles = cn(style.wrapper, isOpen ? style.wrapperOpen : style.wrapperClosed);

  return (
    <div className={wrapperStyles}>
      {isDesktop && (
        <button onClick={onClose} className={style.closeButton}>
          <div className={style.buttonHoverShadow}></div>
        </button>
      )}
      <div className={style.container}>
        <Typography variant='h1' className={style.title}>
          {title}
        </Typography>
        <div className={style.content}>{children}</div>
        <Button className={style.button} variant='contained' onClick={onClose} type='button'>
          Close
        </Button>
      </div>
    </div>
  );
};
