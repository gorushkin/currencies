import style from './Contact.module.scss';
import { Link } from '@mui/material';
import { links } from '../../utils/constants';

export const Contact = () => (
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
);
