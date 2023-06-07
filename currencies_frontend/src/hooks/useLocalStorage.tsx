import { useCallback, useMemo } from 'react';
import { storage } from '../utils/utils';

export const useLocalStorage = <T,>(key: string): [(data: T) => void, () => T | null] => {
  const storageHandler = useMemo(() => storage<T>(key), [key]);

  const set = useCallback((data: T) => storageHandler.set(data), [storageHandler]);

  const get = useCallback(() => storageHandler.get(), [storageHandler]);

  return [set, get];
};
