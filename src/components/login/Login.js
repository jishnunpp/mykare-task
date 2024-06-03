import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './login.css';
import { useNavigate,Link } from 'react-router-dom';

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
          <h2>User Login</h2>
        </div>
        <div className='user-img'>
           <img src='data:image/png;base64,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'alt='img'/>
        </div>
        <div>
           
         
          <div>
          
          <input
            className='login-input'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
          />

          </div>
          <div className='login-error'>
          {errors.username && <div className='error'>{errors.username}</div>}

          </div>
         
        </div>
        <div>
          
          <div>
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />

          </div>
          <div className='login-error'>
          {errors.password && <div className='error'>{errors.password}</div>}

          </div>
         
        </div>
        <div className='login-butons'>
        <div className='form-btn'>
          <button className='login-btn' type='submit'>
            Login
          </button>
        </div>
        <div className='or-signup'>
          <div className='line'></div><div>or</div><div className='line'></div>
        </div>
        <div className='form-btn'>
         
          <Link to={'register'}>
                <a className='reg__btn'> Signup</a>
              </Link>
         
        </div>

        </div>
       
      </form>
    </div>
  );
};

export default Login;
