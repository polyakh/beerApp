import { useState, useEffect } from 'react';


import type { Beer } from '../../types';
import { ITEM_SORT_METHODS, BEER_NONE, type BeerField } from './consts';
import { fetchData } from './utils';
import { usePagination, useFilteredSearch, calculatePageBoundaries, ITEMS_PER_PAGE } from '../../components';

const useBeerData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<BeerField>(BEER_NONE);
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const searchableFields: (keyof Beer)[] = ['name', 'brewery_type'];
  const handleSort = (sortKey: keyof typeof ITEM_SORT_METHODS) => {
    setSort(sortKey);
  };


  const sortFunction = ITEM_SORT_METHODS[sort];
  const sortedList = sortFunction(beerList);


  const { currentPage, totalPages, handlePaginationItemClick: setCurrentPage } =
    usePagination(beerList.length, ITEMS_PER_PAGE);
  const { start, end } = calculatePageBoundaries(currentPage, ITEMS_PER_PAGE)
  const filteredBeerList = useFilteredSearch(sortedList.slice(start, end), searchTerm, searchableFields);
  useEffect(() => {
    fetchData(setBeerList);
  }, []);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return {
    searchTerm, handleSearch, filteredBeerList, currentPage, totalPages, setCurrentPage, handleSort
  };
};

export { useBeerData };
