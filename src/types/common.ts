/** @format */

import { GridCellProps } from '@progress/kendo-react-grid';

export interface CurrentPathModel {
  id: number;
  text: string;
  icon: string;
  selected: string;
  route: string;
  status: string;
}

export interface ThemeMode {
  themeMode: 'light' | 'dark';
}

export interface IFont {
  font: any;
  error: boolean;
  isFontLoading: boolean;
}

export interface DropdownListKeyModel {
  [key: string]: string | number;
}

export interface PageState {
  skip: number;
  take: number;
}
export type itemsInit = {
  id: string;
  text: string;
  routePath?: string;
  navData?: any;
  location?: string;
};

interface Filter {
  logic: 'and' | 'or';
  filters: Filter[]; // Assuming it supports nested filters.
}

interface Group {
  field: string;
  dir: 'asc' | 'desc'; // Define based on expected group structure.
}

interface Sort {
  field: string;
  dir: 'asc' | 'desc'; // Define based on expected sort structure.
}

interface DataState {
  take: number | string;
  skip: number;
  group: Group[]; // Array of group objects, or an empty array.
  sort: Sort[]; // Array of sort objects, or an empty array.
  filter?: Filter; // Optional since it's missing in the updated structure.
  sizeGrid?: number | string;
}

export interface SelectedData {
  clusterName?: {
    clusterId: number;
    clusterName: string;
    disabled?: boolean;
  };
  locationName?: {
    locationId: number;
    locationName: string;
    disabled?: boolean;
  };
  department?: {
    deptId: number;
    deptCode: string;
    deptName: string;
    comments: string;
  };
  instrument?: {
    instrumentId: number;
    instrumentCode: string;
    instrumentName: string;
    serialNumber: string;
    manufacturer: string;
    distributor: string;
    clusterId: number;
    clusterName: string;
    locationId: number;
    locationName: string;
    deptId: number;
    nablScope: string | null;
    strNablScope: string;
    deptname: string;
    comment: string;
    instruMappingId: number | null;
    createdDate: string | null;
    modifiedDate: string | null;
    isDeleted: boolean | null;
    rowFirst: number;
    rowLast: number;
  };
  qcLevel?: {
    qcLevelId: number;
    qcLevelCode: string;
    qcLevelName: string;
    comments: string;
  };
  qcName?: {
    qcId: number;
    qcName: string;
  };
  lotNumber?: { lotId: number };
  startDateToEndDate?: [string, string] | [Date, Date];
  date?: string | Date;
}

export interface SelectedFilterData {
  data?: {
    dataState: DataState;
    searchKeyword: string;
  };
  selectedData?: SelectedData;
}

export interface ActionType {
  id: number;
  text: string;
}

export interface ColumnEvent {
  id: number;
  field: string;
  title: string;
  editable: boolean;
  editor: string;
  navigate: string | null;
  function: string | null;
}

export interface PlantData {
  id: number;
  name: string;
  codeName: string;
}
export interface DropData {
  id: number;
  name: string;
  codeName: string;
}

export interface GridExternalCellProps {
  props: GridCellProps;
  gridData: any;
}
