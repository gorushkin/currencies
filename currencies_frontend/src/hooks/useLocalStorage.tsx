import { useCallback } from 'react';

export const useLocalStorage = <T,>(key: string) => {
  const saveSettings = useCallback(
    (data: T) => {
      const json = JSON.stringify(data);
      localStorage.setItem(key, json);
    },
    [key]
  );

  const readSettings = useCallback(() => {
    const json = localStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json) as T;
  }, [key]);

  return { saveSettings, readSettings };
};
