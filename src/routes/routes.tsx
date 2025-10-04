/** @format */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Screens
import { Dashboard } from '../screens/Admin-Dashboard/Dashboard';
import { Login } from '../screens/login/Login';
import { Collector } from '../screens/Collector';

// Routes and Constants
import {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_COLLECTOR,
} from '../constants/route';

import {
  FOOTER_COPYRIGHT_TEXT,
  LABEL_PAGE_NOT_FOUND,
  LABEL_GO_BACK_TO_DASHBOARD,
  LABEL_PAGE_NOT_DETAILS,
} from '../constants/Common';

import { Container } from '../container/container';
import { AppBar } from '../Components/AppBar/AppBar';
import { AppBarSection } from '@progress/kendo-react-layout';
import { DrawerRouterContainer } from '../Drawer/Drawer';
import { Typography } from '@progress/kendo-react-common';

// NotFound Page
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <Typography.h1>{LABEL_PAGE_NOT_FOUND}</Typography.h1>
    <Typography.p>{LABEL_PAGE_NOT_DETAILS}</Typography.p>
    <a href={ROUTE_DASHBOARD}>{LABEL_GO_BACK_TO_DASHBOARD}</a>
  </div>
);

// Route Config
const routes = [
  {
    id: 1,
    path: ROUTE_LOGIN,
    component: <Login />,
    hasDrawer: false,
  },
  {
    id: 2,
    path: ROUTE_DASHBOARD,
    component: <Dashboard />,
    hasDrawer: false,
  },
  {
    id: 3,
    path: ROUTE_COLLECTOR,
    component: <Collector />,
    hasDrawer: false,
  },
];

const AppRouter = () => {
  const RenderRoutes = () => (
    <div className='app-container'>
      <div className='content'>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                route.hasDrawer ? (
                  <DrawerRouterContainer>
                    {route.component}
                  </DrawerRouterContainer>
                ) : (
                  <div>
                    <AppBar />
                    <div style={{ marginTop: '55px' }}>{route.component}</div>
                  </div>
                )
              }
            />
          ))}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <div className='screen-footer'>
        <AppBarSection>{FOOTER_COPYRIGHT_TEXT}</AppBarSection>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <RenderRoutes />
      <ToastContainer
        style={{ zIndex: '999999' }}
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </BrowserRouter>
  );
};

export { AppRouter };
