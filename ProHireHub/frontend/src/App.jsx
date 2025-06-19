import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
// import Navbar from './components/shared/navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs'
import Browse from './components/Browse';
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

function App() {
  const [count, setCount] = useState(0);

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: "/jobs",
      element: <Jobs />
    },
    {
      path: "/description/:id",
      element: <JobDescription />
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/profile",
      element: <Profile />
    }
  ]);


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
