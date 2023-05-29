import { useState, useEffect } from 'react';

type UseLocalStorageList<T> = {
  list: T[];
  addItem: (item: T) => void;
  removeItem: (comparisonFn: (item: T) => boolean) => void;
  clearList: () => void;
};

export const useLocalStorageList = <T>(key: string): UseLocalStorageList<T> => {
  const [list, setList] = useState<T[]>(() => {
    const storedList = localStorage.getItem(key);
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [key, list]);

  const addItem = (item: T) => {
    setList(prevList => [...prevList, item]);
  };

  const removeItem = (comparisonFn: (item: T) => boolean) => {
    setList(prevList => prevList.filter(item => !comparisonFn(item)));
  };

  const clearList = () => {
    setList([]);
  };

  return {
    list,
    addItem,
    removeItem,
    clearList,
  };
};
