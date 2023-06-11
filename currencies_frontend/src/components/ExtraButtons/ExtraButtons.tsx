import { Button, ButtonGroup } from '@mui/material';
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

  if (isDesktop) {
    return (
      <div className={style.iconsWrapperDesktop}>
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
  }

  return (
    <div className={style.iconsWrapperMobile}>
      <ButtonGroup className={style.buttonWrapper} variant="contained">
        <Button className={style.button} onClick={onSettingsClick}>
          Settings
        </Button>
        <Button className={style.button} onClick={onHelpClick}>
          Help
        </Button>
      </ButtonGroup>
    </div>
  );
};
