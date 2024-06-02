import React, { useEffect, useState } from 'react';
import './welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
      const loggedInUser = storedUserData.find(
        (user) => user.id === loggedInUserId
      );
      if (loggedInUser) {
        setUsername(loggedInUser.username);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserId');
    navigate('/');
  };

  return (
    <div className='welcome'>
      <div className='welcome-text'>
        <h2>Welcome, {username}</h2>
      </div>
      <div className='welcome-btn'>
        <button className='logout-btn' type='button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
