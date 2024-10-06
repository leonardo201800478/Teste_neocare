// powersync/PowerSyncProvider.tsx

import { PowerSyncContext } from '@powersync/react-native';
import { ReactNode, useMemo } from 'react';

import { useSystem } from './PowerSync';

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { powersync } = useSystem();

  const db = useMemo(() => {
    return powersync;
  }, [powersync]);

  return <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>;
};
