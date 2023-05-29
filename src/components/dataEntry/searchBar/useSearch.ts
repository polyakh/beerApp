import { useMemo } from 'react';

const useFilteredSearch = <T>(dataSet: T[], searchQuery: string, searchableFields: (keyof T)[]) => {
  const lowerCasedQuery = searchQuery.toLowerCase();

  const dataSetWithSearchString = useMemo(() => {
    return dataSet.map(dataItem => ({
      ...dataItem,
      searchString: searchableFields.map(field => String(dataItem[field]).toLowerCase()).join(' ')
    }));
  }, [dataSet, searchableFields]);

  return useMemo(() => {
    if (lowerCasedQuery === '') {
      return dataSet;
    }
    return dataSetWithSearchString.filter(dataItem => dataItem.searchString.includes(lowerCasedQuery));
  }, [dataSetWithSearchString, lowerCasedQuery, dataSet]);
};

export { useFilteredSearch }
