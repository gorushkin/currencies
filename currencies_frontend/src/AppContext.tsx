import { ReactElement, createContext, useContext, useMemo, useState } from 'react';
import { Context } from './types';

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [width, setWidth] = useState(0);

  const context = useMemo(
    () => ({
      width,
      setWidth,
    }),
    [width]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useExportContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { AppContextProvider, useExportContext };
