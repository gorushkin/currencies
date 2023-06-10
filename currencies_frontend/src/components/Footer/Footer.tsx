import { Typography } from '@mui/material';
import { FC } from 'react';

import style from './Footer.module.scss';

interface FooterProps {
  onClick: () => void;
}

export const Footer: FC<FooterProps> = ({ onClick }) => (
  <div className={style.footer}>
    <Typography className={style.name}>Gorushkin Artyom</Typography>
    <button className={style.button} onClick={onClick} type="button">
      Contact Me!!!!
    </button>
  </div>
);
