import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  console.log(errors)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    console.log (validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];

      // Check if email or phone already exists
      const existingUserByEmail = storedUserData.find(
        (user) => user.email === formData.email
      );
      const existingUserByPhone = storedUserData.find(
        (user) => user.phone === formData.phone
      );

      if (existingUserByEmail) {
        alert('User already exists with this email');
        return;
      }

      if (existingUserByPhone) {
        alert('User already exists with this phone number');
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Generate a unique user ID
      const userId = Date.now().toString();

      // Prepare the data to be stored
      const userData = {
        id: userId,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: hashedPassword,
      };

      // Store data in local storage
      storedUserData.push(userData);
      localStorage.setItem('userData', JSON.stringify(storedUserData));

      setErrors({});
      
      navigate('/login');
      console.log(errors)
    }
    console.log(errors)
  };

  return (
    <div className='contactform'>
      <form className='contactform-form' onSubmit={handleSubmit}>
        <div className='contactform-form'>
          <div className='signup-heading'>
            <h2>Signup</h2>
          </div>
          <div className='form'>
            <div className='form-section'>
              <div>
                <div>
                  <input
                    name='username'
                    placeholder='Username'
                    type='text'
                    className='input-data'
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {errors.username && (
                    <div className='error'>{errors.username}</div>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <input
                    name='email'
                    placeholder='Enter email address'
                    type='email'
                    className='input-data'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {errors.email && <div className='error'>{errors.email}</div>}
                </div>
              </div>

              <div>
                <div>
                  <input
                    name='phone'
                    placeholder='Phone'
                    type='number'
                    className='input-data'
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {errors.phone && <div className='error'>{errors.phone}</div>}
                </div>
              </div>

              <div>
                <div>
                  <input
                    name='password'
                    placeholder='Password'
                    type='password'
                    className='input-data'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {errors.password && (
                    <div className='error'>{errors.password}</div>
                  )}
                </div>
              </div>
            </div>
            <div className='form-btn'>
              <button className='register-btn' type='submit'>
                Signup
              </button>
              <Link to={'/'}>
                <a className='login-btn'> Login </a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
