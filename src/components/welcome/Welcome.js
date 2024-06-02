import React from 'react'
import './welcome.css'

const Welcome = () => {
  
  const get = (e) => {
    localStorage.setItem('name','ajmal')
   let value=localStorage.getItem('name');
    console.log(value)

    var retrievedData = localStorage.getItem("userData");

    var data = JSON.parse(retrievedData);
    console.log(data.email)
    
  };
  get()
 

  return (
    <div className='welcome'>
        <div className='welcome-text'>
            <h2>Welcome   jishnu {}</h2>

        </div>
        <div className="welcome-btn">
              <button className="logout-btn" type="submit">Logout</button>
              
            </div>
      
    </div>
  )
}

export default Welcome;
