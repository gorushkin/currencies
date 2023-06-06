import { useCallback, useEffect, useState } from 'react';

type UseSlider = () => [boolean, () => void, () => void];

export const useSlider: UseSlider = () => {
  const [isOpen, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const body = document.body;
    const overflow = isOpen ? 'hidden' : 'auto';
    body.style.overflow = overflow;
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') close();
    };

    if (isOpen) document.addEventListener('keydown', handleKeydown);
    if (!isOpen) document.removeEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [close, isOpen]);

  return [isOpen, open, close];
};
