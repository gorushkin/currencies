import { Link } from '@mui/material';

import { links } from '../../utils/constants';
import style from './Contact.module.scss';

export const Contact = () => (
  <ul className={style.linkList}>
    {links.map(({ href, title }) => {
      return (
        <li className={style.linkItem} key={title}>
          <Link
            href={href}
            rel="noopener"
            target="_blank"
            underline="hover"
            variant="h6"
          >
            {title}
          </Link>
        </li>
      );
    })}
  </ul>
);
