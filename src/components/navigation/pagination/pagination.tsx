//region Global Imports
import { useMemo } from 'react'
import Box from '@mui/material/Box';
import PaginationItem from '@mui/material/PaginationItem';
//endregion


import { INIT_CURRENT_PAGE } from './';



const COMPONENT_KEY = "PaginationComponent";

type PaginationComponentOwnProps = {
    readonly totalPages: number;
    readonly onPageChange: any;
}

function PaginationComponent({
  totalPages,
  onPageChange
}: PaginationComponentOwnProps) {
  const pageNumbers = useMemo(() => {
    let numbers = [];
    for (let i = INIT_CURRENT_PAGE; i <= totalPages; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [totalPages]);

  return (
    <Box component={'nav'} aria-label="pagination" mt={2}>
      {pageNumbers.map(pageNumber => <PaginationItem size='large' key={pageNumber} page={pageNumber}  onClick={onPageChange.bind(null, pageNumber)}/>)}
    </Box>
  );
}

export { COMPONENT_KEY };
export default PaginationComponent;