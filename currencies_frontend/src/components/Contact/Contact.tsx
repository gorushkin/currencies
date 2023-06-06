import { FC } from 'react';
import style from './Contact.module.scss';
import { Button, Link, Typography } from '@mui/material';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DESKTOP_QUERY, links } from '../../utils/constants';

type ContactProps = {
  onClose: () => void;
};

export const Contact: FC<ContactProps> = ({ onClose }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <>
      <Typography variant='h1' className={style.title}>
        Contacts
      </Typography>
      {isDesktop && (
        <button onClick={onClose} className={style.button}>
          <div className={style.buttonHoverShadow}></div>
        </button>
      )}
      <ul className={style.linkList}>
        {links.map(({ href, title }) => {
          return (
            <li key={title} className={style.linkItem}>
              <Link target='_blank' rel='noopener' underline='hover' variant='h6' href={href}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <Button variant='contained' onClick={onClose} type='button'>
        Close
      </Button>
    </>
  );
};
