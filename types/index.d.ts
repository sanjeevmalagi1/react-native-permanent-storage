import React from 'react';

declare module 'react-native-permanent-storage' {
  export interface PermanentStorageStatic {
    getItem(key: string, callback?: (error?: Error, result?: string) => void): string | null;

    setItem(key: string, value: string, callback?: (error?: Error) => void): void;

    removeItem(key: string, callback?: (error?: Error) => void): void;

    clear(callback?: (error?: Error) => void): void;
  }

  export function usePermanentStorage(key: string): {
    getItem(callback?: (result: string | null) => void): string | null;
    setItem(value: string, callback?: (error?: Error) => void): void;
    removeItem(back?: (error?: Error) => void): void;
  }

  export const PermanentStorageWrapper: React.FC<{ children: any }>

  const PermanentStorage: PermanentStorageStatic;

  export default PermanentStorage;
}
