import { logger } from '../logger';
import { normalizeToSimpleText } from '../normalizers/normalizeToSimpleText';

import { PaginateOptionsDTO } from '@src/dtos/PaginateOptionsDTO';

type CandidateRange = [number, number] | [];
type CandidateSort = [string, string] | [];
type OrderByValue = 'asc' | 'desc';

const isValidPaginationArray = (candidateList: unknown) =>
  Array.isArray(candidateList) && candidateList.length === 2;

const parseSortToOrderBy = (sort: string[]) => {
  const isValidSort = isValidPaginationArray(sort);

  if (!isValidSort) {
    return {};
  }

  const [sorteableProperty, sorteableValue] = sort;

  const sorteableValueSimpleText = normalizeToSimpleText(
    sorteableValue,
  ).toLowerCase() as OrderByValue;

  return {
    [sorteableProperty]: sorteableValueSimpleText,
  };
};

const parseRangeToSkipTake = (range: number[]) => {
  const isValidRange = isValidPaginationArray(range);

  if (!isValidRange) {
    return {};
  }

  const [skip, take] = range;

  return {
    skip,
    take: take - skip + 1,
  };
};

export const parsePaginationToPrismaOptions = <
  GenericFilter extends object = object,
>(
  paginationOptions?: PaginateOptionsDTO,
) => {
  logger.debug('paginationOptions', JSON.stringify(paginationOptions));

  const [range, sort, filter] = [
    JSON.parse(String(paginationOptions?.range ?? '[]')) as CandidateRange,
    JSON.parse(String(paginationOptions?.sort ?? '[]')) as CandidateSort,
    JSON.parse(String(paginationOptions?.filter ?? '{}')) as GenericFilter,
  ];

  const { skip, take } = parseRangeToSkipTake(range);

  return {
    where: filter,
    orderBy: parseSortToOrderBy(sort),
    skip,
    take,
  };
};
