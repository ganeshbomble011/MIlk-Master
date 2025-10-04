/** @format */

import {
  LARGEST_COUNT_FOR_API,
  defaultPaginationCount,
} from '../constants/ConstantNumbers';
import { SelectedFilterData } from '../types/common';

interface FilterPayload {
  rowFirst: number;
  rowLast: number;
}

export function paginationPayload(
  selectedFilterData?: SelectedFilterData,
  largestCount: number = LARGEST_COUNT_FOR_API
): FilterPayload {
  const { skip = 0, take } = selectedFilterData?.data?.dataState || {};
  const next =
    take === undefined
      ? 10
      : take === 'All'
      ? largestCount
      : Number(Number(take) + skip);
  return {
    rowFirst: skip ? Number(skip + 1) : 0,
    rowLast: next ?? 10,
  };
}

const getPaginationCount = (selectedFilterData: SelectedFilterData) => {
  const take = selectedFilterData?.data?.dataState?.sizeGrid;
  const skip = selectedFilterData?.data?.dataState?.skip || 0;
  if (take === undefined) {
    return defaultPaginationCount;
  }
  if (take?.toString() === 'All') {
    return LARGEST_COUNT_FOR_API;
  }

  return Number(take || 0) + skip;
};
export default getPaginationCount;

export const getPaginationNormalCount = (page: {
  skip: number;
  take: number | string;
}) => {
  const take = page?.take;
  const skip = page?.skip || 0;
  if (take === undefined) {
    return defaultPaginationCount;
  }

  if (take?.toString() === 'All') {
    return LARGEST_COUNT_FOR_API;
  }

  return Number(take || 0) + skip;
};
