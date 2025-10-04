/** @format */
import {
  ROUTE_LOGIN,
  ROUTE_DASHBOARD,
  ROUTE_COLLECTOR,
} from '../constants/route';
import { LOGIN, DASHBOARD, COLLECTOR_GRID } from '../constants/GridConfigNames';

export const gridToRouteMap = {
  [LOGIN]: ROUTE_LOGIN,
  [DASHBOARD]: ROUTE_DASHBOARD,
  [COLLECTOR_GRID]: ROUTE_COLLECTOR,
} as const;

export type GridKeys = keyof typeof gridToRouteMap;

export function getRouteFromGridKey(key: GridKeys): string {
  return gridToRouteMap[key];
}
