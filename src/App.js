import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import User from './components/users/User';


function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Register />,
      
    },
    {
      path:'login',
      element:<Login/>
    },
    {
      path:'welcome',
      element:<Welcome/>
    },
    {
      path:'users',
      element:<User/>
    },
    
  
    
    
  ]);
  return (
    <div className="App">
      
       <RouterProvider router={appRouter} />
       <Outlet/>
      

    </div>
  );
}

export default App;
