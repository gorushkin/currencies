import { Dispatch, FC, useCallback, useEffect } from 'react';
import style from './Contact.module.scss';
import { cn } from '../../utils/utils';
import { Button, Link, Typography } from '@mui/material';

interface InfoProps {
  isInfoOpen: boolean;
  handleClick: Dispatch<React.SetStateAction<boolean>>;
}

const links: { title: string; href: string }[] = [
  { href: 'https://www.linkedin.com/in/gorushkin/', title: 'Linkedin' },
  { href: 'https://github.com/gorushkin', title: 'Github' },
  { href: 'https://t.me/artyomgorushkin', title: 'Telegram' },
];

export const Contact: FC<InfoProps> = ({ isInfoOpen, handleClick }) => {
  const styles = cn(style.wrapper, isInfoOpen ? style.wrapperOpen : style.wrapperClosed);

  const handleClose = useCallback(() => handleClick(false), [handleClick]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') handleClose();
    };

    if (isInfoOpen) document.addEventListener('keydown', handleKeydown);
    if (!isInfoOpen) document.removeEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [handleClose, isInfoOpen]);

  return (
    <div className={styles}>
      <div className={style.container}>
        <Typography variant='h1' className={style.title}>
          Contacts
        </Typography>
        <button onClick={handleClose} className={style.button}>
          <div className={style.buttonHoverShadow}></div>
        </button>
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
        <Button variant='contained' onClick={handleClose} type='button'>
          Close
        </Button>
      </div>
    </div>
  );
};
