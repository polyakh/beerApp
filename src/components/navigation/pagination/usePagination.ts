
import { useState, useMemo, useCallback } from 'react';


import { INIT_CURRENT_PAGE } from './'

const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(INIT_CURRENT_PAGE);

  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);

  const handlePaginationItemClick = useCallback((pageNum: number) => {
    if(pageNum !== currentPage) {
        setCurrentPage(pageNum);
    }
  }, [currentPage]);

  return { currentPage, totalPages, handlePaginationItemClick } as const;
};

export { usePagination };
