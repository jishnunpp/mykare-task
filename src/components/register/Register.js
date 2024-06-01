import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      // Hash the password
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const userData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: hashedPassword,
      };

      // Store data in local storage
      localStorage.setItem('userData', JSON.stringify(userData));

      console.log("Form data's", userData);
    }
  };

  return (
    <div className='contactform'>
      <div className='contactform-heading'>
        <h2>Registration Form</h2>
      </div>
      <form className='contactform-form' onSubmit={handleSubmit}>
        <div className='contactform-form'>
          <div className='form'>
            <div className='form-section'>
              <input
                name='username'
                placeholder='Username'
                type='text'
                className='input-data'
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <div className='error'>{errors.username}</div>
              )}

              <input
                name='email'
                placeholder='Enter email address'
                type='email'
                className='input-data'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className='error'>{errors.email}</div>}

              <input
                name='phone'
                placeholder='Phone'
                type='number'
                className='input-data'
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className='error'>{errors.phone}</div>}

              <input
                name='password'
                placeholder='Password'
                type='password'
                className='input-data'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className='error'>{errors.password}</div>
              )}
            </div>
            <div className='form-btn'>
              <button type='submit'>Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
