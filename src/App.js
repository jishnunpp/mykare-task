import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';


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
    }
    
  
    
    
  ]);
  return (
    <div className="App">
      
       <RouterProvider router={appRouter} />
       <Outlet/>
      

    </div>
  );
}

export default App;
