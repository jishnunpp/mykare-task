import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className='login'>
        <form className='login-form'>
            <div>
                <h2>Login</h2>
            </div>
            <div>
            <input className='login-input' placeholder='username'/>

            </div>
            <div>
            <input className='login-input' placeholder='password'/>

            </div>
            <div className="form-btn">
              <button className="login-btn" type="submit">Login</button>
              
            </div>
          
            
        </form>
      
    </div>
  )
}

export default Login
