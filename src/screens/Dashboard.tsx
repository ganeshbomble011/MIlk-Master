import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCollectors } from '../services/admin-service';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const message = location.state?.message;
  const [showMessage, setShowMessage] = useState(false);
  const [collectors, setCollectors] = useState<any[]>([]);

  useEffect(() => {
    if (message) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    fetchCollectors();
  }, []);

  const fetchCollectors = async () => {
    const data = await getCollectors();
    setCollectors(data);
  };

  return (
    <div className="dashboard-container">
      {showMessage && (
        <div className="notification">
          {message}
        </div>
      )}

      <h1>Dashboard</h1>

      <h3>Collectors List</h3>
      <table className="collectors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {collectors.map((c) => (
            <tr key={c.collectorId}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.contactInfo}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
