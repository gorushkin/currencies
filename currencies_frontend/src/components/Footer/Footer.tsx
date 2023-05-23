import { Dispatch, FC } from 'react';
import style from './Footer.module.scss';
import { Typography } from '@mui/material';
import { useMedia } from '../../hooks/useMedia';

interface FooterProps {
  handleClick: Dispatch<React.SetStateAction<boolean>>;
}

export const Footer: FC<FooterProps> = ({ handleClick }) => {

  const list = useMedia();
  console.log('list: ', list);

  return (
    <div className={style.footer}>
      <Typography className={style.name}>Gorushkin Artyom</Typography>
      <button onClick={() => handleClick(true)} type='button' className={style.button}>
        Contact Me!!!!
      </button>
    </div>
  );
};
