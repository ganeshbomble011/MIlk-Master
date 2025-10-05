/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import {
  useUserLoginMutation,
  useLazyGetPageAccessQuery,
} from '../../services/auth-service';
import { ROUTE_DASHBOARD } from '../../constants/route';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // State for input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // RTK Query hooks
  const [loginUser] = useUserLoginMutation();
  const [getPageAccess] = useLazyGetPageAccessQuery();

  // Handle form submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        userName: email,
        passWord: password,
      }).unwrap();

      // Optional: fetch page access if userID is available
      if (response?.data?.userID) {
        await getPageAccess(response.data.userID);
      }

      // Check for Admin role (optional logic)
      if (response?.data?.roleName === 'Admin') {
        // Save token / user (optional)
        // localStorage.setItem('user', JSON.stringify(response.data));

        // Navigate to dashboard
        navigate(ROUTE_DASHBOARD, { state: { message: response.message } });
      } else {
        // alert('Only Admin users can access the dashboard.');
      }
    } catch (error: any) {
      alert(
        error?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export { Login };
