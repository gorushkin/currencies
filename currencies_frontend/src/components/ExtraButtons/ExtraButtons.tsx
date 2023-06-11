import { FC } from 'react';

import gearIcon from '../../assets/gear_icon.svg';
import helpIcon from '../../assets/help_icon.svg';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DESKTOP_QUERY } from '../../utils/constants';
import { cn } from '../../utils/utils';
import style from './ExtraButtons.module.scss';

type ExtraButtonsProps = { onHelpClick: () => void; onSettingsClick: () => void };

export const ExtraButtons: FC<ExtraButtonsProps> = ({ onHelpClick, onSettingsClick }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <div className={style.iconsWrapper}>
      <button className={cn(style.icon, style.iconGear)} onClick={onSettingsClick}>
        <img alt="settings" height={35} src={gearIcon} width={35} />
        <div className={style.iconHoverShadow}></div>
      </button>
      <button className={cn(style.icon, style.iconHelp)} onClick={onHelpClick}>
        <img alt="settings" height={35} src={helpIcon} width={35} />
        <div className={style.iconHoverShadow}></div>
      </button>
    </div>
  );
};
