/** @format */

import { LABEL_COLLECTOR } from './Common';
import { COLLECTOR_GRID } from './GridConfigNames';
import { ROUTE_COLLECTOR } from './route';

export interface DrawerRoutingInterface {
  text: string;
  svgIcon?: string;
  id: number;
  parentId?: number;
  route?: string;
  expanded?: boolean;
  selected?: boolean;
  separator?: boolean;
  SelectedIcon?: string;
  UnselectedIcon?: string;
}

export const domain_items = [
  // {
  //   text: '',
  //   id: 0,
  //   expanded: false,
  //   selected: false,
  //   UnselectedIcon:
  //     '../Assets/DrawerIcons/UnSelectedMenu/MastersUnselectedIcon.png',
  //   SelectedIcon: '../Assets/DrawerIcons/SelectedMenu/MastersSelectedIcon.png',
  //   className: 'menu_list',
  //   accessKey: [COLLECTOR_GRID],
  //   expandIcon: true,
  // },
  {
    id: 1,
    text: LABEL_COLLECTOR,
    route: ROUTE_COLLECTOR,
    parentId: 0,
    className: '',
    accessKey: COLLECTOR_GRID,
  },
  {
    id: 4,
    text: 'Farmers Page',
    route: '/reports',
    UnselectedIcon: '',
  },
  {
    id: 5,
    separator: true,
    text: '',
  },
  {
    id: 6,
    text: 'Settings',
    route: '/settings',
    UnselectedIcon: '/icons/settings.svg',
  },
];
