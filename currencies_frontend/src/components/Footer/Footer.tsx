import { FC } from 'react';
import style from './Footer.module.scss';
import { Typography } from '@mui/material';

interface FooterProps {
  onClick: () => void;
}

export const Footer: FC<FooterProps> = ({ onClick }) => (
  <div className={style.footer}>
    <Typography className={style.name}>Gorushkin Artyom</Typography>
    <button onClick={onClick} type='button' className={style.button}>
      Contact Me!!!!
    </button>
  </div>
);
