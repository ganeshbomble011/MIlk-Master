import React from 'react';
import Sidebar from '../../Drawer/Sidebar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className='dashboard'>
      {/* <Sidebar /> */}
      <main className='dashboard-content'>
        {/* This is the main page content area */}
        <h1>Welcome to Dashboard</h1>
        <p>Put your API calls, charts, widgets, or any other content here.</p>
      </main>
    </div>
  );
};

export { Dashboard };
