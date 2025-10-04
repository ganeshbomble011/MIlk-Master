/** @format */

import {
  AppBar as Navbar,
  AppBarSection,
  AppBarSpacer,
} from '@progress/kendo-react-layout';
import React, { useEffect, useRef, useState } from 'react';
import { menuIcon } from '@progress/kendo-svg-icons';
// import eLabLogo from '../../../public/Assets/Login/eLabLogo.svg';
import ThemConfigure from '../../Components/ThemConfigure/ThemConfigure';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_DASHBOARD } from '../../constants/route';
import { OkButton } from 'elab_components';
import './Appbar.css';
import { Popover } from '@progress/kendo-react-tooltip';
import { Button } from '@progress/kendo-react-buttons';
// import AppBaruser from '../../../public/Assets/user.png';

interface AppBarInit {
  handleClick?: () => void;
}

function AppBar({ handleClick }: AppBarInit) {
  const userData = JSON.parse(sessionStorage.getItem('userDetails') || 'null');

  const anchor = React.useRef(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [themeModel, setThemeModel] = useState<boolean>(false);
  const [value, setValue] = React.useState<string>('#194569');
  const [textColor, setTextColor] = React.useState<string>('#ffffff');
  const [showAvatarPopover, setShowAvatarPopover] = useState(false);

  const email = 'user@gmail.com';
  const mobileno = '12345789';

  const handleAvatarClick = () => {
    setShowAvatarPopover(!showAvatarPopover);
  };

  useEffect(() => {
    const handleOutsideAvatarClick = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowAvatarPopover(false);
      }
    };

    if (showAvatarPopover) {
      document.addEventListener('click', handleOutsideAvatarClick);
    } else {
      document.removeEventListener('click', handleOutsideAvatarClick);
    }

    return () =>
      document.removeEventListener('click', handleOutsideAvatarClick);
  }, [showAvatarPopover]);

  return (
    <Navbar positionMode='fixed' className='nav-container'>
      <AppBarSpacer style={{ width: 1 }} />

      <OkButton
        style={{
          position: 'relative',
          right: 8,
        }}
        onClick={handleClick}
        size='small'
        themeColor='light'
        svgIcon={menuIcon}
        fillMode='flat'
      />
      <AppBarSection>
        <img
          onClick={() => {
            navigate(ROUTE_DASHBOARD);
          }}
          src={''}
          style={{
            objectFit: 'contain',
            maxWidth: '200px',
            maxHeight: '42px',
            cursor: 'pointer',
          }}
          alt=''
        />
      </AppBarSection>

      <AppBarSection>
        <div ref={avatarRef}>
          <div onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
            <div
              style={{
                position: 'absolute',
                top: '5px',
                right: '20px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#194569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                {userData?.userName
                  .split(' ')
                  .map((word: string) => word[0])
                  .join('')
                  .toUpperCase()}
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'green',
                  border: '2px solid white',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        </div>
      </AppBarSection>
      {showAvatarPopover && (
        <Popover
          anchor={avatarRef.current}
          show={true}
          position='bottom'
          className='profile-popover '
          scale={0.8}
        >
          <div style={{ padding: '20px', width: '250px' }}>
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '30px',
                color: '#194569',
                cursor: 'pointer',
              }}
              onClick={handleAvatarClick}
            >
              &times;
            </button>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <div style={{ position: 'relative', marginRight: '10px' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#194569',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  {userData?.userName
                    .split(' ')
                    .map((word: string) => word[0])
                    .join('')
                    .toUpperCase()}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'green',
                    border: '2px solid white',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: '600',
                    fontSize: '16px',
                    color: '#1F2937',
                  }}
                >
                  {userData?.userName}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  {email}
                </div>
              </div>
            </div>

            <hr style={{ margin: '10px 0' }} />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                color: '#4B5563',
              }}
            >
              <span style={{ marginRight: '8px' }}>
                <img
                  src={''}
                  alt=''
                  style={{ height: '18px', width: '18px' }}
                />
              </span>{' '}
              {userData?.roleName}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#4B5563',
                marginBottom: '15px',
              }}
            >
              <span style={{ marginRight: '8px' }}>
                <img
                  src={''}
                  alt=''
                  style={{ height: '18px', width: '18px' }}
                />
              </span>{' '}
              {mobileno}
            </div>

            <Button
              themeColor='primary'
              fillMode='solid'
              style={{
                width: '100%',
                backgroundColor: '#194569',
                borderColor: '#194569',
                color: 'white',
              }}
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </div>
        </Popover>
      )}
      <AppBarSpacer />
      {themeModel && (
        <ThemConfigure
          textColor={textColor}
          setTextColor={setTextColor}
          value={value}
          setValue={setValue}
          setThemeModel={setThemeModel}
        />
      )}
      <style>
        {`:root {
          --kendo-color-primary: ${value};
          --kendo-color-primary-hover:#14527a;
          --kendo-color-hover:#1976d214;
          --kendo-color-primary-active:#0E314F;
          --kendo-secondary-text-color:#3D3D3D;
          --kendo-background-color:#fbfbfb;
        }.profile-popover .k-popover-callout.k-callout-n {
      left: 90% !important;
    } .k-picker-solid{
      background-color: #ffffff !important;}
      .k-disabled[role="combobox"]{
        background-color:var(--kendo-color-base) !important;
      }
        `}
      </style>
    </Navbar>
  );
}

export { AppBar };
