/** @format */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { domain_items } from '../constants/item'; // Adjust the path
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className='sidebar-top'>
        {/* <div className='logo'>{!isCollapsed ? '🌐' : '🌐'}</div> */}
        <button className='toggle-btn' onClick={toggleSidebar}>
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>

      <ul className='sidebar-menu'>
        {domain_items.map((item) => {
          if (item.separator)
            return <hr key={item.id} className='sidebar-separator' />;

          return (
            <li key={item.id} className='sidebar-item'>
              {item.route ? (
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    isActive ? 'sidebar-link active' : 'sidebar-link'
                  }
                >
                  {item.UnselectedIcon && (
                    <img
                      src={item.UnselectedIcon}
                      alt='icon'
                      className='sidebar-icon'
                    />
                  )}
                  {!isCollapsed && (
                    <span className='sidebar-text'>{item.text}</span>
                  )}
                </NavLink>
              ) : (
                !isCollapsed && (
                  <span className='sidebar-label'>{item.text}</span>
                )
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
