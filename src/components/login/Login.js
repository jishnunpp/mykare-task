import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const adminCredentials = {
    username: 'admin',
    password: 'admin'
  };
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
       // Check if admin
       if (
        formData.username === adminCredentials.username &&
        formData.password === adminCredentials.password
      ) {
        localStorage.setItem('loggedInUserId', 'admin');
        navigate('/users');
        return;
      }
      const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];

      const existingUser = storedUserData.find(
        (user) => user.username === formData.username
      );
      if (existingUser) {
        const passwordMatch = await bcrypt.compare(
          formData.password,
          existingUser.password
        );
        if (passwordMatch) {
          // Store user ID in local storage
          localStorage.setItem('loggedInUserId', existingUser.id);
          navigate('/welcome');
        } else {
          alert('Incorrect password');
        }
      } else {
        alert('User not found');
      }
    }
  };

  return (
    <div className='login'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <input
            className='login-input'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className='error'>{errors.username}</div>}
        </div>
        <div>
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className='error'>{errors.password}</div>}
        </div>
        <div className='form-btn'>
          <button className='login-btn' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
