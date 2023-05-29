export const calculatePageBoundaries = (currentPage: number, itemsPerPage: number) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
  
    return { start, end };
  };