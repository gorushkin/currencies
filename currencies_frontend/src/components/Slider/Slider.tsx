import { cn } from '../../utils/utils';
import style from './Slider.module.scss';
import { FC } from 'react';

type SliderProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

export const Slider: FC<SliderProps> = ({ children, isOpen }) => {
  const wrapperStyles = cn(style.wrapper, isOpen ? style.wrapperOpen : style.wrapperClosed);

  return (
    <div className={wrapperStyles}>
      <div className={style.container}>{children}</div>
    </div>
  );
};
