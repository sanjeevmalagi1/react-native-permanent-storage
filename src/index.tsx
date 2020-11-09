import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

let PermanentStorageInstance: any = {};

const _init = (
  callback?: (error?: Error) => void,
): Promise<string | null> => {

  return new Promise(async () => {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    values.forEach(value => {
      const key = value[0];
      const keyValue = value[1];
      PermanentStorageInstance[key] = keyValue;
    });
    callback && callback(PermanentStorageInstance);
  });
};

const getItem = (
  key: string,
  callback?: (result: string | null) => void,
): string | null => {
  const result = PermanentStorageInstance[key];
  callback && callback(result);
  return result;
};

const setItem = (
  key: string,
  value: string,
  callback?: (error?: Error) => void,
): void => {
  // TODO: Check Input
  PermanentStorageInstance[key] = value;
  AsyncStorage.setItem(key, value, callback);
};

const removeItem = (
  key: string,
  callback?: (error?: Error) => void
): void => {
  delete PermanentStorageInstance[key];
  AsyncStorage.removeItem(key, callback);
};

const clear = (
  callback?: (error?: Error) => void
): void => {
  PermanentStorageInstance = {};
  AsyncStorage.clear(callback);
};

export const PermanentStorageWrapper: React.FC<{ children: any }> = (props) => {
  const [ loaded, setLoaded ] = useState<boolean>(false);

  useEffect(() => {
    _init(() => setLoaded(true));
  }, []);

  return loaded ? props.children : null;
};


type PermanentStorageHook = {
  getItem: (
    callback?: (result: string | null) => void,
  ) => string | null,
  setItem: (
    value: string,
    callback?: (error?: Error) => void,
  ) => void,
  removeItem: (
    callback?: (error?: Error) => void,
  ) => void,
};

export function usePermanentStorage(key: string): PermanentStorageHook {
  return {
    getItem: (...args) => getItem(key, ...args),
    setItem: (...args) => setItem(key, ...args),
    removeItem: (...args) => removeItem(key, ...args),
  };
}

export default { setItem, getItem, removeItem, clear };
