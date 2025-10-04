/** @format */

import React, { useEffect, useState } from 'react';
import './Drawer.scss';
import {
  AppBarSection,
  Drawer,
  DrawerContent,
  DrawerItem,
  DrawerItemProps,
  DrawerSelectEvent,
} from '@progress/kendo-react-layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar } from '../Components/AppBar/AppBar';
import { chevronDownIcon, chevronRightIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-react-common';
import { domain_items } from '../constants/item';
import { FOOTER_COPYRIGHT_TEXT } from '../constants/Common';
import { filterForAccess } from '../utils/accessFilter';

const CustomItem = (props: DrawerItemProps) => {
  const { visible, expandIcon, ...others } = props;
  let dataExpanded = props.expanded;
  const arrowDir = dataExpanded ? chevronDownIcon : chevronRightIcon;
  return visible === false ? null : (
    <DrawerItem {...others}>
      <SvgIcon icon={props.svgIcon} />
      <span className={'k-item-text'}>{props.text}</span>
      {expandIcon && (
        <SvgIcon
          icon={arrowDir}
          style={{
            marginLeft: 'auto',
          }}
        />
      )}
    </DrawerItem>
  );
};

const DrawerRouterContainer = (props: DrawerItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerExpanded, setDrawerExpanded] = React.useState(true);

  const [items, setItems] = useState<DrawerItemProps>(
    filterForAccess(domain_items)
  );

  useEffect(() => {
    const filteredItems = filterForAccess(domain_items);

    setItems(filteredItems);
  }, []);

  const handleClick = () => {
    setDrawerExpanded(!drawerExpanded);
  };

  const onSelect = (ev: DrawerSelectEvent) => {
    const currentItem = ev.itemTarget.props;
    const isParent = currentItem.expanded !== undefined;
    const nextExpanded = !currentItem.expanded;

    const newData = items.map((item: DrawerItemProps) => {
      const {
        selected,
        expanded: currentExpanded,
        id,
        parentId,
        ...others
      } = item;
      const isCurrentItem = currentItem.id === id;
      const isGrandChild = currentItem.id === item.tabIndex;

      const isChild38OfParent37 =
        (id === 51 && currentItem.id === 50) ||
        (id === 33 && currentItem.id === 0);

      return {
        expandIcon: items.expandIcon,
        selected: isCurrentItem,
        expanded: isGrandChild
          ? false
          : isCurrentItem && isParent
          ? nextExpanded
          : currentExpanded,
        id,
        parentId,
        ...others,
      };
    });
    if (currentItem.route) {
      navigate(currentItem.route);
      setDrawerExpanded(!drawerExpanded);
    }

    setItems(newData);
  };

  const data = items.map((item: { [x: string]: unknown; parentId: number }) => {
    const { parentId, ...others } = item;
    if (parentId !== undefined) {
      const parentEl = items.find(
        (parent: { id: number }) => parent.id === parentId
      );
      return {
        ...others,
        visible: parentEl && parentEl.expanded,
      };
    }
    return item;
  });

  useEffect(() => {
    const currentPath = location.pathname;
    const updatedItems = items.map((item: { route: string }) => ({
      ...item,
      selected: item.route === currentPath,
    }));
    setItems(updatedItems);
  }, [location.pathname]);

  return (
    <div className='drawer-inventory'>
      <AppBar handleClick={handleClick} />
      <Drawer
        className='drawer-container'
        position='start'
        expanded={drawerExpanded}
        mode='push'
        mini={true}
        items={data}
        item={CustomItem}
        onSelect={onSelect}
      >
        <DrawerContent className='drawer-container-children'>
          {props.children}
          <div className='screen-footer'>
            <AppBarSection>{FOOTER_COPYRIGHT_TEXT} </AppBarSection>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export { DrawerRouterContainer };
