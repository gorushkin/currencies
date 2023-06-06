import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DESKTOP_QUERY } from '../../utils/constants';
import { cn } from '../../utils/utils';
import style from './Slider.module.scss';
import { FC } from 'react';

type SliderProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Slider: FC<SliderProps> = ({ children, isOpen, onClose }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  const wrapperStyles = cn(style.wrapper, isOpen ? style.wrapperOpen : style.wrapperClosed);

  return (
    <div className={wrapperStyles}>
      {isDesktop && (
        <button onClick={onClose} className={style.button}>
          <div className={style.buttonHoverShadow}></div>
        </button>
      )}
      <div className={style.container}>{children}</div>
    </div>
  );
};
