import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth-service';
import './Login.css';
import { ROUTE_DASHBOARD } from '../../constants/route';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      navigate(ROUTE_DASHBOARD, { state: { message: res.message } });

      if (res?.data?.roleName === 'Admin') {
        // Optional: Save login data/token to localStorage
        // localStorage.setItem('user', JSON.stringify(res.data));
        navigate(ROUTE_DASHBOARD);
      } else {
        alert('Only Admin users can access the dashboard.');
      }
    } catch {
      alert('Login failed');
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
