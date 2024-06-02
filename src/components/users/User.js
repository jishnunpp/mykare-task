import React, { useEffect, useState } from 'react';
import './user.css';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
    setUsers(storedUserData);
  }, []);

  return (
    <div className='user'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
