import { FC } from 'react';
import style from './Contact.module.scss';
import { Button, Link, Typography } from '@mui/material';
import { links } from '../../utils/constants';

type ContactProps = {
  onClose: () => void;
};

export const Contact: FC<ContactProps> = ({ onClose }) => {
  return (
    <>
      <Typography variant='h1' className={style.title}>
        Contacts
      </Typography>

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
