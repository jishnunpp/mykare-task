import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="contactform">
      <div className="contactform-heading">
        <h2>
          Registration Form
        </h2>
      </div>
      <div className="contactform-form">
        
        <div className="form">
          <div className="form-section">
            <input
              placeholder="username"
              type="text"
              className="input-data"
            />
           
            <input
              placeholder="Enter email address"
              type="email"
              className="input-data"
            />
            
              <input
                placeholder="phone"
                type="number"
                className="input-data"
              />
               
            <input
              placeholder="password"
              type='password'
              className="input-data"
            />
              
            
          </div>
          <div className="form-btn">
            {" "}
            <button>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
