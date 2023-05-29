import { sortBy } from "../../shared";
import type { Beer } from "../../types";


export const BEER_BREWERY_TYPE = 'brewery_type';

export const BEER_NAME = 'name';

export const BEER_NONE = 'none';

export type BeerField = typeof BEER_NONE | typeof BEER_BREWERY_TYPE | typeof BEER_NAME;

export const ITEM_SORT_METHODS: Record<BeerField, (list: Beer[]) => Beer[]> = {
  [BEER_NONE]: (list: Beer[]) => list,
  [BEER_BREWERY_TYPE]: (list: Beer[]) => sortBy(list, 'brewery_type'),
  [BEER_NAME]: (list: Beer[]) => sortBy(list, 'name'),
};
