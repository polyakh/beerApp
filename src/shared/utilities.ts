export function sortBy<T>(list: T[], key: keyof T): T[] {
    // `sort()` function sorts the array in-place, meaning that it changes the original array.
    return [...list].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  }
  